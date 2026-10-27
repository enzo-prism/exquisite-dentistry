#!/usr/bin/env python3
"""Unit and write-order tests for archive-veneers phone rewrite and leftover guards."""
import builtins
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
        self.assertEqual(
            ARCHIVE.replace_retired_phones('Call 323%2E790%2E3637'),
            'Call (323) 272-2388',
        )

    def test_area_coded_glued_neighbors_are_rewritten(self):
        self.assertEqual(
            ARCHIVE.replace_retired_phones('Call (323) 790-3637Fax'),
            'Call (323) 272-2388Fax',
        )
        self.assertEqual(
            ARCHIVE.replace_retired_phones('(323) 790-3637.Call'),
            '(323) 272-2388.Call',
        )

    def test_does_not_rewrite_foreign_area_or_css_length(self):
        self.assertEqual(ARCHIVE.replace_retired_phones('(310) 790-3637'), '(310) 790-3637')
        self.assertEqual(ARCHIVE.replace_retired_phones('width:7903637px'), 'width:7903637px')

    def test_tel_hrefs_rewrite_to_e164(self):
        self.assertEqual(
            ARCHIVE.replace_retired_phones('tel:323-790-3637'),
            'tel:+13232722388',
        )
        self.assertEqual(
            ARCHIVE.replace_retired_phones('href="tel:323-790-3637"'),
            'href="tel:+13232722388"',
        )

    def test_percent_encoded_plus_tel_rewrites_to_e164(self):
        self.assertEqual(
            ARCHIVE.replace_retired_phones('tel:%2B13237903637'),
            'tel:+13232722388',
        )
        self.assertEqual(
            ARCHIVE.replace_retired_phones('tel:%2b1-323-790-3637'),
            'tel:+13232722388',
        )
        self.assertEqual(
            ARCHIVE.replace_retired_phones('href="tel:%2B13237903637"'),
            'href="tel:+13232722388"',
        )

    def test_plus_separator_is_rewritten(self):
        self.assertEqual(
            ARCHIVE.replace_retired_phones('323+790+3637'),
            '+13232722388',
        )
        self.assertEqual(
            ARCHIVE.replace_retired_phones('Call 323+790+3637 today'),
            'Call +13232722388 today',
        )

    def test_bare_unseparated_is_detect_only(self):
        samples = (
            'Order #7903637',
            'z-index:7903637;',
            '?id=7903637',
            '0.7903637',
            '&#7903637;',
        )
        for sample in samples:
            self.assertEqual(ARCHIVE.replace_retired_phones(sample), sample, sample)
            self.assertTrue(ARCHIVE.retired_phone_remains(sample), sample)


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

    def test_area_coded_glued_neighbors_are_detected(self):
        self.assertTrue(ARCHIVE.retired_phone_remains('Call (323) 790-3637Fax'))
        self.assertTrue(ARCHIVE.retired_phone_remains('(323) 790-3637.Call'))

    def test_area_coded_detection_matches_base(self):
        samples = (
            'Call (323) 790-3637Fax',
            '(323) 790-3637.Call',
            'CA 90036 323-790-3637',
            'Open 9-5 323-790-3637',
            'Call 323-790-3637 24 hours',
            'tel:+13237903637',
            'Call (323) 790-3637 today',
            '3237903637',
            'id=3237903637123',
            '323+790+3637',
        )
        for sample in samples:
            if ARCHIVE.base_area_coded_detector(sample):
                self.assertTrue(ARCHIVE.retired_phone_remains(sample), sample)

    def test_detects_foreign_area_but_not_css_length(self):
        self.assertTrue(ARCHIVE.retired_phone_remains('(310) 790-3637'))
        self.assertFalse(ARCHIVE.retired_phone_remains('width:7903637px'))

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
        self.assertTrue(ARCHIVE.retired_phone_remains('Call (323)&minus;790&minus;3637'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Call (323)&hyphen;790&hyphen;3637'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Call 323%2D790%2D3637'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Call 323%2E790%2E3637'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Call %28323%29 790-3637'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Call 790&nbsp 3637 today'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Call (323)&#8211;790&#8211;3637'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Call 323&#45;790&#45;3637'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Call (323)\u2010790\u20103637'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Call (323)\u2012790\u20123637'))
        self.assertTrue(ARCHIVE.retired_phone_remains('Call (323)\u2212790\u22123637'))

    def test_skips_hex_filenames_and_money(self):
        self.assertFalse(ARCHIVE.retired_phone_remains('G-7903637AB'))
        self.assertFalse(ARCHIVE.retired_phone_remains('7903637.jpg'))
        self.assertFalse(ARCHIVE.retired_phone_remains('hash a7903637bdef'))
        self.assertFalse(ARCHIVE.retired_phone_remains('$7.903.637'))

    def test_detects_js_and_css_text(self):
        self.assertTrue(ARCHIVE.retired_phone_remains('var phone="7903637";'))
        self.assertTrue(ARCHIVE.retired_phone_remains('.cta::after{content:"767-0617"}'))

    def test_plus_separator_is_detected(self):
        self.assertTrue(ARCHIVE.retired_phone_remains('323+790+3637'))
        self.assertTrue(ARCHIVE.base_area_coded_detector('323+790+3637'))

    def test_noncanonical_tel_href_is_leftover(self):
        self.assertTrue(ARCHIVE.retired_phone_remains('tel:%2B13237903637'))
        self.assertTrue(ARCHIVE.retired_phone_remains('tel:%2B+13232722388'))
        self.assertTrue(ARCHIVE.retired_phone_remains('tel:%2b(323) 272-2388'))
        self.assertFalse(ARCHIVE.retired_phone_remains('tel:+13232722388'))
        self.assertFalse(ARCHIVE.retired_phone_remains('.fa-hotel:before{content:"\\f594"}'))
        self.assertFalse(ARCHIVE.retired_phone_remains('["telnet:","tel:","fax:"]'))


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

    def test_scan_and_commit_records_scan_before_any_write(self):
        with tempfile.TemporaryDirectory() as tmp:
            dest_dir = Path(tmp)
            asset = dest_dir / 'theme.js'
            html = dest_dir / 'index.html'
            search = dest_dir / 'search-index.json'
            manifest = dest_dir / 'manifest.json'
            log = []
            with self.assertRaisesRegex(RuntimeError, 'Retired consultation numbers remain'):
                ARCHIVE.scan_and_commit(
                    [('theme.js', 'width:auto; /* 790-3637 */')],
                    [(asset, b'DIRTY'), (html, 'DIRTY'), (search, '{}'), (manifest, '{}')],
                    write_log=log,
                )
            self.assertEqual(log, ['scan'])
            self.assertFalse(asset.exists())
            self.assertFalse(html.exists())
            self.assertFalse(search.exists())
            self.assertFalse(manifest.exists())

    def test_injected_html_card_title_integration_and_tel_fail_before_write(self):
        labeled = [
            ('/veneers/about/ html', '<p>clean</p>'),
            ('/veneers/about/ title', 'About'),
            ('public/veneers/search-index.json', '{"cardHtml":"<article>ok</article>"}'),
            ('/veneers/shell.js', 'console.log(1)'),
        ]
        previous = os.environ.get('ARCHIVE_VENEERS_INJECT_LEFTOVER')
        try:
            os.environ['ARCHIVE_VENEERS_INJECT_LEFTOVER'] = '1'
            tainted = ARCHIVE.inject_scan_surface_leftovers(labeled)
        finally:
            if previous is None:
                os.environ.pop('ARCHIVE_VENEERS_INJECT_LEFTOVER', None)
            else:
                os.environ['ARCHIVE_VENEERS_INJECT_LEFTOVER'] = previous
        leftovers = ARCHIVE.collect_retired_phone_leftovers(tainted)
        self.assertIn('/veneers/about/ html', leftovers)
        self.assertIn('/veneers/about/ title', leftovers)
        self.assertIn('public/veneers/search-index.json', leftovers)
        self.assertIn('/veneers/shell.js', leftovers)
        html_text = next(text for label, text in tainted if label.endswith(' html'))
        self.assertIn('tel:%2B13237903637', html_text)
        with tempfile.TemporaryDirectory() as tmp:
            dest = Path(tmp) / 'index.html'
            dest.write_text('CLEAN')
            with self.assertRaisesRegex(RuntimeError, 'Retired consultation numbers remain'):
                ARCHIVE.scan_and_commit(tainted, [(dest, 'DIRTY')])
            self.assertEqual(dest.read_text(), 'CLEAN')


def _is_public_archive_path(path):
    resolved = Path(path).resolve()
    veneers = (REPO / 'public' / 'veneers').resolve()
    manifest = (REPO / 'src/constants/legacyVeneersManifest.json').resolve()
    return resolved == manifest or resolved == veneers or veneers in resolved.parents


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

    def test_main_records_no_public_write_before_scan_passes(self):
        self.assertEqual(archive_git_status(), '', 'Archive tree must start clean')
        events = []
        orig_text = Path.write_text
        orig_bytes = Path.write_bytes
        orig_open = builtins.open
        orig_collect = ARCHIVE.collect_retired_phone_leftovers

        def rec_text(self, *args, **kwargs):
            if _is_public_archive_path(self):
                events.append(('write', str(self)))
            return orig_text(self, *args, **kwargs)

        def rec_bytes(self, *args, **kwargs):
            if _is_public_archive_path(self):
                events.append(('write', str(self)))
            return orig_bytes(self, *args, **kwargs)

        def rec_open(file, mode='r', *args, **kwargs):
            writing = any(flag in str(mode) for flag in ('w', 'a', 'x', '+'))
            if writing:
                try:
                    if _is_public_archive_path(file):
                        events.append(('write', str(file)))
                except Exception:
                    pass
            return orig_open(file, mode, *args, **kwargs)

        def rec_collect(labeled_texts):
            events.append(('scan',))
            return orig_collect(labeled_texts)

        ARCHIVE.collect_retired_phone_leftovers = rec_collect
        Path.write_text = rec_text
        Path.write_bytes = rec_bytes
        builtins.open = rec_open
        previous = os.environ.get('ARCHIVE_VENEERS_INJECT_LEFTOVER')
        argv = sys.argv
        try:
            os.environ['ARCHIVE_VENEERS_INJECT_LEFTOVER'] = '1'
            sys.argv = ['archive-veneers.py', '--offline']
            with self.assertRaisesRegex(RuntimeError, 'Retired consultation numbers remain'):
                ARCHIVE.main()
        finally:
            ARCHIVE.collect_retired_phone_leftovers = orig_collect
            Path.write_text = orig_text
            Path.write_bytes = orig_bytes
            builtins.open = orig_open
            sys.argv = argv
            if previous is None:
                os.environ.pop('ARCHIVE_VENEERS_INJECT_LEFTOVER', None)
            else:
                os.environ['ARCHIVE_VENEERS_INJECT_LEFTOVER'] = previous
        self.assertIn(('scan',), events)
        self.assertEqual([event for event in events if event[0] == 'write'], [])
        scan_at = events.index(('scan',))
        self.assertTrue(all(index > scan_at for index, event in enumerate(events) if event[0] == 'write'))
        self.assertEqual(archive_git_status(), '')


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
