import { PaygreenJS } from "../types";

const PGJS_URL_JS_PRODUCTION =
  "https://pgjs.paygreen.fr/latest/paygreen.min.js";
const PGJS_URL_JS_SANDBOX =
  "https://sb-pgjs.paygreen.fr/latest/paygreen.min.js";
const PGJS_URL_CSS_PRODUCTION =
  "https://pgjs.paygreen.fr/latest/paygreen.min.css";
const PGJS_URL_CSS_SANDBOX =
  "https://sb-pgjs.paygreen.fr/latest/paygreen.min.css";

const injectScript = (sandbox?: boolean): HTMLScriptElement => {
  const script = document.createElement("script");
  script.src = sandbox ? PGJS_URL_JS_SANDBOX : PGJS_URL_JS_PRODUCTION;

  const style = document.createElement("link");
  style.href = sandbox ? PGJS_URL_CSS_SANDBOX : PGJS_URL_CSS_PRODUCTION;
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

export const loadPGJS = (sandbox?: boolean) => {
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
      let pgjsScript = injectScript(sandbox);

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
