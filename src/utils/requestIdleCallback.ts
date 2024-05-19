import { isBrowser } from "~utils";

export const requestIdleCallback =
  (isBrowser &&
    window.requestIdleCallback &&
    window.requestIdleCallback.bind(window)) ||
  function (cb: IdleRequestCallback): number {
    let start = Date.now();
    return window.setTimeout(function () {
      cb({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start));
        },
      });
    }, 1);
  };

export const cancelIdleCallback =
  (isBrowser &&
    window.cancelIdleCallback &&
    window.cancelIdleCallback.bind(window)) ||
  function (id: number) {
    return window.clearTimeout(id);
  };
