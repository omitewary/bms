import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/Checkoutform";
import { Constants } from "../../constants/constants";
import useRequest from "../../hooks/use-request";

const stripePromise = loadStripe(Constants.STRIPE_PK);

const OrderShow = ({ order, payment, stripeId, currentUser }) => {
  console.log("order --- ", order);
  console.log("stripe Id---", stripeId);
  console.log(" clientSecret --- ", payment);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order, payment]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  const options = {
    clientSecret: payment,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <>
      <div>Time left to pay: {timeLeft} seconds</div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm stripeId={stripeId} orderId={order.id} />
      </Elements>
    </>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data: order } = await client.get(`/api/orders/${orderId}`);
  const { data: clientSecret } = await client.post("/api/payments", {
    orderId,
  });

  const payment = { order, ...clientSecret };
  console.log("payment : ", payment);

  return payment;
};

export default OrderShow;
