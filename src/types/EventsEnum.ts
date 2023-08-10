/* eslint-disable import/prefer-default-export */

/**
 * All events dispatched by PGJS.
 */
export enum Events {
  /**
   * Trigger when the whole Payment Order has been payed.
   */
  FULL_PAYMENT_DONE = "FULL_PAYMENT_DONE",
  /**
   * Trigger when the actual payment flow changed
   */
  PAYMENT_FLOW_ONCHANGE = "PAYMENT_FLOW_ONCHANGE",
  /**
   * Trigger when the actual payment is done (successfull or not).
   * Only triggered if there is a rest to pay.
   */
  ACTUAL_FLOW_PAYMENT_DONE = "ACTUAL_FLOW_PAYMENT_DONE",
  /**
   * Trigger if an error occured, return Error.
   */
  ERROR = "ERROR",
  /**
   * Trigger when the user change Reusable Checkbox state.
   */
  REUSABLE_ALLOWED_CHANGE = "REUSABLE_ALLOWED_CHANGE",
  /**
   * Trigger when the payment authorization has been refused.
   */
  PAYMENT_FAIL = "PAYMENT_FAIL",
  /**
   * Trigger when the token is ready, return the token string.
   */
  TOKEN_READY = "TOKEN_READY",
  /**
   * Trigger when the token is ready and these details like issue, return the token in detail.
   */
  TOKEN_DETAILS_READY = "TOKEN_DETAILS_READY",
  /**
   * Trigger if the tokenize fail, return error value that detail why the tokenize fail.
   */
  TOKEN_FAIL = "TOKEN_FAIL",
  /**
   * Trigger if PAN is changed, return detail object with validity and potential error (doesn't work with bank_card svad)
   */
  PAN_FIELD_ONCHANGE = "PAN_FIELD_ONCHANGE",
  /**
   * Trigger if PAN is FULFILLED and valid (doesn't work with bank_card svad)
   */
  PAN_FIELD_FULFILLED = "PAN_FIELD_FULFILLED",
  /**
   * Trigger if CVV is changed, return detail object with validity and potential error (doesn't work with bank_card svad)
   */
  CVV_FIELD_ONCHANGE = "CVV_FIELD_ONCHANGE",
  /**
   * Trigger if CVV is FULFILLED and valid (doesn't work with bank_card svad)
   */
  CVV_FIELD_FULFILLED = "CVV_FIELD_FULFILLED",
  /**
   * Trigger if EXP is changed, return detail object with validity and potential error (doesn't work with bank_card svad)
   */
  EXP_FIELD_ONCHANGE = "EXP_FIELD_ONCHANGE",
  /**
   * Trigger if EXP is FULFILLED and valid (doesn't work with bank_card svad)
   */
  EXP_FIELD_FULFILLED = "EXP_FIELD_FULFILLED",
  /**
   * Trigger CARD change, return detail object with validity of the card
   */
  CARD_ONCHANGE = "CARD_ONCHANGE",
  /**
   * Trigger to submit tokenize form
   */
  REQUEST_SUBMIT_TOKENIZE_FORM = "REQUEST_SUBMIT_TOKENIZE_FORM",
  /**
   * Trigger when Instrument has been created
   */
  INSTRUMENT_READY = "INSTRUMENT_READY",
  /**
   * Trigger when authentication flow start (3DS, OAUTH ...)
   */
  AUTHENTICATION_FLOW_START = "AUTHENTICATION_FLOW_START",
  /**
   * Trigger when a open pop must be open, provide the url
   */
  ON_OPEN_POPUP = "ON_OPEN_POPUP",
}
