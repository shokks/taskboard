import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'taskboard-header-collapsed';

export function useHeaderCollapse() {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Initialize from localStorage, default to false (expanded)
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : false;
    } catch {
      return false;
    }
  });

  // Persist to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(isCollapsed));
    } catch {
      // Silently fail if localStorage is not available
    }
  }, [isCollapsed]);

  const toggle = useCallback(() => {
    setIsCollapsed((prev: boolean) => !prev);
  }, []);

  const expand = useCallback(() => {
    setIsCollapsed(false);
  }, []);

  const collapse = useCallback(() => {
    setIsCollapsed(true);
  }, []);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+H or Cmd+H to toggle header
      if ((event.ctrlKey || event.metaKey) && event.key === 'h') {
        event.preventDefault();
        toggle();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggle]);

  return {
    isCollapsed,
    toggle,
    expand,
    collapse
  };
}