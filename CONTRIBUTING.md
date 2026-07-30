# Contributing

Thank you for helping improve Flatland. The project favors a small, readable implementation that demonstrates the idea without a framework or runtime dependency.

By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Set up a local copy

1. Fork and clone the repository.
2. Open `flatland.html` directly in a modern browser, or serve the repository with `py -m http.server 8000` on Windows or `python3 -m http.server 8000` on macOS/Linux.
3. For repository checks, install Node.js 18 or newer. No `npm install` step is required because there are no package dependencies.

## Before proposing a change

For a bug, search the existing issues first and provide the browser/version, operating system, reproduction steps, expected behavior, actual behavior, and relevant console errors.

For a larger feature or architectural change, open a proposal before investing heavily. Explain how it supports the central experiment: understanding a two-dimensional world through a one-dimensional visual field.

Security reports follow a separate private process in [SECURITY.md](SECURITY.md).

## Implementation guidelines

- Keep the application usable as a self-contained HTML file unless a discussed change requires otherwise.
- Prefer browser APIs and straightforward geometry over dependencies or abstractions that obscure the demonstration.
- Use `const` by default and `let` only for reassigned bindings.
- Preserve strict mode and use semicolons consistently with the existing script.
- Keep geometry functions independent of canvas or DOM state where practical.
- Comment the reason behind non-obvious math or behavior, not every statement.
- Update the README or architecture document when behavior, controls, setup, or design changes.
- Add a concise entry under `Unreleased` in `CHANGELOG.md` for user-visible changes.

The repository's whitespace and line-ending conventions are recorded in `.editorconfig` and `.gitattributes`.

## Validate the change

Run the dependency-free check:

```powershell
npm test
```

Then manually verify all relevant behavior:

- The page opens without console errors.
- Both canvases render at their expected sizes.
- Forward and backward movement work with both letter and arrow keys.
- Left and right turning work with both letter and arrow keys.
- Walls stop ordinary forward and backward movement.
- Dragging the upper strip turns the character.
- Clicking the map teleports the character to the clicked coordinates.
- `F1` opens and closes help without triggering the browser's default F1 action.
- The upper strip changes consistently as the player moves or turns.

Test at least one Chromium-based browser and, when rendering or input changes, a second browser engine such as Firefox or Safari. State exactly what you tested in the pull request.

## Pull requests

Keep each pull request focused. Include:

- A short explanation of the problem and solution.
- Screenshots or a short recording for visible changes.
- Automated and manual verification performed.
- Known limitations or follow-up work.

Do not combine unrelated formatting or refactoring with a behavioral change. Maintainers may ask for a change to be split when that makes review safer.
