import React, { Component, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';

export default function Index1({ navigation }) {

    const [alertModal, setAlertModal] = useState(false);


    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>สถานะรถ: รับ </Text>
            <Modal isVisible={alertModal} hasBackdrop={true}>
                <View style={styles.alertModal}>
                    <Text style={{ fontSize: 16, marginBottom: 20 }}>กรุณาสแกน QR CORE เพื่อรับแจ้งเตือน</Text>
                    <Image source={require('../assets/qc.jpeg')} style={{ width: 170, height: 170, marginBottom: 10 }} />
                    <TouchableOpacity style={styles.alertButton} onPress={() => setAlertModal(false)}>
                        <Text>รับทราบ</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={styles.teacherContainer}>
                <Image
                    style={styles.Logo}
                    source={require('../assets/teacher.png')}
                />
                <Text style={styles.textsub2}> ครูประจำรถ </Text>
            </View>
            <View style={styles.topCard}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../assets/stabus.png')}
                />
                <Text style={styles.textTitle}>สถานะรถ:  </Text>
                <Text style={styles.textsub}>หมายเลขรถ:  </Text>
            </View>
            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.card}
                    onPress={() => { navigation.navigate("Statusbus") }}>
                    <Image
                        style={styles.tinysub}
                        source={require('../assets/bus.png')}
                    />
                    <Text style={styles.textTitle}>ข้อมูลรถ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}
                    onPress={() => { navigation.navigate("Checklist") }}>
                    <Image
                        style={styles.tinysub1}
                        source={require('../assets/note.png')}
                    />
                    <Text style={styles.textTitle}>เช็ครายชื่อ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card1}
                >

                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAlertModal(true)}>
                    <Image source={require('../assets/line.png')}
                        style={{ width: 50, height: 50, }}
                    />
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
    teacherContainer: {
        width:'90%',
        backgroundColor: "#f9d423",
        alignItems: 'center',
        marginBottom: 0,
        flexDirection: 'row',  marginHorizontal: 5,
    },
    Logo: {
        width: 60,
        height: 60,
        marginTop: 0,
        marginBottom: 5,
        marginHorizontal: 5,
        marginRight: 0,
    },
    tinyLogo: {
        width: 130,
        height: 260,
        marginTop: 5,
        marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5,

    },
    textTitle: {
        fontSize: 20,
        color: '#f9d423',
        fontWeight: 'bold',
        marginTop: 5
    },
    textsub: {
        fontSize: 18,
        color: '#000',
        marginTop: 10,
        marginRight: 150
    },
    textsub1: {
        fontSize: 18,
        color: '#000',
        marginTop: 0,
        marginRight: 140
    },
    textsub2: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 0,
    },
    topCard: {
        backgroundColor: '#fff',
        width: '95%',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 0,
        shadowOpacity: 0.1
    },
    tinysub: {
        width: 70,
        height: 70,
        marginTop: 10
    },
    card: {
        backgroundColor: '#fff',
        width: '49%',
        height: '45%',
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        shadowOpacity: 0.1,
        marginTop: 0
    },
    card1: {
        width: '49%',
        height: '45%',
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        shadowOpacity: 0.1,
        marginTop: 0
    },
    tinysub1: {
        width: 70,
        height: 70,
        marginTop: 10,
        marginLeft: 15
    },
    cardContainer: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        height: 280,
    },
    alertModal: { backgroundColor: "#fff", borderWidth: 4, borderColor: 'green', height: 310, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    alertButton: {
        backgroundColor: '#d3d3d3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
        shadowOpacity: 0.1
    },

})

// import React, { Component, useState } from 'react';
// import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
// import Modal from 'react-native-modal';
// import {ShowEventData} from "../services/eventService";

// export default function Index1({ navigation }) {

//     const [alertModal, setAlertModal] = useState(false);
//     const [modalData, setmodalData] = useState(null);

//     function openDetailModal(item, date) {
//         ShowEventData()
//             .then((result) => {
//                 if (result.status === 200) {
//                     setmodalData(result.data);
//                     console.log(result.data);
//                     setModalVisible(true);
//                 }
//             });
//     }

//     function ShowEventAll() {
//         ShowEventData().then((result) => {
//             if (result.status === 200) {
//                 setmodalData(result.data.response);
//                 // console.log(result.data.response);
//                 //   setModalVisible(true);
//             }
//         });
//     }

//     useEffect(() => {
//         ShowEventAll()
//     }, [])

//     function ViewEventAll() {
//         const dataEvent = modalData;
//         // console.log(data[1])
//         var viewList = [];
//         if (dataEvent !== null) {
//             dataEvent.forEach((result) => {
//                 viewList.push(
//                     <Text style={styles.textsub}>หมายเลขรถ: {result.event_name} </Text>

