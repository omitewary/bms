export const stripe = {
  paymentIntents: {
    create: jest.fn().mockResolvedValue({
      id: "pi_12345",
      amount: 1000,
      currency: "usd",
      status: "succeeded",
    }),
  },
};
