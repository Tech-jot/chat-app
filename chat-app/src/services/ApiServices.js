import { http } from "../http";

export const login = async (body) => {
  return await http.post("/login",body);
};
export const registerUser = async (body) => {
  return await http.post("/register", body);
};
export const getUsersApi = async () => {
    return await http.get("/get-users");
  };

