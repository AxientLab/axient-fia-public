# AEMB v0.2

The benchmark publication is:

Nechepurenko, Maksym, *AEMB: A Deterministic Cross-language Verification
Benchmark for Event-margin Protocols* (July 22, 2026). Available at SSRN:
[https://ssrn.com/abstract=7216198](https://ssrn.com/abstract=7216198) or
[http://dx.doi.org/10.2139/ssrn.7216198](https://dx.doi.org/10.2139/ssrn.7216198).

The author-provided short version is available in
[../../papers/downloads/AEMB_Benchmark_15p.pdf](../../papers/downloads/AEMB_Benchmark_15p.pdf).

AEMB v0.2 uses the following publication-facing evaluation interface:

| Dimension | Public definition |
| --- | --- |
| Assertion coverage | Twelve parent Financial Interaction Assertions, FIA-01 through FIA-12 |
| Evidence coverage | Seven retained evidence-layer positions with registered derivations per parent assertion |
| Cohort integrity | One all-12 manifest, unique parent correlations, and a ledger root |
| Reproducibility | Two clean materializations with a published byte-comparison identity |
| Packaging | A deterministic strict archive with a published identity and accepted separate verifier result |
| Provenance | Ordered P01–P17 selected replay with P17 content-bound to the archive |

FIA-11 is evaluated as one parent assertion with two compulsory subcases
(FIA-011A and FIA-011B); the benchmark denominator remains 12. The benchmark
definition does not imply publication of raw runtime observations or an
independence property beyond the registered derivation record.
