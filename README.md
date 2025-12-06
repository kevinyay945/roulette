# Marble roulette

This is a lucky draw by dropping marbles.

[Demo]( https://lazygyu.github.io/roulette )

## Features

- **Physics-based marble simulation** using Box2D
- **State persistence** - Game state is automatically saved and can be restored after page refresh
- **Large marble support** - Handles 30,000+ marbles efficiently with IndexedDB storage
- **Skills system** - Special effects and impacts during gameplay
- **Multiple maps** - Various roulette designs to choose from
- **Localization** - Supports English and Korean

## State Persistence

The game now automatically saves your progress to prevent data loss when the browser crashes or needs to be refreshed. This is especially useful when working with large numbers of marbles (30,000+).

### How it works:

- **Auto-save**: Game state is automatically saved every 2 seconds during gameplay
- **Auto-restore**: On page load, you'll be prompted to restore the last saved state
- **Manual controls**: Use the Save, Load, and Clear buttons for manual state management

### What's saved:

- Marble positions and velocities
- Winners and rankings
- Camera position and zoom
- Game settings and options
- Current map selection

## Requirements

- Typescript
- Parcel
- box2d-wasm

## Development

```shell
> yarn
> yarn dev
```

## Build

```shell
> yarn build
```
