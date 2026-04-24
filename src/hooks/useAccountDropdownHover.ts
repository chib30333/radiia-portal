"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useAccountDropdownHover(initialOpen = false) {
  const minimumVisibleMs = 2000;
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isHoveringTrigger, setIsHoveringTrigger] = useState(false);
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
  const [openedAt, setOpenedAt] = useState<number | null>(initialOpen ? Date.now() : null);

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const openDropdown = useCallback(() => {
    clearCloseTimeout();
    setIsOpen((current) => {
      if (!current) {
        setOpenedAt(Date.now());
      }

      return true;
    });
  }, [clearCloseTimeout]);

  const closeDropdown = useCallback(() => {
    clearCloseTimeout();
    setIsOpen(false);
    setOpenedAt(null);
  }, [clearCloseTimeout]);

  const scheduleCloseIfAllowed = useCallback(() => {
    clearCloseTimeout();

    if (isHoveringTrigger || isHoveringDropdown) {
      return;
    }

    const elapsed = openedAt ? Date.now() - openedAt : minimumVisibleMs;
    const remaining = Math.max(0, minimumVisibleMs - elapsed);

    if (remaining === 0) {
      closeDropdown();
      return;
    }

    closeTimeoutRef.current = setTimeout(() => {
      closeTimeoutRef.current = null;
      setIsOpen((current) => {
        if (isHoveringTrigger || isHoveringDropdown) {
          return current;
        }

        setOpenedAt(null);
        return false;
      });
    }, remaining);
  }, [clearCloseTimeout, closeDropdown, isHoveringDropdown, isHoveringTrigger, openedAt]);

  useEffect(() => {
    if (isHoveringTrigger || isHoveringDropdown) {
      openDropdown();
      return;
    }

    if (isOpen) {
      scheduleCloseIfAllowed();
    }
  }, [isHoveringDropdown, isHoveringTrigger, isOpen, openDropdown, scheduleCloseIfAllowed]);

  useEffect(() => {
    return () => {
      clearCloseTimeout();
    };
  }, [clearCloseTimeout]);

  return {
    isOpen,
    openDropdown,
    closeDropdown,
    setIsHoveringTrigger,
    setIsHoveringDropdown
  };
}