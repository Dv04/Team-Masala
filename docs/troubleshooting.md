# Troubleshooting

- If API responses fail validation, inspect Zod errors in response body.
- If mock tasks do not run, verify `USE_MOCK_PROVIDER=true`.
- If tests fail due to stale singleton state, call `resetRuntime()` in test setup.
