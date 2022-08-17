import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { Elements } from '@stripe/react-stripe-js';

import App from './App';
import { store, persistor } from './store/store';
import { stripePromise } from './utils/stripe/stripe.utils'

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

import './index.scss';

Sentry.init({
  dsn: "https://0efc8635e303465ebf813b6dfce3ee2d@o1349733.ingest.sentry.io/6629349",
  integrations: [new BrowserTracing()],
  beforeBreadcrumb(breadcrumb, hint){

    // reduce unnecessary redux logger data, keep action message
    if (breadcrumb.data && breadcrumb.data && breadcrumb.data.arguments && breadcrumb.data.arguments[2] && breadcrumb.data.arguments[2].type) {
      const reduxAction = breadcrumb.data.arguments[2].type;
      breadcrumb.message = reduxAction;
      breadcrumb.category = "Redux Logger"
      breadcrumb.data = null;
    } 

    // provide clearer UI clicks 
    else if (breadcrumb.category === 'ui.click') {
      const { target } = hint.event;
      if (target.ariaLabel) {
        breadcrumb.message = target.ariaLabel;
      }
    }

    // filter out console message - react update on unmounted component 
    else if (breadcrumb.category && breadcrumb.category === 'console' && breadcrumb.message && 
        breadcrumb.message.includes("Can't perform a React state update on an unmounted component")) {
        return null; 
    }

    // filter out console message - stripe testing
    else if (breadcrumb.category && breadcrumb.category === 'console' && breadcrumb.message && 
      breadcrumb.message.includes("You may test your Stripe.js integration")){
        return null;
    }

    //filter out console color messages
    else if (breadcrumb.message.includes("state color")) {
      return null;
    }

    return breadcrumb;
  },

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const rootElement = document.getElementById('root')

render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  rootElement
);


