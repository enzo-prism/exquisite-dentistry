"""Report Google Search visibility and measured organic landing sessions for the SEO release."""

import argparse
from datetime import date
import json
import subprocess

SITE = "sc-domain:exquisitedentistryla.com"
PROPERTY = "498175984"
PAGES = {
    "/koreatown-dentist": "Koreatown",
    "/blog/the-shapes-and-styles-of-dental-veneers": "Veneer shapes",
    "/veneers/front-teeth-veneers-los-angeles": "Front teeth comparison",
}
HOSTS = {"exquisitedentistryla.com", "www.exquisitedentistryla.com"}


def fetch_rows(command, args):
    offset = 0
    while True:
        data = json.loads(subprocess.check_output([
            "gog", *command, "--from", args.start, "--to", args.end,
            "--account", args.account, "--max", "10000", "--offset", str(offset),
            "--no-input", "--json",
        ]))
        rows = data.get("rows", [])
        yield from rows
        if len(rows) < 10000:
            break
        offset += len(rows)


def analytics(args, dimensions, metric):
    for row in fetch_rows(["analytics", "report", PROPERTY, "--dimensions",
                           ",".join(dimensions), "--metrics", metric], args):
        values = [v["value"] for v in row["dimensionValues"]]
        host, channel, landing, *rest = values
        path = landing.rstrip("/")
        if host in HOSTS and channel == "Organic Search" and path in PAGES:
            yield path, rest, int(row["metricValues"][0]["value"])


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("start", help="Inclusive YYYY-MM-DD")
    parser.add_argument("end", help="Inclusive YYYY-MM-DD")
    parser.add_argument("--account", default="enzo@design-prism.com")
    args = parser.parse_args()
    if date.fromisoformat(args.start) > date.fromisoformat(args.end):
        parser.error("start must precede or equal end")

    results = {}
    for path, label in PAGES.items():
        command = ["searchconsole", "query", SITE, "--dimensions", "PAGE",
                   "--data-state", "FINAL", "--filter",
                   f"page:equals:https://exquisitedentistryla.com{path}/"]
        rows = list(fetch_rows(command, args))
        results[path] = {
            "page": label, "gsc": rows[0] if rows else None,
            "organic_sessions": 0, "gallery_pageviews": 0, "example_gallery_clicks": 0,
            "example_consultation_clicks": 0, "phone_taps": 0,
            "accepted_forms": 0, "acquisition_leads": 0,
        }

    cohort = ["hostName", "sessionDefaultChannelGroup", "landingPage"]
    for path, _, count in analytics(args, cohort, "sessions"):
        results[path]["organic_sessions"] += count

    # A visit or event anywhere in a session is credited to its entry page.
    # Count events separately from sessions; users can take an action more than once.
    for path, (page, event), count in analytics(args, [*cohort, "pagePath", "eventName"], "eventCount"):
        if event == "page_view" and page.rstrip("/") == "/smile-gallery":
            results[path]["gallery_pageviews"] += count
        if event == "form_submission_accepted":
            results[path]["accepted_forms"] += count
        if event == "generate_lead":
            results[path]["acquisition_leads"] += count

    for path, (event, source), count in analytics(args, [*cohort, "eventName", "customEvent:cta_location"], "eventCount"):
        if (event, source) == ("cta_click", "shape_guide_gallery"):
            results[path]["example_gallery_clicks"] += count
        if (event, source) == ("schedule_click", "shape_guide_consult"):
            results[path]["example_consultation_clicks"] += count

    for path, (event, method), count in analytics(args, [*cohort, "eventName", "customEvent:interaction_method"], "eventCount"):
        if (event, method) == ("contact_click", "phone"):
            results[path]["phone_taps"] += count

    print(json.dumps({"from": args.start, "through": args.end, "pages": results}, indent=2))


if __name__ == "__main__":
    main()
