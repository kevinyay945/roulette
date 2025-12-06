# Ball Dropping State Save/Load Feature

## Overview

This feature allows you to save and load the current state of the marble roulette game, including all ball positions, velocities, and simulation state. This is especially useful when dealing with a large number of balls to prevent data loss and allow resuming from where you left off.

## Features

1. **Manual Save/Load**: Save and load game state at any time using UI buttons
2. **Auto-Save**: Automatically save game state at regular intervals during simulation
3. **IndexedDB Storage**: Efficient storage for large numbers of balls without blocking the UI
4. **Non-blocking**: Save operations are asynchronous and don't interrupt the simulation

## Usage

### Manual Save/Load

#### Saving State
1. Start a simulation with marbles
2. Click the "Save" button in the control panel
3. You'll see a confirmation message with the save ID

#### Loading State
1. Click the "Load" button in the control panel
2. The most recent saved state will be loaded
3. The simulation will resume from the saved state

### Auto-Save

1. Enable the "Auto-save state" checkbox in the settings
2. During simulation, the state will be automatically saved every 5 seconds
3. This prevents data loss if the browser crashes or the tab is closed

### Programmatic Usage

You can also use the save/load functionality programmatically via the JavaScript console:

```javascript
// Save current state
const saveId = await window.roulette.saveState();
console.log('State saved with ID:', saveId);

// Load the most recent state
await window.roulette.loadState();

// Load a specific state by ID
await window.roulette.loadState(saveId);

// Get all saved states
const states = await window.roulette.getAllSavedStates();
console.log('All saved states:', states);

// Clear all saved states
await window.roulette.clearSavedStates();

// Enable auto-save with custom interval (in milliseconds)
window.roulette.setAutoSave(true, 10000); // Save every 10 seconds

// Disable auto-save
window.roulette.setAutoSave(false);
```

## Performance Considerations

### Large Number of Balls

The implementation is optimized for large numbers of balls:

1. **Non-blocking saves**: Save operations are asynchronous and don't block the render loop
2. **IndexedDB**: Uses IndexedDB for efficient storage of large datasets
3. **Auto-save throttling**: Auto-save only triggers at specified intervals (default 5 seconds)
4. **Memory efficient**: Only active marbles' state is saved

### What's Saved

The following state is persisted:

- **Marbles**: Position, velocity, angular velocity, activation state, name, weight, hue
- **Winners**: List of marbles that have reached the goal
- **Game Settings**: Winner rank, total marble count, running state
- **Map**: Current stage/map index

### Browser Storage Limits

IndexedDB typically allows storage of several hundred MB to GB depending on the browser:
- Chrome/Edge: Up to 60% of total disk space
- Firefox: Up to 50% of total disk space
- Safari: Up to 1 GB

For reference, a typical marble state is ~200 bytes, so you can save states with:
- 1,000 marbles: ~200 KB
- 10,000 marbles: ~2 MB
- 100,000 marbles: ~20 MB

## Events

The system dispatches custom events that you can listen to:

```javascript
// Listen for save events
window.roulette.addEventListener('stateSaved', (e) => {
  console.log('State saved:', e.detail.id, e.detail.timestamp);
});

// Listen for load events
window.roulette.addEventListener('stateLoaded', (e) => {
  console.log('State loaded:', e.detail.timestamp);
});
```

## Technical Details

### State Structure

```typescript
interface GameState {
  marbles: MarbleState[];
  winners: { id: number; name: string }[];
  winnerRank: number;
  totalMarbleCount: number;
  isRunning: boolean;
  timestamp: number;
  stageIndex: number;
}

interface MarbleState {
  id: number;
  name: string;
  weight: number;
  position: { x: number; y: number; angle: number };
  velocity: { x: number; y: number };
  angularVelocity: number;
  isActive: boolean;
  hue: number;
  coolTime: number;
  stuckTime: number;
}
```

### Architecture

1. **StateManager** (`src/stateManager.ts`): Handles IndexedDB operations
2. **Roulette**: Extended with `saveState()`, `loadState()`, and auto-save logic
3. **Marble**: Extended with `getState()` and `setState()` methods
4. **IPhysics/Box2dPhysics**: Extended with velocity getters and state setters

## Troubleshooting

### Save button doesn't work
- Check browser console for errors
- Ensure IndexedDB is enabled in your browser
- Check if you have enough storage space

### State doesn't load correctly
- Ensure you're loading a state for the same map
- Check if the state file is corrupted
- Try clearing all states and saving a new one

### Auto-save causing performance issues
- Increase the auto-save interval
- Disable auto-save during critical moments
- Reduce the number of marbles

## Browser Compatibility

This feature requires:
- IndexedDB support (all modern browsers)
- ES2017+ support (async/await)
- Supported browsers: Chrome 55+, Firefox 52+, Safari 11+, Edge 15+
