import { ReactNode, RefObject } from 'react';
import { Props } from './core.model';

export type MousePointerProps = {
  icon?: ReactNode;
  container: RefObject<HTMLElement>;
  mouseX?: number;
  mouseY?: number;
  // direction: MouseMovementDirection;
  isActive?: boolean;
  isBeingSelected?: boolean;
} & Props;
