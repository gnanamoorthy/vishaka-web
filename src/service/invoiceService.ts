import { client } from "./../config/api";
import { APIResponse, InvoiceForm } from "../types";
import { TStock } from "../types";

const getAllClient = async () => {
  const response: APIResponse = await client.get("/client/names");
  return response;
};

const createInvoice = async (body: InvoiceForm) => {
  const response: APIResponse = await client.post("/invoice", body);
  return response;
};

const getAllInvoice = async () => {
  const response: APIResponse = await client.get("/invoice");
  return response;
};

export default { getAllClient, createInvoice, getAllInvoice };
