# Verification scope

The offline verifier establishes integrity and internal consistency of files
published in this repository. It makes two deliberately distinct classes of
statement.

## `RECOMPUTED_FROM_PUBLIC_REPOSITORY`

- SHA-256 checks of tracked published files and publication PDFs;
- twelve parent FIA records, 84 registered layer positions, and FIA-011A/B;
- all-12 cohort structure and unique correlations;
- clean-materialization metadata, strict-package metadata, and P01–P17
  ordering/cardinality; and
- consistency between public metadata and the fixed canonical identifiers.

## `ATTESTED_FROM_WITHHELD_RUNTIME_PAYLOAD`

- manifest, ledger-root, strict-archive, coordinator-result, P17-output, and
  other payload-derived identities recorded in the public evidence metadata;
- runtime execution, raw traces, private payloads, and production outcomes.

The public repository can check that these identities are present, well-formed,
and consistently bound into the public record. It cannot reconstruct withheld
runtime payloads, and it does not assert external production end-to-end outcome
or terminal settlement.
