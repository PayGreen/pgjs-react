# PGJS-React

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

The PGJS-React TypeScript Library is a powerful tool that allows seamless integration of PayGreenJS into your React applications for easy online payment processing using the PayGreen platform.

## Features

- Easy integration of PayGreenJS for online payments.
- Components to manage the payment process, secure process and summarize transactions.
- TypeScript support for enhanced type safety and code maintainability.

## Installation

You can install the library using npm:

```sh
npm install @paygreen/pgjs-react
```

## Usage

To start using the components, please follow these steps:

1. Wrap your application with the PGJSProvider provided by @paygreen/pgjs-react

```jsx
import { PGJSProvider } from "@paygreen/pgjs-react";
import React from "react";
import PayGreenForm from "./components/PayGreenForm";

const App = () => {
  // devMode uses your Sandbox account
  return (
    <PGJSProvider devMode>
      <h1>Payment with PayGreen</h1>
      <PayGreenForm />
    </PGJSProvider>
  );
};

export default App;
```

2. Now you can start creating components like so : ./components/PayGreenForm.js

```jsx
import {
  CvvContainer,
  ExpContainer,
  MethodsContainer,
  PanContainer,
  PaymentContainer,
  usePGJS,
} from "@paygreen/pgjs-react";
import { useEffect, useState } from "react";

const PayGreenForm = () => {
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [eventsAttached, setEventsAttached] = useState(false);

  const {
    isPGJSInit,
    initPGJS,
    isPGJSAvailable,
    submitPayment,
    unmount,
    attachEventListener,
    isAuthenticating,
    Events,
  } = usePGJS();

  useEffect(() => {
    if (isPGJSAvailable && !isPGJSInit) {
      // Replace the initPGJS configuration with yours
      initPGJS({
        mode: "payment",
        paymentMethod: "bank_card",
        publicKey: "pk_xxxx",
        paymentOrderID: "po_xxxxx",
        objectSecret: "xxxxxxxxxx",
      });
    }
  }, [initPGJS, isPGJSAvailable, isPGJSInit, unmount]);

  useEffect(() => {
    if (!eventsAttached && attachEventListener) {
      attachEventListener(Events.ERROR, (event) => {
        setError(true);
      });
      attachEventListener(Events.INSTRUMENT_READY, (event) => {
        console.log(event?.detail);
      });
      attachEventListener(Events.FULL_PAYMENT_DONE, () => {
        setIsSuccess(true);
      });
      setEventsAttached(true);
    }
  }, [Events, attachEventListener, eventsAttached, unmount]);

  if (error) {
    return <div>An error occured</div>;
  }
  if (isSuccess) {
    return <div>Payment Success</div>;
  }
  return (
    <PaymentContainer>
      <MethodsContainer />
      <PanContainer />
      <CvvContainer />
      <ExpContainer />

      {!isAuthenticating && <button onClick={submitPayment}>Pay</button>}
    </PaymentContainer>
  );
};

export default PayGreenForm;
```

### Documentation

For detailed usage instructions, configuration options, and examples, please refer to our [Documentation](https://developers.paygreen.fr/).

### Contributing

Contributions are welcome! If you find any issues or want to contribute to the project, please follow our (WIP) Contribution Guidelines.

### License

This project is licensed under the MIT License - see the LICENSE file for details.
