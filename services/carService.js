import { apiURL } from "./environment";
import axios from "axios";

export async function ShowCarData(car_no) {
  return await axios.get(`${apiURL}/api/car/${car_no}`);
}

export async function ShowCarBoss() {
  return await axios.get(`${apiURL}/api/car`);
}


export async function ShowCarUserData(car_no) {
  return await axios.get(`${apiURL}/api/car_user/${car_no}`);
}




