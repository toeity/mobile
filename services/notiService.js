import { apiURL } from "./environment";
import axios from "axios";
import storage from '@react-native-async-storage/async-storage'


export async function  ShowNotiAll() {
  return await axios.post(`${apiURL}/api/noti/`);
}

export async function ShowNotiCountData(){
  return await axios.get(`${apiURL}/api/noti/noti_all`);
}