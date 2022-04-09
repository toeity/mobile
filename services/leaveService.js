import { apiURL } from "./environment";
import axios from "axios";
import storage from '@react-native-async-storage/async-storage'

export async function Leave(data,token) {
    // console.log(storage.getItem('token'))
    return await axios.post(`${apiURL}/api/leave_user`, data,{
        headers:{
            Authorization: `Bearer ${token}` 
        }
    })
  }