import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Platform, ScrollView } from 'react-native';
import { useSelector } from 'react-redux'
import { ShowUserCountData } from "../services/authService";
import { ShowNotiCountData } from '../services/notiService';
import { PieChart, LineChart, } from 'react-native-chart-kit'
import { Dimensions } from "react-native";
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
const screenWidth = Dimensions.get("window").width;
import { includes } from 'lodash'

export default function Index({ navigation }) {

    // const [alertModal, setAlertModal] = useState(false);
    const [CurrentDate, setCurrentDate] = useState("");
    const user = useSelector(state => state.user.data);
    const [modalData, setmodalData] = useState(null);
   const [notiAll, setNotiAll] = useState({
       noti:[0,0,0,0,0,0,0,0,0,0,0,0]
   })
 
    function ShowUserCountAll() {
        ShowUserCountData().then((result) => {
            console.log("test", result.status);
            if (result.status === 200) {
                console.log(result.data);
                setmodalData(result.data);
                // console.log(result.data.response);
                //   setModalVisible(true);
            }
        }).catch(e => console.log(e));
       
    }
    
    function fetchNotiAll(){
        ShowNotiCountData().then(result=>{
            setNotiAll(result.data)
        })
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

        ShowUserCountAll()
        fetchNotiAll()
        //     initListYear()
        //     const mapmonth = (dataList[valueyear] || []).map((month) => (
        //         { label: month, value: month }
        //     ));
        //     setItemsmonth(mapmonth)
        // }, [valueyear])
    }, [])


    function ViewUserCountAll() {
        const dataAuthCount = modalData;
        // console.log(data[1])
        var viewList = [];
        if (dataAuthCount !== null) {
            console.log(dataAuthCount);

            return <View style={{ flex: 1 }}>
                <Text style={styles.textsub1}>
                    <Image
                        style={styles.tinytop}
                        source={require('../assets/pie.png')} />  จำนวนผู้ใช้ในระบบ: {dataAuthCount.userAll} คน </Text>
                <PieChart data={[
                    {
                        name: 'ผู้ปกครอง',
                        population: dataAuthCount.user[0].authCount,
                        color: 'rgb(211, 204, 132)',
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 14,
                    },
                    {
                        name: 'ครูประจำรถ',
                        population: dataAuthCount.user[1].authCount,
                        color: 'rgb(133, 214, 214)',
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 14,
                    },
                    {
                        name: 'คนขับรถ',
                        population: dataAuthCount.user[2].authCount,
                        color: 'rgb(85, 214, 171)',
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 14,
                    },
                    {
                        name: 'ผู้บริหาร',
                        population: dataAuthCount.user[3].authCount,
                        color: 'rgb(250, 128, 114)',
                        backgroundGradientFrom: "#FB7B5E",
                        backgroundGradientTo: 'rgb(211, 204, 132)',
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 14,
                    },
                    {
                        name: 'แอดมิน',
                        population: dataAuthCount.user[4].authCount,
                        color: 'rgb(244, 164, 96)',
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 14,
                    },
                ]}
                    width={Dimensions.get('window').width - 80
                    }
                    height={220}
                    chartConfig={{

                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute />
            </View>
        }
    }

    // function initListYear() {
    //     dataVisuallize().then(({ data }) => {
    //         setDataList(data)
    //         const mapyear = Object.keys(data).map((year) => (
    //             { label: year, value: year }
    //         ))
    //         setItemsyear(mapyear)
    //         getDriveSum().then((data) => {
    //             setDataSumDriver(data.data);
    //             mapDataChartYear();
    //         })
    //     })
    // };



    return (
        <View style={styles.container}>


            <View style={styles.bossContainer}>
                <Image
                    style={styles.Logo}
                    source={require('../assets/bos.png')}
                />
                <Text style={styles.textTitle1}> {user?.user_fname}  {user?.user_lname}</Text>
            </View>
            <View style={styles.topCard}>
                <View style={styles.onecard}>

                    <Text style={styles.textsub2}>
                        {CurrentDate}
                    </Text>
                    <ScrollView>
                        {ViewUserCountAll()}
                 
                        <Text style={styles.textsub1}>
                            <Image style={styles.tinytop}
                                source={require('../assets/calendar.png')} />  จำนวนเหตุการณ์ : {notiAll.allAccident ?? 0} เหตุการณ์
                                </Text>
                          
                        <ScrollView horizontal style={{ marginLeft: 20,zIndex: 0 }}>
                            <LineChart

                                data={{
                                    labels: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."],
                                    datasets: [
                                        {
                                            data: notiAll.noti ,
                                        }
                                    ]
                                }}
                                width={800} // from react-native
                                height={250}

                                // yAxisLabel="$"
                                yAxisSuffix="ครั้ง"
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    // backgroundColor: "blue",
                                    backgroundGradientFrom: "#fff",
                                    backgroundGradientTo: '#fff',
                                    decimalPlaces: 0, // optional, defaults to 2dp
                                    color: (opacity = 1) => 'red',
                                    labelColor: (opacity = 1) => '#000',

                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "5",
                                        strokeWidth: "2",
                                        stroke: "blue",
                                    }
                                }}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16,
                                }}
                            />
                            <View>
                                {/* {initListYear()} */}
                            </View>
                        </ScrollView>
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

                    <TouchableOpacity style={styles.card}
                        onPress={() => { navigation.navigate("List") }}>
                        <Image
                            style={styles.tinysub}
                            source={require('../assets/clipboard.png')}
                        />
                        <Text style={styles.textTitle}>รอบรถ</Text>
                    </TouchableOpacity>

                </View>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FB7B5E",
        alignItems: 'center',
    },
    bossContainer: {
        marginTop:'5%',
        width: '90%',
        backgroundColor: "#FB7B5E",
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
        color: '#FB7B5E',
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
    textsub1: {
        fontSize: 14,
        marginLeft: 20,
        marginBottom: 0,
        color: '#000',
        marginTop: 0,
        fontWeight: 'bold',

    },
    textsub2: {
        fontSize: 15,
        marginLeft: 250,
        marginBottom: 0,
        color: '#000',
        marginTop: 0,
        marginRight: 5
    },
    topCard: {
        backgroundColor: "#FB7B5E",
        width: '95%',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
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
    onecard: {
        backgroundColor: '#fff',
        width: '95%',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        shadowOpacity: 0.1,
        height: 500
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
        // flexDirection: 'row',
    },
    // con: { alignItems: 'center', justifyContent: 'center', height: 1050 },

    gauge: {
        position: 'absolute',
        width: 100,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gaugeText: {
        backgroundColor: 'transparent',
        color: '#000',
        fontSize: 24,
    },


})


