/**
 * This file exports the `useContextMenu` hook, which allows you to easily create a context menu that appears when the user right-clicks on a target element.
 *
 * @packageDocumentation
 */

import { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { Menu } from "../components/menu";
import { useContextMenuFunction } from "./context-menu.model";
import styles from "./styles.module.scss";

/**
 * This hook allows you to easily create a context menu that appears when the user right-clicks on a target element.
 *
 * @param props - The props for the `useContextMenu` hook.
 */
const useContextMenu: useContextMenuFunction = ({
  target,
  contextMenuOptions,
}) => {
  // Create a ref to store the HTML string of the context menu
  const menuHTMLstring = useRef<string>();
  // Create a ref to store a placeholder div element
  const placeholder = useRef<HTMLDivElement>(document.createElement("div"));

  // Create a state to track whether the context menu is open or not
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  // Create a ref to track whether this is the first render of the component
  const isFirstRender = useRef(true);

  // Handle the context menu event
  const handleContextMenu = (ev: MouseEvent) => {
    ev.preventDefault();
    if (ev.button !== 2) return;

    const _target = target.current;
    const _placeholder = placeholder.current;

    if (_target && _placeholder && !contextMenuOpen) {
      const { clientX, clientY } = ev;
      const { offsetLeft, offsetTop } = _target;
      const calcTop = clientY - offsetTop;
      const calcLeft = clientX - offsetLeft;

      _placeholder.innerHTML = menuHTMLstring.current || "";
      _placeholder.classList.add(styles.context_menu_placeholder);
      _placeholder.style.top = `${calcTop}px`;
      _placeholder.style.left = `${calcLeft}px`;

      setContextMenuOpen(true);
    }
  };

  // Handle the transition end event
  const handleTransitionEnd = () => {
    const _placeholder = placeholder.current;

    if (_placeholder) {
      if (contextMenuOpen) {
        _placeholder.classList.remove(styles.menu_open);
      } else {
        _placeholder.classList.remove(styles.menu_close);
      }
    }
  };

  // Handle the select event
  const onSelect = () => {};

  // Update the menu HTML string when the context menu options change
  useEffect(() => {
    const _placeholder = placeholder.current;
    const _target = target.current;

    if (_placeholder && contextMenuOptions && _target) {
      menuHTMLstring.current = renderToString(
        <Menu {...contextMenuOptions} onSelect={onSelect} />
      );

      if (!_target.contains(_placeholder)) {
        _target.append(_placeholder);
      }
    }
  }, [target, contextMenuOptions]);

  // Update the placeholder class when the context menu state changes
  useEffect(() => {
    const _placeholder = placeholder.current;

    if (_placeholder && !isFirstRender.current) {
      if (contextMenuOpen) {
        _placeholder.classList.remove(styles.menu_close);
        _placeholder.classList.add(styles.menu_open);
      } else {
        _placeholder.classList.remove(styles.menu_open);
        _placeholder.classList.add(styles.menu_close);
      }
    }
  }, [contextMenuOpen]);

  // Close the context menu when the user clicks outside of it
  const handleClose = () => {
    const _placeholder = placeholder.current;

    if (_placeholder) {
      setContextMenuOpen(false);
    }
  };

  // Add event listeners to the target element
  useEffect(() => {
    const element = target.current;

    element?.addEventListener("contextmenu", handleContextMenu);
    element?.addEventListener("mousedown", handleClose);
    element?.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      element?.removeEventListener("contextmenu", handleContextMenu);
      element?.removeEventListener("mousedown", handleClose);
    };
  }, [target]);

  // Update the isFirstRender ref after the first render
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
  }, []);
};

export { useContextMenu };