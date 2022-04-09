

import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setParent,reset } from '../redux/parent/parent.slice'

export default function Request({ navigation }) {
    const dispatch = useDispatch();
    const parent = useSelector(state => state.parent)
    const initialState = {
        user_email: "", user_pass: "", auth_id: 6, user_fname: "", user_lname: "", user_tel: "", car_no: "",
    }
    const [data, setData] = useState(initialState)
    const onSubmit = function () {
        dispatch(setParent(data));
        navigation.navigate("Reqchild")
    }

    return (
        <View style={styles.container}>

            <View style={styles.container1}>
                <Text style={styles.textTitle}>ขอสิทธิ์ผู้ใช้</Text>
                <Image
                    style={styles.tinyLogo}
                    source={require('../assets/man.png')}
                />

                <ScrollView>

                    <View style={{ marginTop: 5, marginBottom: 3, padding: 10, borderRadius: 20 }}>
                        <Text style={{ alignItems: 'flex-start', marginLeft: 10, fontSize: 18, }}

                        >อีเมล์: </Text>

                        <TextInput
                            style={styles.input}
                            id="user_email"
                            placeholder="อีเมล์"
                            value={data.user_email}
                            onChangeText={(value) => setData({ ...data, user_email: value })}
                        />

                        <Text style={{ alignItems: 'flex-start', marginLeft: 10, fontSize: 18, }}

                        >รหัสผ่าน: </Text>
                        <TextInput
                            style={styles.input}
                            id="user_pass"
                            placeholder="รหัสผ่าน"
                            value={data.user_pass}
                            onChangeText={(value) => setData({ ...data, user_pass: value })}
                        />
                        <Text
                            style={{ marginLeft: 10, fontSize: 18, }}
                        >ชื่อจริง: </Text>
                        <TextInput
                            style={styles.input}
                            id="user_fname"
                            placeholder=" ชื่อจริง"
                            value={data.user_fname}
                            onChangeText={(value) => setData({ ...data, user_fname: value })}
                        />
                        <Text
                            style={{ marginLeft: 10, fontSize: 18, }}
                        >นามสกุล: </Text>
                        <TextInput
                            style={styles.input}
                            id="user_lname"
                            placeholder="นามสกุล"
                            value={data.user_lname}
                            onChangeText={(value) => setData({ ...data, user_lname: value })}
                        />
                        <Text
                            style={{ marginLeft: 10, fontSize: 18, }}
                        >เบอร์โทร: </Text>
                        <TextInput
                            style={styles.input}
                            id="user_tel"
                            placeholder="เบอร์โทร"
                            value={data.user_tel}
                            onChangeText={(value) => setData({ ...data, user_tel: value })}
                        />
                        <Text
                            style={{ marginLeft: 10, fontSize: 18, }}
                        >หมายเลขรถ: </Text>
                        <TextInput
                            style={styles.input}
                            id="car_no"
                            placeholder="หมายเลขรถ"
                            value={data.car_no}
                            onChangeText={(value) => setData({ ...data, car_no: value })}
                        />

                    </View>
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
        height: 700,
        marginTop: 30,
        alignItems: "center",
        padding: 10,
        borderRadius: 30,
        marginTop: 50,
        marginBottom: 50,
        shadowOpacity: 0.1
    },
    tinyLogo: {
        width: 120,
        height: 120,
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
    button: {
        width: 150,
        marginTop: 30,
        alignItems: "center",
        backgroundColor: "#778899",
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
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft: 0,
    },
});
