import React, {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  EventsType,
  PGEvent,
  ParamsType,
  PaymentFlowType,
  PaymentOrderType,
} from "./types";
import { Events } from "./types/EventsEnum";
import { OAuthMethods } from "./utils/constants";
import { loadPGJS } from "./utils/loadPGJS";

const PGJSContext = createContext<ProviderProps>({
  initPGJS: () => null,
  setPaymentMethod: () => null,
  setInstrument: () => null,
  setLanguage: () => null,
  submitPayment: () => null,
  unmount: () => null,
  detachEventListener: () => null,
  attachEventListener: () => null,
  isPGJSAvailable: false,
  isPGJSInit: false,
  paymentOrder: null,
  flows: [],
  flow: null,
  cardIsValid: false,
  isPaying: false,
  isAuthenticating: false,
  publicKey: null,
  Events: Events,
});

interface ProviderProps {
  initPGJS: (params: ParamsType) => void;
  setPaymentMethod: (method: string | null) => void;
  setInstrument: (instrument: string) => void;
  setLanguage: (language: string) => void;
  submitPayment: () => void;
  unmount: (detach?: boolean) => void;
  detachEventListener: (detach?: boolean) => void;
  attachEventListener: (
    event: string,
    callback: (event: PGEvent) => void
  ) => void;
  isPGJSAvailable: boolean;
  isPGJSInit: boolean;
  paymentOrder: PaymentOrderType | null;
  flows: Array<PaymentFlowType>;
  flow: PaymentFlowType | null;
  cardIsValid: boolean;
  isPaying: boolean;
  isAuthenticating: boolean;
  publicKey: string | null;
  Events: EventsType;
}

interface PGJSProviderProps {
  devMode?: boolean;
  children?: ReactElement | Array<ReactElement>;
}

const PGJSProvider = ({ devMode, children }: PGJSProviderProps) => {
  const [isPGJSAvailable, setIsPGJSAvailable] = useState(!!window?.paygreenjs);
  const [isPGJSInit, setIsPGJSInit] = useState(false);
  const [isEventsSubscribed, setIsEventsSubscribed] = useState(false);
  const [cardIsValid, setCardIsValid] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [flow, setFlow] = useState<PaymentFlowType | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  const paymentOrder = window?.paygreenjs?.status()?.paymentOrder;
  const flows = window?.paygreenjs?.status()?.flows;

  const initPGJS = (config: ParamsType) => {
    if (!isPGJSInit) {
      setPublicKey(config.publicKey);
      window?.paygreenjs.init(config);
      setIsPGJSInit(true);
    }
  };

  const setPaymentMethod = (method: string | null) => {
    window?.paygreenjs.setPaymentMethod(method);
  };

  const setInstrument = (instrument: string) => {
    setIsPaying(true);
    setIsAuthenticating(true);
    window?.paygreenjs.useInstrument(instrument);
  };

  const setLanguage = (language: string) => {
    if (isPGJSInit) {
      window?.paygreenjs.setLanguage(language);
    }
  };

  const submitPayment = () => {
    setIsPaying(true);
    window?.paygreenjs.submitPayment();
  };

  const unmount = (detach?: boolean) => {
    setIsPGJSInit(false);
    window?.paygreenjs.unmount(detach);
  };

  const attachEventListener = window?.paygreenjs?.attachEventListener;
  const detachEventListener = window?.paygreenjs?.detachEventListener;

  useEffect(() => {
    if (!isPGJSAvailable) {
      return;
    }

    if (isEventsSubscribed) {
      return;
    }

    setIsEventsSubscribed(true);

    // Subscribe events PGJS and attach them to context states
    window?.paygreenjs.attachEventListener(
      window?.paygreenjs.Events.PAYMENT_FLOW_ONCHANGE,
      (event) => {
        setFlow(event?.detail);
      }
    );

    window?.paygreenjs.attachEventListener(
      window?.paygreenjs.Events.TOKEN_FAIL,
      () => {
        setIsPaying(false);
      }
    );

    window?.paygreenjs.attachEventListener(
      window?.paygreenjs.Events.ERROR,
      (event) => {
        setFlow(null);
        setPaymentMethod(null);
        setIsPaying(false);
        setIsAuthenticating(false);
      }
    );

    window?.paygreenjs.attachEventListener(
      window?.paygreenjs.Events.CARD_ONCHANGE,
      (event) => {
        setCardIsValid(event.detail.valid);
      }
    );

    window?.paygreenjs.attachEventListener(
      window?.paygreenjs.Events.AUTHENTICATION_FLOW_START,
      () => {
        setIsAuthenticating(true);
      }
    );

    window?.paygreenjs.attachEventListener(
      window?.paygreenjs.Events.ACTUAL_FLOW_PAYMENT_DONE,
      () => {
        setIsPaying(false);
        setIsAuthenticating(false);
        setPaymentMethod(null);
      }
    );

    window?.paygreenjs.attachEventListener(
      window?.paygreenjs.Events.PAYMENT_FAIL,
      () => {
        setIsPaying(false);
        setIsAuthenticating(false);
        setPaymentMethod(null);
      }
    );

    return () => {
      if (isPGJSInit) {
        window?.paygreenjs.unmount(true);
      }
    };
  }, [isEventsSubscribed, isPGJSInit, isPGJSAvailable]);

  useEffect(() => {
    // If only a means of payment outside oauth
    if (
      !flow?.method &&
      paymentOrder?.platforms?.length === 1 &&
      !OAuthMethods?.includes(paymentOrder?.platforms?.[0])
    ) {
      setPaymentMethod(paymentOrder?.platforms?.[0]);
    }
    // If flow is pending with CKO, set card valid because CARD_VALID event doens't work
    if (
      flow?.status === "pending" &&
      flow?.method === "bank_card" &&
      paymentOrder?.platform_options?.bank_card?.type === "svad_1"
    ) {
      setCardIsValid(true);
    } else {
      setCardIsValid(false);
    }

    // If Starting a OAuth Flow, set authenticating to true direclty
    if (flow?.status === "pending" && OAuthMethods.includes(flow.method)) {
      setIsAuthenticating(true);
    }
  }, [flow, paymentOrder]);

  useEffect(() => {
    const initialiseAndLoadPGJS = async () => {
      await loadPGJS(devMode);
      setIsPGJSAvailable(true);
    };
    initialiseAndLoadPGJS();
  }, []);

  if (!isPGJSAvailable) {
    return null;
  }

  return (
    <PGJSContext.Provider
      value={{
        initPGJS,
        setPaymentMethod,
        setInstrument,
        setLanguage,
        submitPayment,
        unmount,
        detachEventListener,
        attachEventListener,
        isPGJSAvailable,
        isPGJSInit,
        paymentOrder,
        flows,
        flow,
        cardIsValid,
        isPaying,
        isAuthenticating,
        publicKey,
        Events,
      }}
    >
      {children}
    </PGJSContext.Provider>
  );
};

const usePGJS = () => useContext(PGJSContext);

export { PGJSProvider, usePGJS };
