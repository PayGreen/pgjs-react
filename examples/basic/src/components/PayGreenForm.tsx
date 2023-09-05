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
      attachEventListener(Events.ERROR, () => {
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
  }, [Events, attachEventListener, eventsAttached]);

  if (error) {
    return <div>An error occured</div>;
  }
  if (isSuccess) {
    return <div>Payment Success</div>;
  }
  return (
    <>
      <h1>Basic integration example</h1>
      <PaymentContainer>
        <MethodsContainer />
        <PanContainer />
        <CvvContainer />
        <ExpContainer />

        {!isAuthenticating && <button onClick={submitPayment}>Pay</button>}
      </PaymentContainer>
    </>
  );
};

export default PayGreenForm;
