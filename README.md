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

To get started, import the necessary components from the pgjs-react library and integrate them into your React application:

```jsx
import React from "react";
import {
  PaymentForm,
  CoreContainer,
  MethodsContainer,
  PaymentContainer,
  PanContainer,
  CvvContainer,
  ExpContainer,
} from "@paygreen/pgjs-react";

const App = () => {
  return (
    <div>
      <h1>Online Payment with PayGreen</h1>
      <PaymentForm>
        <CoreContainer>
          <div>Basic integration example</div>

          <MethodsContainer />
          <PaymentContainer>
            <PanContainer />
            <CvvContainer />
            <ExpContainer />
          </PaymentContainer>

          <button onClick={submitPayment}>Pay</button>
        </CoreContainer>
      </PaymentForm>
    </div>
  );
};

export default App;
```

### Documentation

For detailed usage instructions, configuration options, and examples, please refer to our [Documentation](https://developers.paygreen.fr/).

### Contributing

Contributions are welcome! If you find any issues or want to contribute to the project, please follow our (WIP) Contribution Guidelines.

### License

This project is licensed under the MIT License - see the LICENSE file for details.
