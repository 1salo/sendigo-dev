import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CountryDropdownForUI from "@/app/components/ui/CountryDropdownforUI";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  planId: number; // Lägg till planId som prop
}

const CheckoutForm: React.FC<ModalProps> = ({ isVisible, onClose, planId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [country, setCountry] = useState<string>("SE"); // Default till Sverige (SE)
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    if (isVisible) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 29900 }), // amount in the smallest currency unit (e.g., cents)
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch((err) => setError(err.message));
    }
  }, [isVisible]);

  useEffect(() => {
    const isValid =
      address.trim() !== "" &&
      city.trim() !== "" &&
      postalCode.trim() !== "" &&
      country.trim() !== "" &&
      email.trim() !== "";

    setIsFormValid(isValid);
  }, [address, city, postalCode, country, email]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !clientSecret) {
      setLoading(false);
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          name: "Customer Name",
          address: {
            line1: address,
            city: city,
            postal_code: postalCode,
            country: country,
          },
          email: email,
        },
      },
    });

    if (result.error) {
      setError(result.error.message || "Payment failed");
    } else {
      if (result.paymentIntent?.status === "succeeded") {
        console.log("Payment succeeded!");

        // Anropa backend för att uppdatera abonnemangsplanen
        try {
          const response = await fetch("/api/subscription", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentIntentId: result.paymentIntent.id,
              planId,
            }),
          });

          if (!response.ok) {
            const data = await response.json();
            setError(data.message || "Failed to update subscription plan");
          } else {
            onClose();
          }
        } catch (error) {
          setError("Failed to update subscription plan");
        }
      } else {
        setError("Payment not successful");
      }
    }
    setLoading(false);
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    hidePostalCode: true,
  };

  return (
    isVisible && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
        <div className="bg-white p-8 shadow-lg relative  h-5/6 overflow-y-auto">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
            onClick={onClose}
          >
            &times;
          </button>
          <h2 className="text-2xl mb-4 font-light">Uppgradera prisplan</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="flex flex-col border border-gray-100 w-full p-4">
            <h1 className="text-lg font-medium mb-5">Sendigo Plus</h1>
            <p className="mb-2">✔ Upp till 20% lägre fraktpriser</p>
            <p className="mb-2">✔ Boka med DHL, DSV, TNT, UPS & Fedex</p>
            <p className="mb-2">✔ Skicka paket, pall & container</p>
            <p className="mb-2">✔ Jämför fraktlösningar automatiskt</p>
            <p className="mb-2">✔ Spara favoritkontakter & adresser</p>
            <p className="border-b mb-2 pb-2">
              ✔ Support via telefon, chatt & mail
            </p>
            <p className="mb-2">✔ Ytterligare 30% billigare inrikesfrakt</p>
            <p className="mb-2">✔ Ytterligare 30% billigare utrikesfrakt</p>
          </div>
          <div className="bg-gray-100 p-4">
            <p>Totalt som debiteras: </p>
            <p className="font-light text-sm">
              Din nya prisplan aktiveras direkt
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-lg font-medium my-5 border-t pt-4">
              Fakturaadress
            </h1>
            <div>
              <label className="block text-sm">Adress</label>
              <input
                type="text"
                className="border p-2 w-full mt-1 outline-black"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                autoComplete="street-address"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 border-b pb-5">
              <div>
                <label className="block text-sm">Stad</label>
                <input
                  type="text"
                  className="border p-2 w-full mt-1 outline-black"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  autoComplete="address-level2"
                />
              </div>
              <div>
                <label className="block text-sm">Postnummer</label>
                <input
                  type="text"
                  className="border p-2 w-full mt-1 outline-black"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  autoComplete="postal-code"
                />
              </div>
              <div>
                <label className="block text-sm">Land</label>
                <CountryDropdownForUI onChange={(value) => setCountry(value)} />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-medium my-5 pt-4">Kortuppgifter</h1>
              <label className="block text-sm">Namn</label>
              <input
                type="name"
                className="border p-2 w-full mt-1 mb-4 outline-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
              <label className="block text-sm">Kortuppgifter</label>
              <CardElement
                options={CARD_ELEMENT_OPTIONS}
                className="p-2 border mt-1 h-10"
              />
            </div>
            <div>
              <label className="block text-sm">Email för kvitto</label>
              <input
                type="email"
                className="border p-2 w-full mt-1 outline-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-primary mt-4"
                disabled={!stripe || loading || !isFormValid}
              >
                {loading ? "Processing..." : "Bekräfta köp"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

const StripeCheckoutForm: React.FC<ModalProps> = (props) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm {...props} />
  </Elements>
);

export default StripeCheckoutForm;
