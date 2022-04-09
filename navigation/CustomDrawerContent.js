import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { logout } from '../redux/user/user.slice'
import { useDispatch, useSelector } from 'react-redux/'
import React from 'react'
import { Logout } from '../services/authService';
import { Alert } from 'react-native';
export default function CustomDrawerContent(props) {
  const dispatch = useDispatch()
  const { navigation, state } = props;
  const { token } = useSelector(state => state.user);
  const _logout = function () {
    Logout(token).then(result => {
      if (result.status == 200) {
        dispatch(logout());
      } else {
        Alert.alert('Error!!')
      }
    })
  }
  const labels = {
    "Main": "หน้าหลัก",
    "Status": "ข้อมูลรถ",
    "Listsun": "รอบเช้า",
    "Listmoon": "รอบเย็น",
    "Leave": "ใบลา",
    "Report": "รายงาน",
    "History": "ประวัติรอบ",
    "List": "รอบรถ",
    "Listnext":"รอบรถ"

  }
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      {state?.routes?.map(({ name }, index) => (
        <DrawerItem
          key={index}
          label={`${labels[name]}`}
          onPress={() => navigation.navigate(name)}
        />
      ))}
      <DrawerItem
        label="ออกจากระบบ"
        onPress={_logout}
      />
    </DrawerContentScrollView>
  );
}