import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { ShowStudentData } from "../services/studentService";
import { useSelector, useDispatch } from 'react-redux'
import { ShowEvent, putEventStudent, ShowEventAll, AllowStatus } from '../services/eventService';
import Modal from 'react-native-modal';

export default function Listsun_tea({ navigation }) {
    const [alertModal, setAlertModal] = useState(false);
    const user = useSelector(state => state.user)
    console.log(putEventStudent);
    const [CurrentDate, setCurrentDate] = useState("");
    const [modalData, setmodalData] = useState(null);

    function send(eid) {
        AllowStatus(eid).then(res=>{
            ShowEventStudentAll()
        })
    }
 async function ShowEventData() {
        await ShowEventData(payload, user.token)
        setAlertModal(false)
        console.log(CurrentDate);
        navigation.goBack();
    }

    function openDetailModal(item, date) {
        ShowEventData()
            .then((result) => {
                if (result.status === 200) {
                    setmodalData(result.data);
                    console.log(result.data);
                    setModalVisible(true);
                }
            });
    }

    function ShowEventStudentAll() {
        ShowEventAll().then((result) => {
            if (result.status === 200) {
                setmodalData(result.data.response);
                // console.log(result.data.response);
                //   setModalVisible(true);
            }
        });
    }
    useEffect(() => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        setCurrentDate(
            date + '/' + month + '/' + year
            + ' ' + hours + ':' + min
        );
        const hour = new Date().getHours();

        ShowEventStudentAll()

    }, [])

    function ViewEventStudentAll() {
        const dataEventStudent = modalData;
        // console.log(data[1])
        var viewList = [];
        if (dataEventStudent !== null) {
            dataEventStudent.forEach((result, index) => {
                viewList.push(
                    <View key={index} style={{ marginTop: 15, marginBottom: 3, borderWidth: 1, height: 140, width: 350, padding: 10, borderRadius: 20 }}>
                        <Text
                            style={{ alignItems: 'flex-start', marginLeft: 7, fontSize: 18, }}

                        >ลำดับ {index + 1} : {result.stu_fname}  {result.stu_lname} </Text>
                        <Text
                            style={{ alignItems: 'flex-start', marginLeft: 7, fontSize: 18, }}

                        >ที่อยู่ :  {result.stu_address} </Text>
                        <Text
                            style={{ alignItems: 'flex-start', marginLeft: 7, fontSize: 18, }}

                        >เบอร์โทรผู้ปกครอง :
                            {/* user_id  */}
                        </Text>

                        <View style={{ marginTop: 5, marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, }}>

                            <Text
                                style={{ alignItems: 'flex-start', marginLeft: 7, fontSize: 18, }}

                            >วัน-เวลา:
                             {result.event_time}
                            </Text>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => send(result.eid)}
                            >
                                <Text style={styles.btntxt}>ยืนยัน</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            })
        }
        return viewList;
    }

    return (
        <View style={styles.container}>

            <View style={styles.container1}>
                <View style={{ marginTop: 5, marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, }}>

                    <Text style={styles.textTitle}>รายชื่อรอบเช้า</Text>
                    <Image
                        style={styles.tinyimage}
                        source={require('../assets/sun.png')}
                    />
                </View>
                <Image
                    style={styles.tinyLogo}
                    source={require('../assets/clipboard.png')}
                />
                <Text style={styles.txt1}>
                    {/* 28-02-22  07:36 */}
                    {CurrentDate}
                </Text>

                <ScrollView>
                    {/* <View style={{ marginTop: 15, marginBottom: 3, borderWidth: 1, height: 220, width: 350, padding: 10, borderRadius: 20 }}>
                <Text
                            style={{ alignItems: 'flex-start', marginLeft: 7, fontSize: 18, }}

                        >ลำดับ : </Text>
                        <Text
                            style={{ alignItems: 'flex-start', marginLeft: 7, fontSize: 18, }}

                        >ที่อยู่ :  </Text>
                        <Text
                            style={{ alignItems: 'flex-start', marginLeft: 7, fontSize: 18, }}

                        >เบอร์โทรครูประจำรถ :  </Text>
                        <Text
                            style={{ alignItems: 'flex-start', marginLeft: 7, fontSize: 18, }}

                        >เบอร์โทรคนขับรถ :  </Text>
                        <Text
                            style={{ alignItems: 'flex-start', marginLeft: 7, fontSize: 18, }}

                        >วันที่-เวลา :  </Text>
                        
                </View> */}
                    {ViewEventStudentAll()}
                </ScrollView>

                {/* <TouchableOpacity
                    style={styles.btn1}
                    onPress={() => checkForm()}
                >
                    <Text style={styles.btntxt1}>ส่งข้อมูลทั้งหมด</Text>
                </TouchableOpacity> */}
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#81F1AC",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container1: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 380,
        alignItems: "center",
        padding: 10,
        borderRadius: 30,
        marginTop: 50,
        marginBottom: 20,
        shadowOpacity: 0.1
    },
    tinyLogo: {
        width: 100,
        height: 100,
        marginTop: 5,
        marginBottom: 10
    },
    tinyimage: {
        width: 35,
        height: 35,
        margin: 3
    },
    textTitle: {
        fontSize: 25,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 0,
        marginTop: 0
    },
    txt: {
        color: '#000',
        fontSize: 18,
        marginLeft: 0,
        marginTop: 0
    },
    txt1: {
        color: '#000',
        fontSize: 15,
        marginRight: 0,
        marginTop: 5
    },
    btn: {
        width: 60,
        alignItems: "center",
        backgroundColor: "#73C864",
        padding: 10,
        borderRadius: 10,
        shadowOpacity: 0.1
    },
    btntxt: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    btn1: {
        width: 130,
        marginTop: 30,
        alignItems: "center",
        backgroundColor: '#73C864',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        shadowOpacity: 0.1
    },
    btntxt1: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    }
});