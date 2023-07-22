import { client } from "./../config/api";
import { APIResponse } from "../types";
import { TStock } from "../types";

const createClient = async (body: TStock) => {
  const response: APIResponse = await client.post("/client", body);
  return response;
};
const updateClient = async (body: TStock) => {
  const response: APIResponse = await client.put(`/client/${body.id}`, body);
  return response;
};

const getAllClient = async () => {
  const response: APIResponse = await client.get("/client/all");
  return response;
};

const deleteClient = async (id: number) => {
  const response: APIResponse = await client.delete(`/client/${id}`);
  return response;
};

export default { createClient, updateClient, getAllClient, deleteClient };
