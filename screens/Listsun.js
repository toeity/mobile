import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { ShowStudentData, ShowStudentDataByParent } from "../services/studentService";
import { useSelector, useDispatch } from 'react-redux'
import { Event } from '../services/eventService';
import Modal from 'react-native-modal';

export default function Listsun({ navigation }) {
    const [alertModal, setAlertModal] = useState(false);
    const user = useSelector(state => state.user)
    console.log(user);
    const [CurrentDate, setCurrentDate] = useState("");
    const [modalData, setmodalData] = useState(null);
    const initialState = {
        event_id: 2
    }
    const [data, setData] = useState(initialState)
    const onSubmit = function () {
        dispatch(setParent(data));
    }
    const [receiveRadio, setReceiveRadio] = React.useState(null);
    var radio_props = [
        { label: 'ส่ง       ', value: 2 },
        { label: 'ลา', value: 3 },
    ];
    function PostEvent() {
        let dateTime = new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })
        const payload = {
            stu_id: data.stu_id,
            event_id: data.event_id,
            event_time: dateTime
        }
        console.log(user)
        Event(payload, user.token).then(() => {
        });
        setAlertModal(false)
        console.log(CurrentDate);
        navigation.goBack();
    }

    function openDetailModal(item, date) {
        ShowStudentDataByParent()
            .then((result) => {
                if (result.status === 200) {
                    setmodalData(result.data);
                    console.log(result.data);
                    setModalVisible(true);
                }
            });
    }

    function ShowStudentAll() {
        ShowStudentDataByParent(user.data.user_id).then((result) => {
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

        ShowStudentAll()

    }, [])
    function send(id) {
        setAlertModal(true)
        setData({...data, stu_id: id})
    }
    function ViewStudentAll() {
        const dataStudent = modalData;
        // console.log(data[1])
        var viewList = [];
        if (dataStudent !== null) {
            dataStudent.forEach((result, index) => {
                viewList.push(
                    <View key={index} style={{ marginTop: 15, marginBottom: 3, borderWidth: 1, height: 160, width: 350, padding: 10, borderRadius: 20 }}>
                        <Text
                            style={{ alignItems: 'flex-start', marginLeft: 7, fontSize: 18, }}

                        >ลำดับ {index + 1} : {result.stu_fname}  {result.stu_lname} </Text>
                        <Text
                            style={{ alignItems: 'flex-start', marginLeft: 7, fontSize: 18, }}

                        >ที่อยู่ :  {result.stu_address} </Text> 
                        <Text
                            style={{ alignItems: 'flex-start', marginLeft: 7, fontSize: 18, }}

                        >เบอร์โทรผู้ปกครอง :  {user.data.user_tel}

                        </Text>

                        <View style={{ marginTop: 5, marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, }}>

                            <RadioForm

                                style={{ marginLeft: 0, marginRight: 20, flexDirection: 'row', justifyContent: 'space-between' }}
                                buttonColor="#f9d423"
                                selectedButtonColor={"#f9d423"}
                                radio_props={radio_props}
                                initial={0}

                                onPress={(value) => setData({ event_id: value })}
                            />

                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => send(result.stu_id)}
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
            <Modal isVisible={alertModal} hasBackdrop={true}>
                <View style={styles.alertModal1}>
                    <Text style={{ fontSize: 16, marginBottom: 20 }}>ยืนยันการส่งข้อมูล </Text>
                    <Image source={require('../assets/save.png')} style={{ width: 100, height: 100, marginBottom: 10 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, }}>
                        <TouchableOpacity style={styles.alertButton} onPress={PostEvent}>
                            <Text>ยืนยัน</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.alertButton1} onPress={() => setAlertModal(false)}>
                            <Text>ยกเลิก</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.container1}>
                <View style={{ marginTop: 5, marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, }}>

                    <Text style={styles.textTitle}>รอบเช้า</Text>
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
                    {ViewStudentAll()}
                </ScrollView>

            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f9d423",
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
        width: 100,
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
        width: 150,
        marginTop: 30,
        alignItems: "center",
        backgroundColor: "#73C864",
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        shadowOpacity: 0.1
    },
    btntxt1: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    alertModal1: { backgroundColor: "#fff", borderWidth: 4, borderColor: '#f9d423', height: 250, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },

    alertButton: {
        backgroundColor: '#f9d423',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
        marginRight: 10,
        shadowOpacity: 0.1
    },
    alertButton1: {
        backgroundColor: '#d3d3d3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
        shadowOpacity: 0.1
    },
});
