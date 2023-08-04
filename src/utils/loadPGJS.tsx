import { PaygreenJS } from "../types";

const PGJS_URL_JS = "https://rc-pgjs.paygreen.dev/latest/paygreen.min.js";
const PGJS_URL_CSS = "https://rc-pgjs.paygreen.dev/latest/paygreen.min.css";

const injectScript = (): HTMLScriptElement => {
  const script = document.createElement("script");
  script.src = PGJS_URL_JS;

  const style = document.createElement("link");
  style.href = PGJS_URL_CSS;
  style.type = "text/css";
  style.rel = "stylesheet";

  const requiredSkeleton = document.head || document.body;

  if (!requiredSkeleton) {
    throw new Error("Invalid dom");
  }

  requiredSkeleton.appendChild(script);
  requiredSkeleton.appendChild(style);

  return script;
};

export const loadPGJS = () => {
  let pgjsPromise: Promise<PaygreenJS | null> | null = null;

  if (pgjsPromise !== null) {
    return pgjsPromise;
  }

  pgjsPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      resolve(null);
      return;
    }

    if (window.paygreenjs) {
      console.warn("PGJS is already loaded");
    }

    if (window.paygreenjs) {
      resolve(window.paygreenjs);
      return;
    }

    try {
      let pgjsScript = injectScript();

      pgjsScript.addEventListener("load", () => {
        if (window.paygreenjs) {
          resolve(window.paygreenjs);
        } else {
          reject(new Error("Unable to find PGJS"));
        }
      });

      pgjsScript.addEventListener("error", () => {
        reject(new Error("Failed to load PGJS"));
      });
    } catch (error) {
      reject(error);
      return;
    }
  });

  return pgjsPromise;
};
