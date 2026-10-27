#!/usr/bin/env python3
"""Unit tests for archive-veneers phone rewrite and leftover guards."""
import importlib.util
import tempfile
import unittest
from pathlib import Path

SPEC = importlib.util.spec_from_file_location(
    'archive_veneers', Path(__file__).resolve().parent / 'archive-veneers.py'
)
ARCHIVE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(ARCHIVE)


class ReplaceRetiredPhonesTests(unittest.TestCase):
    def test_e164_tel_link_keeps_single_plus(self):
        self.assertEqual(
            ARCHIVE.replace_retired_phones('tel:+13237903637'),
            'tel:+13232722388',
        )
        self.assertEqual(
            ARCHIVE.replace_retired_phones('tel:+13237670617'),
            'tel:+13232722388',
        )
        self.assertNotIn('+1+', ARCHIVE.replace_retired_phones('tel:+13237903637'))

    def test_national_tel_and_display_forms(self):
        self.assertEqual(
            ARCHIVE.replace_retired_phones('tel:3237903637'),
            'tel:+13232722388',
        )
        self.assertEqual(
            ARCHIVE.replace_retired_phones('Call (323) 790-3637 today'),
            'Call (323) 272-2388 today',
        )


class LeftoverDetectionTests(unittest.TestCase):
    def test_does_not_require_323_prefix(self):
        self.assertTrue(ARCHIVE.retired_phone_remains('Call 790-3637 today'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Call 767-0617 today'))

    def test_decodes_percent_20_and_nbsp(self):
        self.assertTrue(ARCHIVE.retired_phone_remains('Call 790%203637 today'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Call 790&nbsp;3637 today'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Call 767&#160;0617 today'))

    def test_digit_boundaries_ignore_unrelated_runs(self):
        self.assertFalse(ARCHIVE.retired_phone_remains('ref=12379036379'))
        self.assertFalse(ARCHIVE.retired_phone_remains('id=976706170'))
        self.assertFalse(ARCHIVE.retired_phone_remains('tel:+13232722388'))
        self.assertFalse(ARCHIVE.retired_phone_remains('(323) 272-2388'))

    def test_detects_js_and_css_text(self):
        self.assertTrue(ARCHIVE.retired_phone_remains('var phone="7903637";'))
        self.assertTrue(ARCHIVE.retired_phone_remains('.cta::after{content:"767-0617"}'))


class FailBeforeWriteTests(unittest.TestCase):
    def test_leftovers_leave_existing_files_untouched(self):
        with tempfile.TemporaryDirectory() as tmp:
            dest_dir = Path(tmp)
            manifest = dest_dir / 'manifest.json'
            html = dest_dir / 'index.html'
            manifest.write_text('CLEAN_MANIFEST')
            html.write_text('CLEAN_HTML')
            leftovers = ARCHIVE.collect_retired_phone_leftovers([
                ('page html', 'Call 790%203637'),
                ('theme.js', 'href="tel:+13237670617"'),
            ])
            self.assertEqual(leftovers, ['page html', 'theme.js'])
            with self.assertRaisesRegex(RuntimeError, 'Retired consultation numbers remain'):
                ARCHIVE.commit_generated_outputs(
                    [(manifest, 'DIRTY_MANIFEST'), (html, 'DIRTY_HTML')],
                    leftovers,
                )
            self.assertEqual(manifest.read_text(), 'CLEAN_MANIFEST')
            self.assertEqual(html.read_text(), 'CLEAN_HTML')

    def test_clean_outputs_are_written(self):
        with tempfile.TemporaryDirectory() as tmp:
            dest = Path(tmp) / 'nested' / 'index.html'
            leftovers = ARCHIVE.collect_retired_phone_leftovers([
                ('page html', 'Call (323) 272-2388'),
                ('app.js', 'tel:+13232722388'),
            ])
            self.assertEqual(leftovers, [])
            ARCHIVE.commit_generated_outputs([(dest, 'tel:+13232722388')], leftovers)
            self.assertEqual(dest.read_text(), 'tel:+13232722388')


if __name__ == '__main__':
    unittest.main()
