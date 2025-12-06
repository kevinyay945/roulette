# Marble roulette

This is a lucky draw by dropping marbles.

[Demo]( https://lazygyu.github.io/roulette )

# Features

- Physics-based marble simulation using Box2D
- **State Save/Load**: Save and restore game state with large numbers of marbles
- **Auto-Save**: Automatic state persistence during simulation
- Multiple map layouts
- Skills and effects system
- Video recording support
- Minimap and camera controls

# Requirements

- Typescript
- Parcel
- box2d-wasm

# Development

```shell
> yarn
> yarn dev
```

# Build

```shell
> yarn build
```

# State Save/Load Feature

The application now supports saving and loading the current state of the marble simulation, which is especially useful when working with a large number of marbles. This prevents blocking and data loss.

For detailed usage instructions, see [SAVE_LOAD_USAGE.md](SAVE_LOAD_USAGE.md).

**Quick Start:**
- Click the "Save" button to save the current state
- Click the "Load" button to restore the last saved state
- Enable "Auto-save state" to automatically save every 5 seconds during simulation
