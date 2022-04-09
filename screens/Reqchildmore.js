
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { onSubmit } from '../redux/parent/parent.slice'
export default function Reqchildmore({ navigation }) {
    const dispatch = useDispatch();
    const { data, children } = useSelector(state => state.parent)
    const _submit = function () {
        try {
            dispatch(onSubmit({ data, children }))

            navigation.navigate('home')
        } catch (e) {
            Alert.alert('Error!')
        }
    }
    return (
        <View style={styles.container}>

            <View style={styles.card}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, }}>

                    <Image
                        style={styles.tinyLogo}
                        source={require('../assets/family.png')}
                    />
                    <Text style={styles.txt}>ผู้ปกครอง</Text>
                </View>
                <View style={styles.valueContainer}>
                    {/* <Text stype={styles.label}>ชื่อ:</Text> */}
                    <Text stype={styles.value}>{data.user_fname} {data.user_lname}</Text>
                </View>
            </View>
            {children.map(child => (

                <View style={styles.card1}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, }}>

                        <Image
                            style={styles.tinyLogo}
                            source={require('../assets/baby.png')}
                        />
                        <Text style={styles.txt}>นักเรียน</Text>
                    </View>
                    <View style={styles.valueContainer}>
                        {/* <Text stype={styles.label}>ชื่อ:</Text> */}
                        <Text stype={styles.value}>{child.stu_fname} {child.stu_lname}</Text>

                    </View>
                </View>
            ))}
            <TouchableOpacity style={styles.button} onPress={_submit}>
                <Text style={styles.buttontext}>ร้องขอการสมัครสมาชิก</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f9d423",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    label: {
        marginBottom: 10,
    },
    txt: {
        fontSize: 20,
        color: "#000",
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 5,
        marginRight: 100
    },
    tinyLogo: {
        width: 60,
        height: 60,
        marginBottom: 20,

    },
    card: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 330,
        alignItems: "center",
        padding: 10,
        borderRadius: 30,
        marginTop: 120,
        marginBottom: 0,
        shadowOpacity: 0.1
    },
    card1: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 330,
        alignItems: "center",
        padding: 10,
        borderRadius: 30,
        marginTop: 20,
        marginBottom: 0,
        shadowOpacity: 0.1
    },
    valueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    button: {
        width: 210,
        height: 40,
        marginTop: 15,
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        shadowOpacity: 0.1,
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#FB7B5E',
        borderRadius: 30,
        marginBottom: 80,

    },
    buttontext: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },

});
