import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Index from '../screens/Index';
import Status from '../screens/Status';
import Home from '../screens/Home';

import Index_tea from '../screens/Index_tea';
import Status_tea from '../screens/Status_tea';
import Studlist_tea from '../screens/Studlist_tea';
import Listsun_tea from '../screens/Listsun_tea';
import Listmoon_tea from '../screens/Listmoon_tea';
import Leave_tea from '../screens/Leave_tea';

import Index_boss from '../screens/Index_boss';
import Report_boss from '../screens/Report_boss';
import Status_boss from '../screens/Status_boss';
import Studlist_boss from '../screens/Studlist_boss';
import List_boss from '../screens/List_boss';
import Listsunnext_boss from '../screens/Listsunnext_boss';
import Listmoon_boss from '../screens/Listmoon_boss';
import Listmoonnext_boss from '../screens/Listmoonnext_boss';

import Hismoon from "../screens/Hismoon";
import Hissun from "../screens/Hissun";
import Studlist from '../screens/Studlist';
import Index_dri from '../screens/Index_dri';
import Request from '../screens/Request';
import Reqchild from '../screens/Reqchild';
import Reqchildmore from '../screens/Reqchildmore';
import Leave_dri from '../screens/Leave_dri';
import Status_dri from '../screens/Status_dri';
import Studlist_dri from '../screens/Studlist_dri';
import Listsun_dri from '../screens/Listsun_dri';
import Listmoon_dri from '../screens/Listmoon_dri';

import Listsun from '../screens/Listsun';
import Listmoon from '../screens/Listmoon';

const Drawer = createDrawerNavigator();
function CustomDrawerContent(props) {
  const { navigation } = props;
  const _logout = function(){
    navigation.navigate("home")
  }
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="ออกจากระบบ"
        onPress={_logout}
        />
    </DrawerContentScrollView>
  );
}
export default function App() {
  
  return (
    // ต้องทำif else ให้เข้าเงื่อนไขเผื่อเข้าแต่ละผู้ใช้
    // หน้าขอสิทธิีีuser Request
    // หน้าให้สิทธิadmin Authorize
    
    // <Drawer.Navigator initialRouteName="หน้าหลัก" drawerContent={(props) => <CustomDrawerContent {...props} />}>
    //   <Drawer.Screen name="โฮม" component={Home} />
    //   <Drawer.Screen name="หน้าขอสิทธิ" component={Request} />
    //   <Drawer.Screen name="หน้าขอสิทธิเด็ก" component={Reqchild} />
    //   <Drawer.Screen name="หน้าขอสิทธิเด็กเพิ่ม" component={Reqchildmore} />

    // </Drawer.Navigator>

 

    //--ผู้ปกครอง--

    // <Drawer.Navigator initialRouteName="หน้าหลัก" drawerContent={(props) => <CustomDrawerContent {...props} />} >
    //   <Drawer.Screen name="หน้าหลัก" component={Index} />
    //   <Drawer.Screen name="รถบัส" component={Status}/>
    //   <Drawer.Screen name="รอบเช้า" component={Listsun}/>
    //   <Drawer.Screen name="รอบเย็น" component={Listmoon} />
    // </Drawer.Navigator>



    //--ครู --

    <Drawer.Navigator initialRouteName="หน้าหลัก"  drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="หน้าหลัก" component={Index_tea} />
        <Drawer.Screen name="ข้อมูลรถ" component={Status_tea}/>
        <Drawer.Screen name="รอบเช้า" component={Listsun_tea}/>
        <Drawer.Screen name="รอบเย็น" component={Listmoon_tea} />
        <Drawer.Screen name="ใบลา" component={Leave_tea} />
      </Drawer.Navigator>



    //--คนขับ-- <<ยังไม่มีหน้าเลย ออกแบบหน้าใหม่ก่อน>>

      //  <Drawer.Navigator initialRouteName="หน้าหลัก"  drawerContent={(props) => <CustomDrawerContent {...props} />}>
      //   <Drawer.Screen name="หน้าหลัก" component={Index_dri} />
      //  <Drawer.Screen name="ข้อมูลรถ" component={Status_dri}/>
      //   <Drawer.Screen name="รอบเช้า" component={Listsun_dri}/>
      //   <Drawer.Screen name="รอบเย็น" component={Listmoon_dri}/>
      //   <Drawer.Screen name="ใบลา" component={Leave_dri}/> 
      //   </Drawer.Navigator>




    //--ผู้บริหาร--

  //   <Drawer.Navigator initialRouteName="หน้าหลัก"  drawerContent={(props) => <CustomDrawerContent {...props} />}>
  //   <Drawer.Screen name="หน้าหลัก" component={Index_boss} />
  //     <Drawer.Screen name="ข้อมูลรถ" component={Status_boss}/>
  //        <Drawer.Screen name="รอบเช้า" component={Listsun_boss}/>
  //       <Drawer.Screen name="รอบเช้าเด็ก" component={Listsunnext_boss}/>
  //       <Drawer.Screen name="รอบเย็น" component={List_boss}/>
  //   <Drawer.Screen name="หน้ารายงาน" component={Report_boss} />
  // </Drawer.Navigator>

  );
}


