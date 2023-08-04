import { Events } from "./EventsEnum";

declare global {
  interface Window {
    paygreenjs: PaygreenJS;
  }
}

type EventsType = Record<Events, string>;

export interface PaygreenJS {
  setPaymentMethod: (method: string | null) => void;
  useInstrument: (instrument: string) => void;
  setLanguage: (language: string) => void;
  status: () => StatusType;
  unmount: (removeListeners?: boolean) => void;
  submitPayment: () => void;
  focus: (input: string) => void;
  attachEventListener: (
    event: string,
    callback: (event: PGEvent) => void
  ) => void;
  detachEventListener: (event: string) => void;
  Events: EventsType;
  init: (params: ParamsType) => void;
}

interface PGEvent extends Event {
  detail: any;
}

export interface ParamsType {
  paymentOrderID?: string;
  objectSecret?: string;
  publicKey: string;
  mode: "tokenizer" | "instrument" | "payment";
  modeOptions?: {
    authorizedInstrument: boolean;
    shopId: string;
  };
  instrument?: string;
  token?: string;
  paymentMethod?: string;
  style?: StyleIframeType;
  buyer?: string;
  displayCardLogo?: boolean;
  lang?: string;
  displayAuthentication?: "inline" | "modal";
}

interface StyleIframeType {
  input: {
    base: {
      color: string;
      fontSize: string;
    };
    hover: {
      color: string;
    };
    focus: {
      color: string;
    };
    invalid: {
      color: string;
    };
    placeholder: {
      base: {
        color: string;
      };
    };
  };
  checkbox: {
    label: {
      base: {
        color: string;
      };
      unchecked: {
        color: string;
      };
    };
    box: {
      base: {
        color: string;
        hover: {
          color: string;
        };
      };
      unchecked: {
        color: string;
      };
    };
  };
}

interface StatusType {
  isDone: Boolean;
  isFail: Boolean;
  flows: Array<PaymentFlowType>;
  paymentOrder: PaymentOrderType;
}

export interface PaymentFlowType {
  method: string;
  status: string;
  amount: number;
  instrument?: string;
  token?: string;
}

export interface PaymentOrderType {
  id: string;
  object: string;
  amount: number;
  auto_capture: boolean;
  buyer: BuyerType;
  cancel_url: string;
  code: string;
  currency: string;
  cycle: string;
  description: string;
  integration_mode: string;
  mode: string;
  notification_url: string;
  occurrences: string;
  original_amount: number;
  partial_allowed: boolean;
  platforms: Array<string>;
  reference: string;
  return_url: string;
  shop_id: string;
  shop_name: string;
  status: string;
  status_reason: string;
  transactions: Array<TransactionType>;
  platform_options: PlatformsOptionsType;
}

export interface TransactionType {
  id: string;
  object: string;
  amount: number;
  operations: Array<OperationType>;
  status: string;
  status_reason: string;
}

export interface OperationType {
  id: string;
  object: string;
  payment_config: {
    id: string;
    object: string;
    platform: string;
  };
  instrument: InstrumentType;
  status: string;
  type: string;
  amount: number;
  authorization_code?: string;
  executed_at?: string;
}

export interface AuthenticationType {
  authentication_url: string;
  code: string;
  date: string;
  extra_data: { md_field_value: string; pareq_field_value: string };
  status: string;
  type: string;
}

export interface PlatformsOptionsType {
  bank_card: PlatformsOptionsDatasType;
  conecs: PlatformsOptionsDatasType;
  swile: PlatformsOptionsDatasType;
  restoflash: PlatformsOptionsDatasType;
  [key: string]: PlatformsOptionsDatasType;
}

export interface PlatformsOptionsDatasType {
  type?: string;
  reuse_card_proposal?: boolean;
  client_managed_reuse: boolean;
}

export interface BuyerType {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
}

interface InstrumentType {
  id: string;
  type: string;
  authentication: AuthenticationType;
  platform: string;
}
