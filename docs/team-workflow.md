# Team Workflow

## Branch naming

- `feat/dev1-ui-...`
- `feat/dev2-agent-...`
- `feat/dev3-tool-...`
- `feat/dev4-test-...`
- `fix/...`, `chore/...`

## Commit convention

- `feat: ...`
- `fix: ...`
- `test: ...`
- `docs: ...`
- `chore: ...`

## Merge conflict avoidance

- Use module ownership boundaries.
- Prefer additive files over editing shared files.
- Rebase frequently before opening PR.
- Keep shared type changes coordinated in `src/types`.

## Example feature workflow

1. Open issue and assign owner.
2. Create scoped branch.
3. Add/extend interfaces first.
4. Implement module and tests.
5. Run lint/typecheck/tests/build locally.
6. Open PR using template.
