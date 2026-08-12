# Contributing

Contributions should improve reproducibility, clarity, metadata validation, or
publication references without changing a canonical Phase 17B result by
interpretation.

Before proposing a change:

1. run `node verifier/verify.mjs`;
2. preserve the 12-parent denominator and FIA-11 A/B subcase model;
3. distinguish observed identifiers from interpretation;
4. do not add confidential, operational, or raw-runtime material; and
5. update `SHA256SUMS` for any tracked public artefact.

Changes that alter a canonical identifier require a documented source
authority and a review of the claim boundary.
