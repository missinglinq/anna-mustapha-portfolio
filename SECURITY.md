# Security Policy

## Scope

This repository hosts a static Product + UX portfolio and the ParcelTrace interactive concept prototype on GitHub Pages.

ParcelTrace uses synthetic demonstration data only. It does not provide authentication, accept passwords or payment information, store user-submitted property records, or connect to a production property-data backend.

## Reporting a security issue

If you believe you found a security issue in this site or prototype, please report it privately by email to **missinglinq@outlook.com** rather than publishing exploit details in a public GitHub issue.

Please include:

- the affected page or file;
- steps needed to reproduce the issue;
- the browser/device you used;
- the potential impact; and
- a minimal proof of concept, if helpful.

Do not include real credentials, private records, or sensitive personal information in a report.

## Security design

The public pages use restrictive browser Content Security Policies, referrer restrictions, HTTPS through GitHub Pages, same-origin prototype scripts and service workers, and no production secrets or privileged APIs in client-side code.

Because this is a public static portfolio, all repository content and client-side code should be treated as publicly visible. Secrets, private keys, credentials, confidential datasets, and production API tokens must never be committed to this repository.
