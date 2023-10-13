import { makeApiCall } from "@/utils/get-url-end-point";

export type PaymentModel = "PAYPAL-PAYMENT" | "STRIPE-PAYMENT";

export const CreateOnPaymentPI = async (payload: {
  data: any;
  paymentModel: PaymentModel;
}): Promise<any> => {
  const { paymentModel, data } = payload;

  if (paymentModel === "PAYPAL-PAYMENT") {
    return await makeApiCall({
      action: "createOnePaymentsPaypalPayment",
      body: { paymentModel, ...data },
    });
  }

  if (paymentModel === "STRIPE-PAYMENT") {
    return await makeApiCall({
      action: "createOnePaymentsStripePayment",
      body: { paymentModel, ...data },
    });
  }
};
