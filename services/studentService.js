import { apiURL } from "./environment";
import axios from "axios";

export async function ShowStudentData(car_no) {
    return await axios.get(`${apiURL}/api/student/${car_no}`);
  }

  export async function ShowStudentBossAll() {
    return await axios.get(`${apiURL}/api/student`);
  }
export async function ShowStudentDataByParent(user_id) {
    return await axios.get(`${apiURL}/api/studentByParent/${user_id}`);
  }
  
  export async function postStudent(student,user_id){
    const data ={...student,user_id};
    return await axios.post(`${apiURL}/api/student`,data);
  }

  