
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { useSelector } from 'react-redux'
import { Leave } from '../services/leaveService';
import Modal from 'react-native-modal';


export default function Leave_dri({navigation}) {
    const [alertModal, setAlertModal] = useState(false);

    const user = useSelector(state => state.user)
    const [CurrentDate, setCurrentDate] = useState("")
    const initialState = {
        leave_id: 1
    }
    const [data, setData] = useState(initialState)
    const onSubmit = function () {
        dispatch(setParent(data));
    }
    const [receiveRadio, setReceiveRadio] = React.useState(null);
    var radio_props = [
        { label: 'เช้า', value: 1 },
        { label: 'เย็น', value: 2 },
        { label: 'เช้า/เย็น', value: 3 }
    ];
    function PostLeave() {
        let dateTime = new Date().toLocaleString("th-TH", {timeZone: "Asia/Bangkok"})
        const payload = {
            leave_id: data.leave_id,
            timestamp: dateTime
        }
        console.log(user)
        Leave(payload,user.token) .then(() => {
        });
        setAlertModal(false)
        console.log(CurrentDate);
        navigation.goBack();
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

    }, [])


    return (
        <View style={styles.container}>
            
            <Modal isVisible={alertModal} hasBackdrop={true}>
                <View style={styles.alertModal1}>
                    <Text style={{ fontSize: 16, marginBottom: 20 }}>ยืนยันคำร้องขอลา หากยืนยันกรุณารอรับเมล์ </Text>
                    <Image source={require('../assets/save.png')} style={{ width: 100, height: 100, marginBottom: 10 }} />
                    <View style={{  flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, }}>
                    <TouchableOpacity style={styles.alertButton} onPress={PostLeave}> 
                        <Text>ยืนยัน</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.alertButton1} onPress={() => setAlertModal(false)}>
                        <Text>ยกเลิก</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.container1}>
                <Text style={styles.txttime}>
                    {CurrentDate}
                </Text>
                <Text style={styles.textTitle}>ใบลา</Text>
                <Image
                    style={styles.tinyLogo}
                    source={require('../assets/paper.png')}
                />

                <View style={{ marginTop: 5, marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, }}>
                    <Text style={styles.txt}>
                        ชื่อ-นามสกุล:
                    </Text>
                    <Text style={styles.txt}> {user.data.user_fname}  {user.data.user_lname}</Text>
                </View>

                <Text style={styles.txt1}>
                    ช่วงเวลาขอลา:
                </Text>
                <RadioForm

                    style={{ marginRight: 170 }}
                    buttonColor="#7CC4D5"
                    selectedButtonColor={"#7CC4D5"}
                    radio_props={radio_props}
                    initial={0}

                    onPress={(value) => setData({ ...data, leave_id: value })}
                />
                <TouchableOpacity
                    style={styles.button}
        
                    onPress={() => setAlertModal(true)}
                >
                    <Text style={styles.buttontext}>ส่งคำร้อง</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#7CC4D5",
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
        marginTop: 110,
        marginBottom: 80,
        shadowOpacity: 0.1
    },
    tinyLogo: {
        width: 100,
        height: 100,
        marginTop: 5,
        marginBottom: 5
    },
    textTitle: {
        fontSize: 25,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10
    },
    txttime: {
        color: '#000',
        marginLeft: 200,
        fontSize: 15,
    },
    txt: {
        color: '#000',
        fontSize: 18,
        marginTop: 10
    },
    txt1: {
        color: '#000',
        fontSize: 18,
        marginRight: 150,
        marginBottom: 10
    },
    button: {
        width: 150,
        alignItems: "center",
        backgroundColor: "#7CC4D5",
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        shadowOpacity: 0.1
    },
    buttontext: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },    
    alertModal1: { backgroundColor: "#fff", borderWidth: 4, borderColor: '#7CC4D5', height:250, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },

    alertButton: {
        backgroundColor: '#7CC4D5',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
        marginRight:10,
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