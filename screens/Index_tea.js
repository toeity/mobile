import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useSelector } from 'react-redux'
import { ShowStudentData } from "../services/studentService";
import { ShowEvent, putEventStudent, ShowEventAll, AllowStatus} from '../services/eventService';
import { Event } from '../services/eventService';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import { includes } from 'lodash'

export default function Index({ navigation }) {
    const user = useSelector(state => state.user) 
    const [CurrentDate, setCurrentDate] = useState("")
    const [modalData, setmodalData] = useState(null);
    const [searchKey, setSearchKey] = useState("")
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [items, setItems] = useState([
        { label: 'ทั้งหมด', value: '' },
        { label: 'รอบเช้า', value: 2 }, 
        { label: 'รอบเย็น', value: 1 }
    ]);

    function send(eid) {
        AllowStatus(eid).then(res=>{
            ShowEventStudentAll() 
        })
    }
 
    function ShowEventStudentAll() {
        ShowEventAll().then((result) => {
            if (result.status === 200) {
                setmodalData(result.data.response);
                // console.log(result.data.response);
                //   setModalVisible(true);ß
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
            dataEventStudent
            .filter(item => {
                console.log(item.student?.user?.car_no);
                return item.student?.user?.car_no == user.data?.car_no
            })
            .filter(item => {
                if (searchKey === '') return true
                return includes(item.student?.stu_fname + item.student?.stu_lname, searchKey)
            })
            .filter(item => {
                if (value === '') return true;
                return [value, 3].includes(item.event_id)  
            })
            .filter(item => {
                const date = new Date();
                const dateString = date.toLocaleString().split(" ")[0];
                return item.event_time?.split(" ")[0] === dateString
            })
            . forEach((result, index) => {
                viewList.push(
                    <View key={index} style={{ marginTop: 10, marginBottom: 0, borderWidth: 1, height: 160, width: 350, padding: 10, borderRadius: 20 }}>
                        <Text
                            style={{ alignItems: 'flex-start', marginLeft: 7, fontSize: 18, }}

                        >ลำดับ {index + 1} : {result.student?.stu_fname}  {result.student?.stu_lname} </Text>
                        <Text
                            style={{ alignItems: 'flex-start', marginLeft: 7, fontSize: 18, }}

                        >ที่อยู่ :  {result.student?.stu_address} </Text>
                        <Text
                            style={{ alignItems: 'flex-start', marginLeft: 7, fontSize: 18, }}

                        >เบอร์โทรผู้ปกครอง :
                           {result.student.user?.user_tel}
                        </Text>
                        <Text
                            style={{ alignItems: 'flex-start', marginLeft: 7, fontSize: 18, }}

                        >สถานะ : {result.event.event_name}
                            
                        </Text>

                        <View style={{ marginTop: 0, marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, }}>

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


            <View style={styles.teacherContainer}>
                <Image
                    style={styles.Logo}
                    source={require('../assets/teacher.png')}
                />
                <Text style={styles.textTitle1}> {user?.data.user_fname}  {user?.data.user_lname}</Text>
            </View>

            <View style={styles.topCard}>
                <View style={styles.cardOne}>
                    <View style={{ marginTop: 5, marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, }}>

                        <Text style={styles.textTitle}>รอบรถ</Text>
                    </View>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../assets/clipboard.png')}
                    />
                    <Text style={styles.txt1}>
                        {/* 28-02-22  07:36 */}
                        วันที่ {CurrentDate}
                    </Text>
                    <View style={{ marginTop: 10, zIndex: 10, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, marginRight: 0 }}>
                        <Text style={{ marginLeft: 0, fontWeight: 'bold', fontSize: 18, marginTop: 10 }}>
                            ค้นหา:
                        </Text>
                        <TextInput
                            onChangeText={setSearchKey}
                            style={styles.searchInput}
                            value={searchKey}
                            placeholder="ค้นหา"
                        />
                   
                    <View style={{ marginLeft: 5, width: '30%' }}>
                            <DropDownPicker style={{ padding: 1, borderRadius: '10%', marginTop: 0, backgroundColor: '#fff' }}
                                placeholder="รอบรถ"
                                open={open}
                                zIndex={10}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                            />
                        </View>
                         </View>
                         <ScrollView>
                         {ViewEventStudentAll()}
                         </ScrollView>

                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.card}
                        onPress={() => { navigation.navigate("Status") }}>
                        <Image
                            style={styles.tinysub}
                            source={require('../assets/bus.png')}
                        />
                        <Text style={styles.textTitle}>ข้อมูลรถ</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.card} 
                    onPress={() => { navigation.navigate("Listmoon") }}>
                    <Image
                        style={styles.tinysub}
                        source={require('../assets/moon.png')}
                    />
                    <Text style={styles.textTitle}>รอบเย็น</Text>
                </TouchableOpacity> */}

                    <TouchableOpacity style={styles.card}
                        onPress={() => { navigation.navigate("Leave") }}>
                        <Image
                            style={styles.tinysub}
                            source={require('../assets/paper.png')}
                        />
                        <Text style={styles.textTitle}>ใบลา</Text>
                    </TouchableOpacity>
                </View>

           

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#81F1AC",
        alignItems: 'center',
    },
    teacherContainer: {
        marginTop:'5%',
        width: '90%',
        backgroundColor: "#81F1AC",
        alignItems: 'center',
        marginBottom: 0,
        flexDirection: 'row',
        marginHorizontal: 5,
    },
    Logo: {
        width: 60,
        height: 60,
        marginTop: 10,
        marginBottom: 0,
        marginHorizontal: 5,
    },
    tinyLogo: {
        width: 50,
        height: 50,
        marginTop: 5,
        marginBottom: 5

    },
    textTitle1: {
        fontSize: 20,
        color: "#000",
        fontWeight: 'bold',
        margin: 10,

    },
    textTitle: {
        fontSize: 20,
        color: "#81F1AC",
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 10
    },
    textoff: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 10
    },

    textsub2: {
        fontSize: 15,
        marginLeft: 150,
        marginBottom: 3,
        color: '#000',
        marginTop: 0
    },
    topCard: {
        backgroundColor: "#81F1AC",
        width: '95%',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',

        marginBottom: 0,
        marginHorizontal: 5,

    },
    tinysub: {
        width: 50,
        height: 50,
    },
    card: {
        backgroundColor: '#fff',
        width: '45%',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        shadowOpacity: 0.1,
        marginRight: 5,
        marginLeft: 5,

    },
    searchInput: {
        padding: 10,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 10,
        marginBottom: 0,
        shadowOpacity: 0.1,
        width: 170,
        height: 50
    },
    setOpen: {
        backgroundColor: 'blue'
    },
    cardOne: {
        backgroundColor: '#fff',
        width: '95%',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        shadowOpacity: 0.1,
        height: 500
    },
    btn: {
        width: 60,
        alignItems: "center",
        backgroundColor: "#73C864",
        padding: 10,
        borderRadius: 10,
        shadowOpacity: 0.1,
    },
    btntxt: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },


})







