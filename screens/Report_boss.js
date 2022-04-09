
import React, { Component, useEffect, useState } from 'react';
import CheckBox from 'react-native-check-box';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Picker } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from "react-native-modal";

export default function Report_boss() {

    const [way1, setWay1] = useState(false);
    const [way2, setWay2] = useState(false);
    const [alertModal, setAlertModal] = useState(false)
    const [alertModal1, setAlertModal1] = useState(false)
    const [CurrentDate, setCurrentDate] = useState("")
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'ทั้งหมด', value: '' },
        { label: 'การลา', value: 'Leave' }

    ]);
   

    const checkForm = () => {
        if ((way1 || way2)) {
            return setAlertModal(true)
        } else {
            return setAlertModal1(true)
        }
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

    }, [])
    return (
        <View style={styles.container}>

            <View style={styles.container1}>
                <Modal isVisible={alertModal} hasBackdrop={true}>
                    <View style={styles.alertModal}>
                        <Image source={require('../assets/download.png')} style={{ width: 70, height: 70, marginBottom: 10 }} />
                        <Text style={{ fontSize: 15 }}>ดาวน์โหลดสำเร็จ</Text>
                        <TouchableOpacity style={styles.alertButton} onPress={() => setAlertModal(false)}>
                            <Text>ตกลง</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal isVisible={alertModal1} hasBackdrop={true}>
                    <View style={styles.alertModal}>
                        <Image source={require('../assets/cancel.png')} style={{ width: 70, height: 70, marginBottom: 10 }} />
                        <Text style={{ fontSize: 15 }}>ดาวน์โหลดไม่สำเร็จ กรุณาตรวจสอบอีกครั้ง</Text>
                        <TouchableOpacity style={styles.alertButton1} onPress={() => setAlertModal1(false)}>
                            <Text>ตกลง</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <Text style={styles.textTitle}>รายงาน</Text>
                <Image
                    style={styles.tinyLogo}
                    source={require('../assets/report.png')}
                />

                <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, marginRight: 50 }}>

                    <Text style={styles.txt}>
                        {CurrentDate}
                    </Text>
                </View>
                 
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, marginRight: 100 }}>
                    <Text style={{ marginLeft: 80, fontWeight: 'bold', fontSize: 18, marginTop: 5 }}>
                        ค้นหา
                    </Text>
                    <SearchInput
                        onChangeText={(term) => { this.searchUpdated(term) }}
                        style={styles.searchInput}
                        placeholder="ค้นหา"
                    />
                </View>
                <View style={{marginLeft: 45, width:'77%'}}>
                    <DropDownPicker style={{ padding: 1, borderRadius:'10%',marginTop:10}}
                    placeholder="กรุณาเลือกประเภท"
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                /> 
                </View>
               <TouchableOpacity
                    style={styles.button}
                    onPress={() => checkForm()}
                >
                    <Text style={styles.buttontext}>ค้นหา</Text>
                </TouchableOpacity>
                <ScrollView>
                   
                </ScrollView>
               

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FB7B5E",
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
        height: 800,
        marginTop: 30,
        alignItems: "center",
        padding: 10,
        borderRadius: 30,
        marginTop: 15,
        marginBottom: 15,
        shadowOpacity: 0.1
    },
    tinyLogo: {
        width: 90,
        height: 90,
        marginTop: 0,
        marginBottom: 20
    },
    textTitle: {
        fontSize: 25,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 20
    },
    txt: {
        color: '#000',
        fontSize: 18,
        marginLeft: 50,
        marginBottom: 10
    },
    input: {
        width: 200,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 100,
        shadowOpacity: 0.1
    },
    txt1: {
        color: '#000',
        fontSize: 18,
        marginRight: 0,
        marginTop: 20
    },
    input1: {
        width: 100,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 100,
        shadowOpacity: 0.1
    },
    button: {
        width: 130,
        marginTop: 30,
        alignItems: "center",
        backgroundColor: '#87cefa',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        shadowOpacity: 0.1
    },
    buttontext: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    searchInput: {
        padding: 10,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 20,
        marginBottom: 0,
        shadowOpacity: 0.1,
        width: 280,
    },
    
    alertModal: { backgroundColor: "#fff", height: 200, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    alertButton: {
        backgroundColor: '#d3d3d3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10
    },
    alertButton1: {
        backgroundColor: '#87cefa',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10
    }

});