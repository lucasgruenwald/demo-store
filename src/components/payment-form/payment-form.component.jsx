import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import "./payment-form.styles.scss";
// import { BUTTON_TYPE_CLASSES } from "../button/button.component";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();
    
    console.log("hello from payment handler")
    console.log(e)
    console.log(stripe)
    console.log(elements)
    if (!stripe || !elements) { return };

    setIsProcessingPayment(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100 }),
    })
    .then((response) => {
      console.log(response)
      console.log("about to return response json")
      return response.json();
    });

    const clientSecret = response.paymentIntent.client_secret;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest User"
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful!");
      }
    }
  };

  return (
    <div className="payment-form-container">
      <form className="form-container" onSubmit={paymentHandler}>
        <h2>Card Payment:</h2>
        <CardElement />

        <button className="payment-button inverted" type="submit">
        { isProcessingPayment ? <div className='loading-spinner'></div> : "Pay Now" }
        </button>
      </form>
    </div>

  );
};
export default PaymentForm;