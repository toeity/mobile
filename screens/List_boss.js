import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { ShowCarBoss } from "../services/carService";
import { useSelector } from 'react-redux'


export default function List_boss({ navigation }) {
    const user = useSelector(state => state.user.data)
    const [CurrentDate, setCurrentDate] = useState("");
    const [modalData, setmodalData] = useState(null);

    function openDetailModal(item, date) {
        ShowCarBoss()
            .then((result) => {
                if (result.status === 200) {
                    setmodalData(result.data);
                    console.log(result.data);
                    setModalVisible(true);
                }
            });
    }

    function ShowCarBoossAll() {
        ShowCarBoss().then((result) => {
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
        ShowCarBoossAll()
        setCurrentDate(
            date + '/' + month + '/' + year
            + ' ' + hours + ':' + min
        );
        const hour = new Date().getHours();



    }, [])

    function ViewCarBossAll() {
        const dataCar = modalData;
        // console.log(data[1])
        var viewList = [];
        if (dataCar !== null) {
            dataCar.forEach((result, index) => {
                viewList.push(
                    <View key={index} style={{ marginTop: 10, marginBottom: 3, borderWidth: 1, height: 110, width: 350, padding: 10, borderRadius: 20 }}>
                        <View style={{ flexDirection: 'row', width: "100%" ,alignItems:'center'  }}>
                            <View style={{ width: '20%' }}>
                                <Image
                                    style={styles.tinycar}
                                    source={require('../assets/bus.png')}
                                />
                            </View>

                            <View style={{ width: '55%'  }}>
                                <Text style={styles.txt}>
                                    ทะเบียนรถ: {result.car_reg}
                                </Text>
                                <Text style={styles.txt}>
                                    ทะเบียนรถ: {result.car_reg}
                                </Text>
                                <Text style={styles.txt}>
                                    หมายเลขรถ: {result.car_no}
                                </Text>


                            </View>
                            <View style={{ width: '35%' }}>
                                <TouchableOpacity
                                    style={styles.button1}
                                    onPress={() => { navigation.navigate("Listnext", { car_no: result.car_no }) }}>
                                    <Text style={styles.buttontext1}>View</Text>
                                </TouchableOpacity>
                            </View>

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

                    <Text style={styles.textTitle}>รอบรถ</Text>
                    {/* <Image
                        style={styles.tinyimage}
                        source={require('../assets/sun.png')}
                    /> */}
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
                    {ViewCarBossAll()}
                </ScrollView>


            </View>
        </View>

    )
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
    tinycar: {
        width: 40,
        height: 40,
        
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
        marginTop: 0
    },
    txt1: {
        color: '#000',
        fontSize: 15,
        marginRight: 0,
        marginTop: 5,
        
    },
    btntxt1: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    button1: {
        width: 80,
        height: 35,
        alignItems: "center",
        backgroundColor: '#87cefa',
        padding: 10,
        borderRadius: 10,
        shadowOpacity: 0.1,

    },
    buttontext1: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
});