# AEMB v0.2

The standalone AEMB v0.2 r0.5.1 article is *AEMB: Canonical Protocol-Graph
End-to-End Conformance for Hybrid Financial Protocols*. Its canonical PDF is
[available](../../papers/downloads/AEMB_v0.2_Cohort_Bound_Conformance_r0.5.1.pdf);
arXiv and SSRN are forthcoming.

The SSRN DOI [10.2139/ssrn.7216198](https://dx.doi.org/10.2139/ssrn.7216198)
belongs to the earlier AEMB v0.1.0 article, not to the v0.2 article. Article
publication and the AEMB v0.2 dataset/schema freeze are separate decisions;
the dataset remains `HOLD` until a distinct frozen-package review.

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
