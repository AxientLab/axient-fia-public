# FIA-11 subcases

FIA-11 is intentionally structured as a parent assertion with a two-part
semantic predicate:

| Subcase | Required condition | Excluded substitute |
| --- | --- | --- |
| FIA-011A | stale capability before admission; rejected receipt, no position | generic FIA-11 receipt |
| FIA-011B | capability/book epoch changes after a position opens; position remains open and `delta_t_seconds > 0` | FIA-03 or a declared-input placeholder |

The parent remains **FIA-11**, contributes one correlation and seven registered
evidence-layer positions, and is counted once in the all-12 cohort. The
subcases explain what the parent assertion requires; they are not new
denominator entries.
