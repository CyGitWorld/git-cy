"use client";

import { useEffect } from "react";

export const GlobalUnhandledRejection = () => {
  useEffect(() => {
    const fn = function (event: PromiseRejectionEvent) {
      window.alert(`(Error) ${event.reason}.`);
    };

    window.addEventListener("unhandledrejection", fn);
    return () => {
      window.removeEventListener("unhandledrejection", fn);
    };
  }, []);

  return null;
};
