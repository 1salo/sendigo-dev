import React from "react";

const CheckoutForm: React.FC = () => {
  console.log("CheckoutForm rendered");

  return (
    <form>
      <h2>Checkout</h2>
      <p>This is a test to ensure the modal content is visible.</p>
      <label>
        Name
        <input type="text" required />
      </label>
      <label>
        Email
        <input type="email" required />
      </label>
      <label>
        Card details
        <input type="text" placeholder="Card details" required />
      </label>
      <button type="submit">Pay</button>
    </form>
  );
};

export default CheckoutForm;
