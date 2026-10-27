#!/usr/bin/env python3
"""Unit and write-order tests for archive-veneers phone rewrite and leftover guards."""
import importlib.util
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SPEC = importlib.util.spec_from_file_location(
    'archive_veneers', Path(__file__).resolve().parent / 'archive-veneers.py'
)
ARCHIVE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(ARCHIVE)

TRACKED_ARCHIVE = (
    'public/veneers',
    'src/constants/legacyVeneersManifest.json',
)


def archive_git_status():
    return subprocess.check_output(
        ['git', 'status', '--porcelain', '--', *TRACKED_ARCHIVE],
        cwd=REPO,
        text=True,
    )


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

    def test_replacer_uses_digit_boundaries(self):
        self.assertEqual(ARCHIVE.replace_retired_phones('13237903637'), '+13232722388')
        self.assertEqual(
            ARCHIVE.replace_retired_phones('id=3237903637123'),
            'id=3237903637123',
        )
        self.assertNotIn('+1+', ARCHIVE.replace_retired_phones('13237903637'))

    def test_rewrites_dash_and_paren_encodings(self):
        self.assertEqual(
            ARCHIVE.replace_retired_phones('Call (323)–790–3637'),
            'Call (323) 272-2388',
        )
        self.assertEqual(
            ARCHIVE.replace_retired_phones('Call (323)—790—3637'),
            'Call (323) 272-2388',
        )
        self.assertEqual(
            ARCHIVE.replace_retired_phones('Call (323)‑790‑3637'),
            'Call (323) 272-2388',
        )
        self.assertEqual(
            ARCHIVE.replace_retired_phones('Call (323)&ndash;790&ndash;3637'),
            'Call (323) 272-2388',
        )
        self.assertEqual(
            ARCHIVE.replace_retired_phones('Call 323%2D790%2D3637'),
            'Call (323) 272-2388',
        )
        self.assertEqual(
            ARCHIVE.replace_retired_phones('Call %28323%29 790-3637'),
            'Call (323) 272-2388',
        )


