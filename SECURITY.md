# Security Policy

## Supported version

Flatland does not currently publish versioned releases. Security fixes are made on the default branch, so only the latest revision of `main` is supported.

## Report a vulnerability

Do not disclose a suspected vulnerability in a public issue, discussion, or pull request.

Use a private contact method listed on the [repository owner's GitHub profile](https://github.com/sytelus). If no private method is available, open a minimal issue asking the maintainer to contact you; do not include vulnerability details in that issue.

In the private report, include:

- A description of the issue and its impact.
- The affected revision or hosted URL.
- Minimal reproduction steps or a proof of concept.
- Any relevant browser, operating system, or hosting details.
- Suggested mitigations, if known.

The maintainers will coordinate validation, remediation, and disclosure through a private channel. No fixed response or resolution time is promised.

## Scope and deployment notes

The repository application is client-only. As committed, it makes no network requests, collects no user data, stores no state, and loads no third-party scripts. A deployment can have a different security and privacy profile if a host adds analytics, headers, scripts, service workers, or other content; report those concerns to the operator of that deployment unless the behavior originates in this repository.

Reports about unsupported browsers, visual glitches, or non-security bugs belong in the public bug tracker.
