import { lazy, type ComponentType } from "react";

const RELOAD_KEY = "lovable:chunk-reloaded";

/**
 * React.lazy wrapper that survives stale deploys. When a dynamic chunk 404s
 * (old index.html referencing hashed files that no longer exist), retry once,
 * then force a single hard reload to pick up the new build.
 */
export function lazyWithRetry<T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    try {
      const mod = await factory();
      sessionStorage.removeItem(RELOAD_KEY);
      return mod;
    } catch (error) {
      // Second chance: transient network hiccup.
      try {
        const mod = await factory();
        sessionStorage.removeItem(RELOAD_KEY);
        return mod;
      } catch {
        if (!sessionStorage.getItem(RELOAD_KEY)) {
          sessionStorage.setItem(RELOAD_KEY, "1");
          window.location.reload();
          // Never resolves; the page is reloading.
          return new Promise<{ default: T }>(() => {});
        }
        throw error;
      }
    }
  });
}