//                     )
//                 })
//             }
//             return viewList;
//         }
//     return (
//         <View style={styles.container}>
//             <Text style={styles.textTitle}>สถานะรถ: รับ </Text>
//             <Modal isVisible={alertModal} hasBackdrop={true}>
//                 <View style={styles.alertModal}>
//                     <Text style={{ fontSize: 16, marginBottom: 20 }}>กรุณาสแกน QR CORE เพื่อรับแจ้งเตือน</Text>
//                     <Image source={require('../assets/qc.jpeg')} style={{ width: 170, height: 170, marginBottom: 10 }} />
//                     <TouchableOpacity style={styles.alertButton} onPress={() => setAlertModal(false)}>
//                         <Text>รับทราบ</Text>
//                     </TouchableOpacity>
//                 </View>
//             </Modal>
//             <View style={styles.teacherContainer}>
//                 <Image
//                     style={styles.Logo}
//                     source={require('../assets/teacher.png')}
//                 />
//                 <Text style={styles.textsub2}> ครูประจำรถ </Text>
//             </View>
//             <View style={styles.topCard}>
//                 <Image
//                     style={styles.tinyLogo}
//                     source={require('../assets/stabus.png')}
//                 />
//                 <Text style={styles.textTitle}>สถานะรถ:  </Text>
//                 {/* <Text style={styles.textsub}>หมายเลขรถ:  </Text> */}
//                 {ViewEventAll()}
//             </View>
//             <View style={styles.cardContainer}>
//                 <TouchableOpacity style={styles.card}
//                     onPress={() => { navigation.navigate("Statusbus") }}>
//                     <Image
//                         style={styles.tinysub}
//                         source={require('../assets/bus.png')}
//                     />
//                     <Text style={styles.textTitle}>ข้อมูลรถ</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.card}
//                     onPress={() => { navigation.navigate("Checklist") }}>
//                     <Image
//                         style={styles.tinysub1}
//                         source={require('../assets/note.png')}
//                     />
//                     <Text style={styles.textTitle}>เช็ครายชื่อ</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.card1}
//                 >

//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => setAlertModal(true)}>
//                     <Image source={require('../assets/line.png')}
//                         style={{ width: 50, height: 50, }}
//                     />
//                 </TouchableOpacity>

//             </View>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#f9d423",
//         alignItems: 'center',
//     },
//     teacherContainer: {
//         width:'90%',
//         backgroundColor: "#f9d423",
//         alignItems: 'center',
//         marginBottom: 0,
//         flexDirection: 'row',  marginHorizontal: 5,
//     },
//     Logo: {
//         width: 60,
//         height: 60,
//         marginTop: 0,
//         marginBottom: 5,
//         marginHorizontal: 5,
//         marginRight: 0,
//     },
//     tinyLogo: {
//         width: 130,
//         height: 260,
//         marginTop: 5,
//         marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5,

//     },
//     textTitle: {
//         fontSize: 20,
//         color: '#f9d423',
//         fontWeight: 'bold',
//         marginTop: 5
//     },
//     textsub: {
//         fontSize: 18,
//         color: '#000',
//         marginTop: 10,
//         marginRight: 150
//     },
//     textsub1: {
//         fontSize: 18,
//         color: '#000',
//         marginTop: 0,
//         marginRight: 140
//     },
//     textsub2: {
//         fontSize: 20,
//         color: '#000',
//         fontWeight: 'bold',
//         marginTop: 0,
//     },
//     topCard: {
//         backgroundColor: '#fff',
//         width: '95%',
//         paddingVertical: 14,
//         borderRadius: 10,
//         alignItems: 'center',
//         marginTop: 0,
//         shadowOpacity: 0.1
//     },
//     tinysub: {
//         width: 70,
//         height: 70,
//         marginTop: 10
//     },
//     card: {
//         backgroundColor: '#fff',
//         width: '49%',
//         height: '45%',
//         marginVertical: 10,
//         borderRadius: 10,
//         alignItems: 'center',
//         shadowOpacity: 0.1,
//         marginTop: 0
//     },
//     card1: {
//         width: '49%',
//         height: '45%',
//         marginVertical: 10,
//         borderRadius: 10,
//         alignItems: 'center',
//         shadowOpacity: 0.1,
//         marginTop: 0
//     },
//     tinysub1: {
//         width: 70,
//         height: 70,
//         marginTop: 10,
//         marginLeft: 15
//     },
//     cardContainer: {
//         padding: 10,
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//         height: 280,
//     },
//     alertModal: { backgroundColor: "#fff", borderWidth: 4, borderColor: 'green', height: 310, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
//     alertButton: {
//         backgroundColor: '#d3d3d3',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 10,
//         marginTop: 10,
//         shadowOpacity: 0.1
//     },

// })