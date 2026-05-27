/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Robust patch for window.fetch in restricted iframe environments (like AI Studio previews)
// where window.fetch is read-only (only has a getter on Window.prototype) but libraries attempt to overwrite it.
try {
  if (typeof window !== 'undefined') {
    const originalFetch = window.fetch;
    let currentFetch = originalFetch;

    const targets = [window, globalThis, self];
    targets.forEach((target) => {
      if (target) {
        try {
          Object.defineProperty(target, 'fetch', {
            get() {
              return currentFetch;
            },
            set(v) {
              currentFetch = v;
            },
            configurable: true,
            enumerable: true
          });
        } catch (e) {
          // Fallback to configurable data property if getter/setter fails
          try {
            Object.defineProperty(target, 'fetch', {
              value: originalFetch,
              writable: true,
              configurable: true,
              enumerable: true
            });
          } catch (err) {
            console.warn('Failed to define writable fetch property', err);
          }
        }
      }
    });
  }
} catch (e) {
  console.warn('Failed to define patch for window.fetch write compatibility', e);
}

export {};
