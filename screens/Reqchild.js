
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addChildren } from '../redux/parent/parent.slice'

export default function Reqchild({ navigation }) {
    const dispatch = useDispatch();
    const initialState = {
        stu_fname:"", stu_lname:"",stu_address:"",user_id:"",stdId:""
    }
    const [data, setData] = useState(initialState)
    const onSubmit = function (){
        dispatch(addChildren(data))
        navigation.navigate("Reqchildmore") 
    }
    const moreChildren = function () {
        dispatch(addChildren(data))
        setData(initialState)
    }
    return (
        <View style={styles.container}>

            <View style={styles.container1}>
                <Text style={styles.textTitle}>ขอสิทธิ์ผู้ใช้</Text>
                <Image
                    style={styles.tinyLogo}
                    source={require('../assets/baby.png')}
                />

                <Text style={styles.textTitle1}>ข้อมูลนักเรียน</Text>
                <ScrollView>

                    <View style={{ marginTop: 5, padding: 10, borderRadius: 20 }}>

                        <Text
                            style={{ marginLeft: 10, fontSize: 18, }}
                        >รหัสนักเรียน: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder=" รหัสนักเรียน"
                            value={data.stdId}
                            onChangeText={(value)=>setData({ ...data, stdId: value })}
                        />
                        <Text
                            style={{ marginLeft: 10, fontSize: 18, }}
                        >ชื่อนักเรียน: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder=" ชื่อนักเรียน"
                            value={data.stu_fname}
                            onChangeText={(value) => setData({ ...data, stu_fname: value })}
                        />
                        <Text
                            style={{ marginLeft: 10, fontSize: 18, }}
                        >นามสกุลนักเรียน: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="นามสกุลนักเรียน"
                            value={data.stu_lname}
                            onChangeText={(value) => setData({ ...data, stu_lname: value })}
                        />
                        <Text
                            style={{ marginLeft: 10, fontSize: 18, }}
                        >ที่อยู่: </Text>
                        <TextInput
                            style={styles.input1}
                            placeholder="ที่อยู่"
                            value={data.stu_address}
                            onChangeText={(value) => setData({ ...data, stu_address: value })}
                        />
                    </View>


                    <TouchableOpacity
                        style={styles.button1}
                        onPress={moreChildren}
                    >
                        <View style={{ marginLeft: 0, marginTop: 0, marginBottom: 0, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, }}>

                            <Image
                                style={styles.Logo}
                                source={require('../assets/add.png')}
                            />
                            <Text style={styles.buttontext1}>เพิ่มข้อมูลนักเรียน</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onSubmit}
                >
                    <Text style={styles.buttontext}>ขอสิทธิ์</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f9d423",
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
        marginTop: 30,
        alignItems: "center",
        padding: 10,
        borderRadius: 30,
        marginTop: 70,
        marginBottom: 70,
        shadowOpacity: 0.1
    },
    tinyLogo: {
        width: 120,
        height: 120,
        marginTop: 5,
        marginBottom: 0
    },
    textTitle: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 0,
        marginTop: 0
    },
    textTitle1: {
        fontSize: 15,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 0,
        marginTop: 0
    },
    input: {
        width: 200,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 100,
        shadowOpacity: 0.1
    },
    input1: {
        width: 200,
        height: 80,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        shadowOpacity: 0.1
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
    Logo: {
        
        
        width: 30,
        height: 30,
        marginTop: 5,
        marginBottom: 0
    },
    button: {
        width: 150,
        marginTop: 30,
        alignItems: "center",
        backgroundColor: "#008000",
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
    button1: {
        width: 130,
        height: 50,
        marginRight: 70,
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
    },
    buttontext1: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft: 0,
    },
});