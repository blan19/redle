import { lazy } from "react";
import { requestIdleCallback } from "~utils";

export const idle = <T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  options: IdleRequestOptions | undefined
): React.LazyExoticComponent<T> => {
  let componentPromise: Promise<{ default: T }>;

  const loadComponent = () => {
    if (!componentPromise)
      componentPromise = new Promise<{ default: T }>((resolve) => {
        requestIdleCallback(() => resolve(factory()), options);
      });
    return componentPromise;
  };

  return lazy(loadComponent);
};
