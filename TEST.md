# TESTS.md

# Testing Documentation

The application uses Vitest for unit testing the audit engine logic.

Primary test coverage focuses on:

* pricing calculations
* recommendation generation
* savings aggregation
* edge-case handling
* deterministic audit behavior

All tests are located in:

```txt id="v7j2gf"
src/engine/auditEngine.test.js
```

---

# Running Tests

Run all tests locally with:

```bash id="pjlwm7"
npm test
```

---

# Test Coverage

| Test Case                       | Coverage                                                                                                                                                    |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cursor Business → Pro downgrade | Verifies downgrade recommendations trigger correctly for small teams using Cursor Business plans. Ensures savings are calculated using `(40 - 20) × seats`. |
| Claude Team → Pro downgrade     | Verifies Team plan recommendations trigger correctly for teams under minimum seat requirements. Ensures savings use `(30 - 20) × seats`.                    |
| Optimal tool detection          | Ensures correctly configured tool plans return `"optimal"` findings with zero calculated savings.                                                           |
| Total savings aggregation       | Verifies `totalMonthlySavings` and `totalAnnualSavings` aggregate correctly across multiple findings and tools.                                             |
| API spend recommendation        | Ensures high API usage triggers the Credex credits recommendation flow when spend exceeds configured thresholds.                                            |

---

# Testing Philosophy

The audit engine was intentionally designed as:

* deterministic
* rule-based
* pure-function driven

This made unit testing straightforward and reliable.

The application avoids using AI for core financial calculations specifically to ensure:

* reproducible outputs
* predictable recommendation behavior
* stable test coverage

---

# What Was Tested Most Heavily

Highest testing priority was given to:

* savings calculations
* downgrade recommendation accuracy
* edge-case handling for team sizes
* aggregation logic

These areas directly impact user trust and perceived product accuracy.

---

# Manual Testing

In addition to automated tests, manual testing was performed for:

* responsive layouts
* shareable public routes
* loading states
* AI summary fallback behavior
* deployment routing
* localStorage persistence

---

# Known Limitations

The current test suite does not yet include:

* end-to-end browser testing
* visual regression testing
* integration testing against live Supabase APIs

These would likely be added in a production-scale version of the application.

---
