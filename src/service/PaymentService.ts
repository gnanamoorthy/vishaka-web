import { client } from "./../config/api";
import { APIResponse } from "../types";

const getPendingPayments = async () => {
  const response: APIResponse = await client.get("/payment/pendingPayments");
  return response;
};

const getPaidPayments = async () => {
  const response: APIResponse = await client.get("/payment/paidPayments");
  return response;
};

const updatePayment = async (id: String, body: any) => {
  const response: APIResponse = await client.put(
    `/payment/updatePayment/${id}`,
    body
  );
  return response;
};

export default { getPendingPayments, getPaidPayments, updatePayment };
