import { apiURL } from "./environment";
import axios from "axios";

export async function postUser(user){ 
  return await axios.post(`${apiURL}/api/user`,user);
}
  