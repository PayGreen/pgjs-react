import {
  CoreContainer,
  CvvContainer,
  ExpContainer,
  MethodsContainer,
  PanContainer,
  PaymentContainer,
  usePGJS,
} from "@paygreen/pgjs-react";
import { useEffect } from "react";

const PayGreenForm = () => {
  const { isPGJSInit, initPGJS, isPGJSAvailable, submitPayment, unmount } =
    usePGJS();

  useEffect(() => {
    console.log(isPGJSAvailable, !isPGJSInit);
    if (isPGJSAvailable && !isPGJSInit) {
      initPGJS({
        mode: "instrument",
        publicKey: "pk_ea5736302a5f4a8fbacb0bfb6c9017e6",
        paymentMethod: "bank_card",
      });
    }
  }, [initPGJS, isPGJSAvailable, isPGJSInit, unmount]);

  return (
    <>
      <CoreContainer>
        <div>Formulaire de paiement</div>

        <MethodsContainer />
        <PaymentContainer>
          <PanContainer />
          <CvvContainer />
          <ExpContainer />
        </PaymentContainer>

        <button onClick={submitPayment}>Payer</button>
      </CoreContainer>
    </>
  );
};

export default PayGreenForm;
