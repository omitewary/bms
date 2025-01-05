import { useRouter } from "next/router";
import { useEffect } from "react";
import useRequest from "../../../../hooks/use-request";

const PaymentConfirm = () => {
  const router = useRouter();
  const { orderId, stripeId } = router.query;
  const { doRequest, errors } = useRequest({
    url: "/api/payments/confirm",
    method: "post",
    body: {
      orderId,
      stripeId,
    },
    onSuccess: () => console.log("successfully paid"),
  });

  useEffect(() => {
    if (orderId && stripeId) {
      doRequest();
    }
  }, [orderId, stripeId]);

  return (
    <div>
      <h1>Payment Confirmation</h1>
      <p>Order ID: {orderId}</p>
      <p>Stripe ID: {stripeId}</p>
    </div>
  );
};

export default PaymentConfirm;
