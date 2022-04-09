import { apiURL } from "./environment";
import axios from "axios";
import storage from '@react-native-async-storage/async-storage'

export async function Event(data,token) {
  // console.log(storage.getItem('token'))
  return await axios.post(`${apiURL}/api/event_student`, data,{
      headers:{
          Authorization: `Bearer ${token}` 
      }
  })
}

export async function ShowEventAll(student,user_id){
  const data ={...student,user_id};
  return await axios.get(`${apiURL}/api/event_student`,data);
}

export async function AllowStatus(eid){
  return await axios.put(`${apiURL}/api/event_student`,{eid});
}

export async function ShowEventOneAll(student,user_id){
  const data ={...student,user_id};
  return await axios.get(`${apiURL}/api/event_student_one`,data);
}


export async function ShowStudenttoBoss(car_no) {
  return await axios.get(`${apiURL}/api/event_studenttoBoss/${car_no}`);
}


