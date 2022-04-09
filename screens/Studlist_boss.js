
import React, { Component,useState, useEffect } from 'react';
import CheckBox from 'react-native-check-box';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { ShowStudentData } from "../services/studentService";
import { useSelector } from 'react-redux';

export default function Studlist_boss({route}) {
    const {car_no} = route.params
    const user = useSelector(state=>state.user.data)
    const [CurrentDate, setCurrentDate] = useState("");
    const [modalData, setmodalData] = useState(null);

    function openDetailModal(item, date) {
        ShowStudentData()
            .then((result) => {
                if (result.status === 200) {
                    setmodalData(result.data);
                    console.log(result.data);
                    setModalVisible(true);
                }
            });
    }

    function ShowStudentAll() {
        ShowStudentData(car_no).then((result) => {
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
        ShowStudentAll()
        setCurrentDate(
            date + '/' + month + '/' + year 
            + ' ' + hours + ':' + min 
          );

        const hour = new Date().getHours();
        
       
        
    }, [])

    function ViewStudentAll() {
        const dataStudent = modalData;
        // console.log(data[1])
        var viewList = [];
        if (dataStudent !== null) {
            dataStudent.forEach((result, index) => {
                viewList.push(
                    <View key={index} style={{ marginTop: 5, marginBottom: 3, borderWidth: 1, height: 100, width: 350, padding: 10, borderRadius: 20 }}>
                        <Text
                            style={{ alignItems: 'flex-start', marginLeft: 7, fontSize: 17, }}

                        >ลำดับ {index+1} : {result.stu_fname}  {result.stu_lname}</Text>
                    
                        <Text
                            style={{ marginLeft: 7, fontSize: 17, }}
                        >ที่อยู่: {result.stu_address} </Text>
                        <Text
                            style={{ marginLeft: 7, fontSize: 17, }}
                        >เบอร์โทรผู้ปกครอง: 
                            {result.user?.user_tel} (K.{result.user?.user_fname})
                        </Text>
                      
                    </View>
                )
            })
        }
        return viewList;
    }

    return (
        <View style={styles.container}>

            <View style={styles.container1}>
            <Text style={styles.txt2}>
                {/* 28-02-22  07:36 */}
                {CurrentDate}
            </Text>
                <Text style={styles.textTitle}>รายชื่อนักเรียน</Text>
                <Image
                    style={styles.tinyLogo}
                    source={require('../assets/note.png')}
                />

                <View style={{ marginLeft: 85, marginTop: 0, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, }}>
                </View>
                <ScrollView>
                  
                    {ViewStudentAll()}
                </ScrollView>
            </View>
        </View>
    );
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
        width: 90,
        height: 90,
        marginTop: 5,
        marginBottom: 5
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
        fontSize: 18,
        marginRight: 0,
        marginTop: 20
    },
    txt2: {
        color: '#000',
        marginLeft:200,
        marginBottom:10,
        marginTop:10,
        fontSize: 15,
    },
    
});