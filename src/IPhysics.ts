import type { StageDef } from './data/maps';
import { MapEntityState } from './types/MapEntity.type';

export interface IPhysics {
  init(): Promise<void>;

  clear(): void;

  clearMarbles(): void;

  createStage(stage: StageDef): void;

  createMarble(id: number, x: number, y: number): void;

  shakeMarble(id: number): void;

  removeMarble(id: number): void;

  getMarblePosition(id: number): { x: number; y: number; angle: number; };

  getMarbleVelocity(id: number): { x: number; y: number; };

  getMarbleAngularVelocity(id: number): number;

  setMarbleState(
    id: number,
    position: { x: number; y: number; angle: number },
    velocity: { x: number; y: number },
    angularVelocity: number,
    isActive: boolean,
  ): void;

  getEntities(): MapEntityState[];

  impact(id: number): void;

  start(): void;

  step(deltaSeconds: number): void;
}
