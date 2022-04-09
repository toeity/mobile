import React from "react";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Pressable, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/user/user.slice'
import { reset } from '../redux/parent/parent.slice'
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function Home({ navigation }) {

  const { useState, useEffect, useRef } = React;
  const user = useSelector(state => state.user)
  const [data, setData] = useState({
    email: '',
    password: '',
    token: ''
  })
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    let isMount = true;
    registerForPushNotificationsAsync().then((token) => {
      if (isMount) {
        setData(d => ({ ...d, token }));
      }
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
      isMount = false;
    };

  }, []);
  const dispatch = useDispatch()
  // console.log('user',user)
  const _request = function () {
    dispatch(reset())
    navigation.navigate('Request')
  }

  const _login = function () {
    dispatch(login(data))
  }
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }


  return (
    <View style={styles.container}>

      <Image
        style={styles.tinyLogo}
        source={require('../assets/logo.png')}
      />
      <Text style={styles.textTItle}>C.I.T.C</Text>
      <View style={styles.container1}>
        <Text style={styles.txtemail}>
          อีเมล์:
        </Text>
        <TextInput
          style={styles.input}
          value={data.email}
          onChangeText={(value) => setData({ ...data, email: value })}
          placeholder="อีเมล์" />
        <Text style={styles.txtpass}>
          รหัสผ่าน:
        </Text>
        <TextInput
          style={styles.input1}
          secureTextEntry
          value={data.password}
          onChangeText={(value) => setData({ ...data, password: value })}
          placeholder=" รหัสผ่าน" />
        <Pressable style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgb(210, 230, 255)'
              : 'white'
          },
          styles.wrapperCustom
        ]}>

          {/* {({ pressed }) => (
            <Text style={styles.txtforgot}>
              {pressed ? 'Forgot Password!' : 'ลืมรหัสผ่าน'}
            </Text>
          )} */}
        </Pressable>
        <TouchableOpacity
          style={styles.button}
          onPress={_login}
        >
          <Text style={styles.buttontext}>เข้าสู่ระบบ</Text>

        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button1}
          onPress={_request}
        >
          <Text style={styles.buttontext}>ขอสิทธิ์ผู้ใช้</Text>

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
  tinyLogo: {
    marginTop: 90,
    width: 150,
    height: 150,
  },
  textTItle: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  },

  container1: {
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    marginTop: 30,
    padding: 10,
    borderRadius: 30,
    marginBottom: 120,
    shadowOpacity: 0.1
  },
  txtemail: {
    color: '#000',
    fontSize: 18,
    marginRight: 150,
    marginTop: 5
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
  txtpass: {
    color: '#000',
    fontSize: 18,
    marginRight: 120
  },
  input1: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 100,
    shadowOpacity: 0.1
  },
  txtforgot: {
    fontSize: 12,
    color: "#696969",
    marginBottom: 10
  },
  button: {
    width: 150,
    marginTop: 30,
    alignItems: "center",
    backgroundColor: "#778899",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    shadowOpacity: 0.1,
  },
  buttontext: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  button1: {
    width: 150,
    marginTop: 30,
    alignItems: "center",
    backgroundColor: "#87cefa",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    shadowOpacity: 0.1,
  },



});
