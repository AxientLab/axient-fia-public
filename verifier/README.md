# Offline verifier

Run from the repository root:

```bash
node verifier/verify.mjs
```

The verifier makes no network calls. It checks the public evidence files,
schema-required fields, all canonical identifiers, the all-12 scenario and
layer registries, FIA-11 subcase model, materialization and archive identities,
P01–P17 sequence, and `SHA256SUMS`.

It verifies the integrity and internal consistency of the published metadata.
It cannot reconstruct raw runtime payloads that are intentionally not published.
