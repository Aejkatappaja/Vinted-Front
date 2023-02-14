import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./payment.css";
import CheckOutForm from "../components/CheckOutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = () => {
  const location = useLocation();
  const { title } = location.state;
  const { price } = location.state;
  return (
    <main className="payment">
      <section>
        <h1>Résumé de la commande</h1>
        <article>
          <div>
            <p>Commande</p>
            <p>{price} €</p>
          </div>
          <div>
            <p>Frais protection acheteurs</p>
            <p>0.40 €</p>
          </div>
          <div className="cont3">
            <p>Frais de port</p>
            <p>0.80 €</p>
          </div>
          <div className="bold">
            <p>Total</p>
            <p>{(price + 0.4 + 0.8).toFixed(2)}€</p>
          </div>
          <div className="cont3">
            <p>
              Il ne vous reste plus qu'une étape pour vous offrir {title}.
              <br /> Vous allez payer {(price + 0.4 + 0.8).toFixed(2)}€ (frais
              de protections et frais de ports inclus)
            </p>
          </div>
          <article className="stripe">
            <Elements stripe={stripePromise}>
              <CheckOutForm title={title} price={price} />
            </Elements>
          </article>
        </article>
      </section>
    </main>
  );
};

export default Payment;
