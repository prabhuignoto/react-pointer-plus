import { RefObject } from "react";
import { ContextMenuOptions } from "./core.model";
/**
 * The props for the `useContextMenu` hook.
 */
type UseContextMenuProps = {
  /**
   * A ref to the target element that the context menu should be attached to.
   */
  target: RefObject<HTMLElement>;
  /**
   * An optional object containing options for the context menu.
   */
  contextMenuOptions?: ContextMenuOptions;
};

/**
 * The signature of the `useContextMenu` hook.
 */
export type useContextMenuFunction = (props: UseContextMenuProps) => void;
