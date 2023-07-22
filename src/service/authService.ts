import { client } from "./../config/api";
import { APIResponse, Login } from "../types";

const login = async (body: Login) => {
  const response: APIResponse = await client.post("/auth/login", body);
  return response;
};

export default { login };