class LeftoverDetectionTests(unittest.TestCase):
    def test_does_not_require_323_prefix(self):
        self.assertTrue(ARCHIVE.retired_phone_remains('Call 790-3637 today'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Call 767-0617 today'))

    def test_decodes_percent_20_and_nbsp(self):
        self.assertTrue(ARCHIVE.retired_phone_remains('Call 790%203637 today'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Call 790&nbsp;3637 today'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Call 767&#160;0617 today'))

    def test_digit_boundaries_on_original_text(self):
        self.assertTrue(ARCHIVE.retired_phone_remains('CA 90036 323-790-3637'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Open 9-5 323-790-3637'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Call 323-790-3637 24 hours'))

    def test_digit_boundaries_ignore_unrelated_runs(self):
        self.assertFalse(ARCHIVE.retired_phone_remains('ref=12379036379'))
        self.assertFalse(ARCHIVE.retired_phone_remains('id=976706170'))
        self.assertFalse(ARCHIVE.retired_phone_remains('tel:+13232722388'))
        self.assertFalse(ARCHIVE.retired_phone_remains('(323) 272-2388'))

    def test_lookbehind_alone_is_required(self):
        self.assertFalse(ARCHIVE.retired_phone_remains('Open 5790-3637'))
        self.assertFalse(ARCHIVE.retired_phone_remains('x57903637'))

    def test_lookahead_alone_is_required(self):
        self.assertFalse(ARCHIVE.retired_phone_remains('79036370'))
        self.assertFalse(ARCHIVE.retired_phone_remains('Call 790-36370'))

    def test_c2_a0_decode_is_required(self):
        self.assertTrue(ARCHIVE.retired_phone_remains('Call 790%c2%a03637 today'))
        self.assertEqual(ARCHIVE.decode_phone_haystack('790%c2%a03637'), '790 3637')

    def test_detects_dash_and_paren_encodings(self):
        self.assertTrue(ARCHIVE.retired_phone_remains('Call (323)–790–3637'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Call (323)—790—3637'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Call (323)‑790‑3637'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Call (323)&ndash;790&ndash;3637'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Call 323%2D790%2D3637'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Call %28323%29 790-3637'))

    def test_skips_hex_filenames_and_money(self):
        self.assertFalse(ARCHIVE.retired_phone_remains('G-7903637AB'))
        self.assertFalse(ARCHIVE.retired_phone_remains('7903637.jpg'))
        self.assertFalse(ARCHIVE.retired_phone_remains('hash a7903637bdef'))
        self.assertFalse(ARCHIVE.retired_phone_remains('$7.903.637'))

    def test_detects_js_and_css_text(self):
        self.assertTrue(ARCHIVE.retired_phone_remains('var phone="7903637";'))
        self.assertTrue(ARCHIVE.retired_phone_remains('.cta::after{content:"767-0617"}'))


class NewlineAndWriteTests(unittest.TestCase):
    def test_extract_blog_cards_normalizes_crlf_like_read_text(self):
        crlf = '<article class="blog-entry" id="post-1">Hello\r\nWorld</article>'
        lf = '<article class="blog-entry" id="post-1">Hello\nWorld</article>'
        self.assertEqual(ARCHIVE.extract_blog_cards(crlf), ARCHIVE.extract_blog_cards(lf))
        self.assertIn('Hello\nWorld', ARCHIVE.extract_blog_cards(crlf)[1])
        self.assertNotIn('\r', ARCHIVE.extract_blog_cards(crlf)[1])

    def test_leftovers_leave_existing_files_untouched(self):
        with tempfile.TemporaryDirectory() as tmp:
            dest_dir = Path(tmp)
            manifest = dest_dir / 'manifest.json'
            html = dest_dir / 'index.html'
            asset = dest_dir / 'theme.js'
            manifest.write_text('CLEAN_MANIFEST')
            html.write_text('CLEAN_HTML')
            asset.write_bytes(b'CLEAN_JS')
            leftovers = ARCHIVE.collect_retired_phone_leftovers([
                ('page html', 'Call 790%203637'),
                ('theme.js', 'href="tel:+13237670617"'),
            ])
            self.assertEqual(leftovers, ['page html', 'theme.js'])
            with self.assertRaisesRegex(RuntimeError, 'Retired consultation numbers remain'):
                ARCHIVE.commit_generated_outputs(
                    [(manifest, 'DIRTY_MANIFEST'), (html, 'DIRTY_HTML'), (asset, b'DIRTY_JS')],
                    leftovers,
                )
            self.assertEqual(manifest.read_text(), 'CLEAN_MANIFEST')
            self.assertEqual(html.read_text(), 'CLEAN_HTML')
            self.assertEqual(asset.read_bytes(), b'CLEAN_JS')

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


class MainWriteOrderTests(unittest.TestCase):
    def test_injected_js_and_css_leftovers_fail_before_any_public_write(self):
        self.assertEqual(archive_git_status(), '', 'Archive tree must start clean')
        env = os.environ.copy()
        env['ARCHIVE_VENEERS_INJECT_LEFTOVER'] = '1'
        result = subprocess.run(
            [sys.executable, str(REPO / 'scripts/archive-veneers.py'), '--offline'],
            cwd=REPO,
            env=env,
            capture_output=True,
            text=True,
        )
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('Retired consultation numbers remain', result.stderr + result.stdout)
        self.assertEqual(archive_git_status(), '', 'JS/CSS leftovers must not dirty public/')


class RegenIdempotenceTests(unittest.TestCase):
    def test_offline_regen_leaves_git_clean(self):
        self.assertEqual(archive_git_status(), '', 'Archive tree must start clean')
        result = subprocess.run(
            [sys.executable, str(REPO / 'scripts/archive-veneers.py'), '--offline'],
            cwd=REPO,
            capture_output=True,
            text=True,
        )
        self.assertEqual(result.returncode, 0, result.stderr + result.stdout)
        self.assertEqual(archive_git_status(), '', result.stdout)


if __name__ == '__main__':
    unittest.main()
