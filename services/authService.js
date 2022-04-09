import { apiURL } from "./environment";
import axios from "axios";

export async function getData(token) {
  return await axios.get(`${apiURL}/api/auth`, { headers: { authorization: token } });
}

  export async function Login(email, password,token) {
    return await axios.post(`${apiURL}/api/auth/login`, { user_email: email, user_pass: password ,token})
  }

export async function ShowUserCountData(){
  return await axios.get(`${apiURL}/api/auth/auth_all`);
}


export async function Logout(token) {
  return await axios.get(`${apiURL}/api/auth/logout`, { headers: { authorization: `HelloSopon ${token}` } });
}
