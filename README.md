# Flatland

Flatland is a small, interactive browser experiment: you move through a two-dimensional world, but your character sees only a one-dimensional strip.

The upper canvas is the character's view. Each pixel column represents one ray cast into the world; the closest object supplies the column's color, and distance controls its brightness. The lower canvas shows the full map, the character, and the current field of view.

The project is intentionally self-contained. It has no runtime dependencies, build step, network requests, cookies, or local storage.

## Run it

Clone or download the repository, then open `flatland.html` in a modern browser. Because all HTML, CSS, and JavaScript are in that file, it works directly from a local `file://` URL.

If you prefer to use a local web server, run one of these commands from the repository root:

```powershell
py -m http.server 8000
```

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/flatland.html>.

## Controls

| Input | Action |
| --- | --- |
| `W` or `Up Arrow` | Move forward |
| `S` or `Down Arrow` | Move backward |
| `A` or `Left Arrow` | Turn left |
| `D` or `Right Arrow` | Turn right |
| Drag horizontally on the upper strip | Turn with the mouse |
| Click the map | Teleport to that point |
| `F1` | Show or hide in-game help |

## How it works

The world is reduced to two ray-intersection primitives: line segments and circles. Polygons become collections of line segments. For every animation frame, Flatland:

1. Updates the character from the current keyboard state.
2. Casts one ray for every column in the upper canvas.
3. Colors each column from the nearest intersection and fades it by distance.
4. Draws the complete world and field-of-view wedge on the lower canvas.

See [Architecture](docs/ARCHITECTURE.md) for the data model, intersection math, rendering flow, and current design limits.

## Customize the world

Edit the world setup near the beginning of the inline script in `flatland.html`:

- `addLine(x1, y1, x2, y2, color)` adds a wall segment.
- `addCircle(cx, cy, radius, color)` adds a circle.
- `addPolygon(points, color)` connects a list of points into a closed outline.
- The `player` object controls the starting position, direction, field of view, movement speed, and turn speed.

Canvas coordinates start at the upper-left corner. Positive `x` goes right and positive `y` goes down. Colors use any CSS color accepted by the Canvas 2D API.

## Development

Playing the demo requires only a modern browser with Canvas 2D support. Repository checks additionally require Node.js 18 or newer; they do not install any packages.

```powershell
npm test
```

The check confirms the expected document structure and canvas sizes, then parses the inline JavaScript for syntax errors. Browser behavior still needs the short manual checklist in [CONTRIBUTING.md](CONTRIBUTING.md).

## Repository layout

| Path | Purpose |
| --- | --- |
| `flatland.html` | Complete application: markup, styles, world data, raycasting, input, and rendering |
| `scripts/check.mjs` | Dependency-free structural and JavaScript syntax check |
| `docs/ARCHITECTURE.md` | Technical design and extension notes |
| `.github/` | Issue forms and pull-request guidance |

## Current limitations

- Movement is measured per animation frame, so speed varies with refresh rate.
- Collision detection checks clearance only along the immediate movement ray; it is not a full body or swept collision system.
- Clicking the map can place the character inside or outside geometry.
- Input is designed for keyboard and mouse; touch controls are not implemented.
- Browser compatibility is not covered by an automated browser test matrix.

## Contributing and security

Contributions are welcome; read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) first. Please report suspected vulnerabilities privately as described in [SECURITY.md](SECURITY.md).

Changes intended for users should also be recorded in [CHANGELOG.md](CHANGELOG.md).

## License

No software license has been selected for this repository. Unless the repository owner adds one, copyright law applies and no permission to copy, modify, or redistribute the project is granted beyond rights provided by law.
