import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { ShowCarData } from "../services/carService";
import { useSelector } from 'react-redux'

export default function Status_tea({ navigation }) {
    const user = useSelector(state => state.user.data)

    const [CurrentDate, setCurrentDate] = useState("");
    const [modalData, setmodalData] = useState(null);

    function openDetailModal(item, date) {
        ShowCarData()
            .then((result) => {
                if (result.status === 200) {
                    setmodalData(result.data);
                    console.log(result.data);
                    setModalVisible(true);
                }
            });
    }

    function ShowCarAll() {
        ShowCarData(user?.car_no).then((result) => {
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
        ShowCarAll()
        setCurrentDate(
            date + '/' + month + '/' + year
            + ' ' + hours + ':' + min
        );

        const hour = new Date().getHours();



    }, [])

    function ViewCarAll() {
        const dataCar = modalData;
        // console.log(data[1])
        var viewList = [];
        if (dataCar !== null) {
            dataCar.forEach((result, index) => {
                viewList.push(

                    <View key={index} style={{ marginTop: 15, marginBottom: 3, borderWidth: 1, height: 220, width: 350, padding: 10, borderRadius: 20 }}>
                        <Text style={styles.txt}>
                            ???????????????????????????: {result.car_reg}
                        </Text>
                        <Text style={styles.txt}>
                            ???????????????????????????: {result.car_no}
                        </Text>
                        <Text style={styles.txt2} >
                            ??????????????????????????????: {result?.teacher?.user_fname}  {result?.teacher?.user_lname}
                        </Text>
                        <Text style={styles.txt2} >
                            ??????????????????????????????????????????????????????: {result?.teacher?.user_tel}
                        </Text>
                        <Text style={styles.txt2}>
                            ?????????????????????: {result?.driver?.user_fname}  {result?.driver?.user_lname}
                        </Text>
                        <Text style={styles.txt2}>
                            ????????????????????????????????????????????????: {result?.driver?.user_tel}
                        </Text>
                        <Text style={styles.txt2}>
                            ???????????????????????????: {result.car_seat}
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, }}>

                            <Text style={styles.txt2}>
                                ?????????????????????????????????????????????:
                            </Text>
                            <TouchableOpacity
                                style={styles.button1}
                                onPress={() => { navigation.navigate("Studlist") }}>
                                <Text style={styles.buttontext1}>View</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                )
            })
        }
        return viewList[0];
    }

    return (
        <View style={styles.container}>
            {/* <View style={styles.teacherContainer}>
                <Image
                    style={styles.Logo}
                    source={require('../assets/teacher.png')}
                />
                <Text style={styles.textTitle1}> {user.user_fname}  {user.user_lname}</Text>
            </View> */}
            <View style={styles.container1}>
                <Text style={styles.txt1}>
                    {/* 28-02-22  07:36 */}
                    {CurrentDate}
                </Text>
                <Text style={styles.textTitle}>????????????????????????</Text>
                <Image
                    style={styles.tinyLogo}
                    source={require('../assets/stabus.png')}
                />
                {ViewCarAll()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#81F1AC",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Logo: {
        width: 60,
        height: 60,
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 5,
        marginRight: 0,
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
    textTitle1: {
        fontSize: 20,
        color: "#000",
        fontWeight: 'bold',
        margin: 10,

    },
    tinyLogo: {
        width: 100,
        height: 220,
        marginTop: 10,
        marginBottom: 10
    },
    textTitle: {
        fontSize: 25,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    },
    txt: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 17,
    },
    txt1: {
        color: '#000',
        marginLeft: 200,
        fontSize: 15,
    },
    txt2: {
        color: '#000',
        fontSize: 17,
    },

    button: {
        width: 150,
        alignItems: "center",
        backgroundColor: "#0000cd",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 20,
        shadowOpacity: 0.1
    },
    tinymore: {
        width: 20,
        height: 20,
        marginTop: 5,
        marginRight: 170
    },
    buttontext: {
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
        marginRight: 110
    },
    buttontext1: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },

});