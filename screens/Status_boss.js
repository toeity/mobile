import React,{Component,useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {ShowCarBoss} from "../services/carService";
import {useSelector} from 'react-redux'

export default function Status({ navigation }) {
    const user = useSelector(state=>state.user.data)

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

    function ViewCarAll() {
        const dataCar = modalData;
        // console.log(data[1])
        var viewList = [];
        if (dataCar !== null) {
            dataCar.forEach((result, index) => {
                viewList.push(
                    <View key={index} style={{ marginTop: 10, marginBottom: 0, borderWidth: 1, height: 220, width: 350, padding: 10, borderRadius: 20 }}>
                <Text style={styles.txt}>
                            ทะเบียนรถ: {result.car_reg}
                        </Text>
                        <Text style={styles.txt}>
                            หมายเลขรถ: {result.car_no}
                        </Text>
                        <Text style={styles.txt2} >
                            ครูประจำรถ: {result?.teacher?.user_fname}  {result?.teacher?.user_lname} 
                        </Text>
                        <Text style={styles.txt2} >
                            เบอร์โทรครูประจำรถ: {result?.teacher?.user_tel}
                        </Text>
                        <Text style={styles.txt2}>
                            คนขับรถ: {result?.driver?.user_fname}  {result?.driver?.user_lname}   
                        </Text>
                        <Text style={styles.txt2}>
                            เบอร์โทรผู้ขับรถ: {result?.driver?.user_tel}
                        </Text>
                        <Text style={styles.txt2}>
                            จำนวนเบาะ: {result.car_seat}
                        </Text>
                    <View style={{  flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, }}>

                        <Text style={styles.txt2}>
                            รายชื่อนักเรียน:
                        </Text>

                        <TouchableOpacity 
                        style={styles.button1}
                            onPress={() => { navigation.navigate("Studlist",{car_no:result.car_no}) }}>
                            <Text style={styles.buttontext1}>View</Text>
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
 {/* <View style={styles.bossContainer}>
                <Image
                    style={styles.Logo}
                    source={require('../assets/bos.png')}
                />
                <Text style={styles.textTitle1}> {user.user_fname}  {user.user_lname}</Text>
            </View> */}
            <View style={styles.container1}>
            <Text style={styles.txt1}>
                {/* 28-02-22  07:36 */}
                {CurrentDate}
            </Text>
                <Text style={styles.textTitle}>ข้อมูลรถ</Text>
                <Image
                    style={styles.tinyLogo}
                    source={require('../assets/stabus.png')}
                />
                <ScrollView>
                    {ViewCarAll()}
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
        width: 80,
        height: 170,
        marginBottom:5,
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
        marginLeft:200,
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
        marginRight:170
    },
    buttontext: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    button1: {
        width: 80,
        height:35,
        alignItems: "center",
        backgroundColor: '#87cefa',
        padding: 10,
        borderRadius: 10,
        shadowOpacity: 0.1,
        marginRight:110
    },
    buttontext1: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },

});