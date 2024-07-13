"use client";

import { useEffect } from "react";

// alert 알람
export const GlobalUnhandledRejection = () => {
  useEffect(() => {
    console.log("attach");
    const fn = function (event: PromiseRejectionEvent) {
      console.log(
        "Unhandled rejection (promise: ",
        event.promise,
        ", reason: ",
        event.reason,
        ")."
      );
    };

    window.addEventListener("unhandledrejection", fn);
    return () => {
      window.removeEventListener("unhandledrejection", fn);
    };
  }, []);

  return null;
};
