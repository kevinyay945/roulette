/**
 * StateManager handles saving and loading game state using IndexedDB
 * Optimized for handling large numbers of marbles (30,000+)
 */

export type WinnerType = 'first' | 'last' | 'custom';

export interface MarbleState {
  id: number;
  name: string;
  weight: number;
  x: number;
  y: number;
  angle: number;
  hue: number;
  isActive: boolean;
  skill: number;
  coolTime: number;
  stuckTime: number;
}

export interface EntityState {
  index: number;
  angle: number;
}

export interface GameState {
  marbles: MarbleState[];
  winners: MarbleState[];
  entities: EntityState[];
  winnerRank: number;
  isRunning: boolean;
  stageIndex: number;
  totalMarbleCount: number;
  cameraX: number;
  cameraY: number;
  cameraZoom: number;
  options: {
    useSkills: boolean;
    winningRank: number;
    autoRecording: boolean;
    darkMode: boolean;
  };
  winnerType: WinnerType;
  timestamp: number;
}

export class StateManager {
  private dbName = 'RouletteGameDB';
  private storeName = 'gameState';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => {
        console.error('Failed to open IndexedDB:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
    });
  }

  async saveState(state: GameState): Promise<void> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      // Store with a fixed key so we always overwrite the latest state
      const request = store.put(state, 'currentGame');

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        console.error('Failed to save state:', request.error);
        reject(request.error);
      };
    });
  }

  async loadState(): Promise<GameState | null> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get('currentGame');

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        console.error('Failed to load state:', request.error);
        reject(request.error);
      };
    });
  }

  async clearState(): Promise<void> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete('currentGame');

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        console.error('Failed to clear state:', request.error);
        reject(request.error);
      };
    });
  }

  async hasState(): Promise<boolean> {
    const state = await this.loadState();
    return state !== null;
  }
}
