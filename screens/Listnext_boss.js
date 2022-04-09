import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { ShowStudentData } from "../services/studentService";
import { useSelector, useDispatch } from 'react-redux'
import { ShowEvent, ShowEventAll, AllowStatus, ShowStudenttoBossAll, ShowStudenttoBoss } from '../services/eventService';
import { Event } from '../services/eventService';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import { includes } from 'lodash'

export default function Listnext_boss({route}) {
    const {car_no} = route.params
    const [alertModal, setAlertModal] = useState(false);
    const user = useSelector(state => state.user)
    const [CurrentDate, setCurrentDate] = useState("");
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
        AllowStatus(eid).then(res => {
            ShowStudenttoBossAll()
        })
    }
    async function ShowEventData() {
        await ShowEventData(payload, user.token)
        setAlertModal(false)
        navigation.goBack();
    }

    function ShowStudenttoBossAll() {
        ShowStudenttoBoss(car_no).then((result) => {
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

        ShowStudenttoBossAll()

    }, [])
    function ViewStudenttoBossAll() {
        const dataEventStudentBoss = modalData;
        // console.log(data[1])
        var viewList = [];
        if (dataEventStudentBoss !== null) {
            dataEventStudentBoss
            .filter(item => {
                if (searchKey === '') return true
                return includes(item.student?.stu_fname + item.student?.stu_lname, searchKey)
            }).filter(item => {
                const date = new Date();
                const dateString = date.toLocaleString().split(" ")[0];
                return item.event_time?.split(" ")[0] === dateString
            }).forEach((result, index) => {
                viewList.push(
                    <View key={index} style={{ marginTop: 10, marginBottom: 0, borderWidth: 1, height: 145, width: 350, padding: 10, borderRadius: 20 }}>
                        <Text
                            style={{ alignItems: 'flex-start', marginLeft: 7, fontSize: 17, }}
                        >ชื่อนักเรียน : {result.student?.stu_fname}   {result.student?.stu_lname}  </Text>
                      <Text
                            style={{ alignItems: 'flex-start', marginLeft: 7, fontSize: 17, }}
                        >ที่อยู่ :  {result.student?.stu_address} </Text>
                        <Text
                            style={{ alignItems: 'flex-start', marginLeft: 7, fontSize: 17, }}
                        >เบอร์โทรผู้ปกครอง :
                            {result.user?.user_tel} (K.{result.student?.user?.user_fname})
                        </Text> 
                        <Text
                            style={{ alignItems: 'flex-start', marginLeft: 7, fontSize: 17, }}
                        >สถานะ : {result.event?.event_name}
                        </Text>
                        <View style={{ marginTop: 0, marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, }}>

                            <Text
                                style={{ alignItems: 'flex-start', marginLeft: 7, fontSize: 17, }}

                            >วัน-เวลา:
                                {result?.event_time}
                            </Text>

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

                <Text style={styles.textTitle}>ประวัติรอบรถ</Text>

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
            <ScrollView style={{ zIndex: 0 }}>

                {ViewStudenttoBossAll()}
            </ScrollView>

        </View>
    </View>

)
}     

const styles = StyleSheet.create({
    container: {
        backgroundColor:  "#FB7B5E",
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
        width: 50,
        height: 50,
        marginTop: 5,
        marginBottom: 5
    },
    tinyimage:{
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
});