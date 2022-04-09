import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux'

// import Modal from 'react-native-modal';

export default function Index({ navigation }) {
    const user = useSelector(state => state.user?.data)
    // const [alertModal, setAlertModal] = useState(false);
    const [disableButtonMoon, setDisableButtonMoon] = useState(false)
    const [disableButtonSun, setDisableButtonSun] = useState(false)
    const [CurrentDate, setCurrentDate] = useState("")

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
        const intervalTime = setInterval(() => {
            if (hour >= 13 || hour <= 2) {
                setDisableButtonMoon(false)
                setDisableButtonSun(true)
            } else {
                setDisableButtonMoon(true)
                setDisableButtonSun(false)
            }

        }, 1000)
        return () => clearInterval(intervalTime);
    }, [])

    return (
        <View style={styles.container}>
            {/* <Modal isVisible={alertModal} hasBackdrop={true}>
                <View style={styles.alertModal}>
                    <Text style={{ fontSize: 16, marginBottom: 20 }}>กรุณาสแกน QR CORE เพื่อรับแจ้งเตือน</Text>
                    <Image source={require('../assets/qc.jpeg')} style={{ width: 170, height: 170, marginBottom: 10 }} />
                    <TouchableOpacity style={styles.alertButton} onPress={() => setAlertModal(false)}>
                        <Text>รับทราบ</Text>
                    </TouchableOpacity>
                </View>
            </Modal> */}
            <View style={styles.parContainer}>
                <Image
                    style={styles.Logo}
                    source={require('../assets/family.png')}
                />

                <Text style={styles.textTitle1}> {user?.user_fname}  {user?.user_lname}</Text>
            </View>

            <Text style={styles.textsub2}>
                {/* 28-02-22  07:36 */}
                {CurrentDate}
            </Text>
            <View style={styles.topCard}>
                <TouchableOpacity style={styles.card}
                    onPress={() => { navigation.navigate("Status") }}>
                    <Image
                        style={styles.tinysub}
                        source={require('../assets/bus.png')}
                    />
                    <Text style={styles.textTitle}>ข้อมูลรถ</Text>
                </TouchableOpacity>
                
              
                <TouchableOpacity style={[styles.card, disableButtonSun && styles.disableCard]} disabled={disableButtonSun}
                    onPress={() => { navigation.navigate("Listsun") }}>
                    <Image
                        style={styles.tinysub}
                        source={require('../assets/sun.png')}
                    />
                    <Text style={styles.textTitle}>รอบเช้า</Text>

                </TouchableOpacity>
              
                <TouchableOpacity style={styles.cardbottom} disabled={disableButtonMoon}
                    onPress={() => { navigation.navigate("Listmoon") }}>
                    <Image
                        style={styles.tinysub}
                        source={require('../assets/moon.png')}
                    />
                    <Text style={styles.textTitle}>รอบเย็น</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardbottom}
                    onPress={() => { navigation.navigate("History") }}>
                    <Image
                        style={styles.tinysub}
                        source={require('../assets/clipboard.png')}
                    />
                    <Text style={styles.textTitle}>ประวัติรอบรถ</Text>
                </TouchableOpacity>
                </View>
               
     </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9d423",
        alignItems: 'center',
    },
    parContainer: {
        marginTop:'5%',
        width: '90%',
        backgroundColor: "#f9d423",
        alignItems: 'center',
        marginBottom: 0,
        flexDirection: 'row',
        marginHorizontal: 5,
    },
    Logo: {
        width: 60,
        height: 60,
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 5,
        marginRight: 0,
    },
    tinyLogo: {
        width: 130,
        height: 260,
        marginTop: 0,
        alignItems: 'center',
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,

    },
    textTitle1: {
        fontSize: 20,
        color: "#000",
        fontWeight: 'bold',
        margin: 10,

    },
    textTitle: {
        fontSize: 20,
        color: '#f9d423',
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
        marginLeft: 230,
        marginBottom: 3,
        color: '#000',
        marginTop: 0
    },
    topCard: {
        backgroundColor: "#f9d423",
        width: '95%',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',

        marginBottom: 0,
        marginHorizontal: 5,

    },
    tinytop: {

        width: 30,
        height: 30,

    },
    tinysub: {
        width: 50,
        height: 50,

    },
    

    card: {
        backgroundColor: '#fff',
        width: '95%',
        height:'20%',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        shadowOpacity: 0.1,
        marginRight: 5,
        marginLeft: 5,
        marginTop:10,
    },
    cardbottom: {
        backgroundColor: '#fff',
        width: '95%',
        height:'20%',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        shadowOpacity: 0.1,
        marginRight: 5,
        marginLeft: 5,
        marginTop:10,
    },
    button: {
        width: 220,
        height: 70,
        alignItems: "center",
        backgroundColor: '#f9d423',
        padding: 10,
        marginRight: 180,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tiny: {
        width: 30,
        height: 30,
        marginTop: 10,
        marginLeft: 10
    },
    txt: {
        color: '#000',
        fontWeight: 'bold',
        marginLeft: 10,
        fontSize: 20,
    },
    disableCard: {
        backgroundColor: "#aaa",
    }

})









