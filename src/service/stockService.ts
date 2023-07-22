import { client } from "./../config/api";
import { APIResponse } from "../types";
import { TStock } from "../types";

const createStock = async (body: TStock) => {
  const response: APIResponse = await client.post("/stock", body);
  return response;
};
const updateStock = async (body: TStock) => {
  const response: APIResponse = await client.put(`/stock/${body.id}`, body);
  return response;
};

const getAllStock = async () => {
  const response: APIResponse = await client.get("/stock");
  return response;
};

const deleteStock = async (id: number) => {
  const response: APIResponse = await client.delete(`/stock/${id}`);
  return response;
};

export default { createStock, getAllStock, deleteStock, updateStock };
