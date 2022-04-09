import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import Index_tea from "../screens/Index_tea";
import Status_tea from "../screens/Status_tea";
import Listsun_tea from "../screens/Listsun_tea";
import Listmoon_tea from "../screens/Listmoon_tea";
import Leave_tea from "../screens/Leave_tea";
import Studlist_tea from "../screens/Studlist_tea";
import CustomDrawerContent from "./CustomDrawerContent";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function WithDrawer() {
    return (
            <Drawer.Navigator initialRouteName="Main" screenOptions={{
                headerShown:false,title:""
            }} drawerContent={(props) => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name="Main" component={Index_tea} />
                <Drawer.Screen name="Status" component={Status_tea} />
                {/* <Drawer.Screen name="Listsun" component={Listsun_tea} />
                <Drawer.Screen name="Listmoon" component={Listmoon_tea} /> */}
                <Drawer.Screen name="Leave" component={Leave_tea} />

                
            </Drawer.Navigator>
    )
}
export default function Teacher() {
    return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
                headerShown:false,
                title:""
            }}>
            <Stack.Screen name="Index" component={WithDrawer}/>
            <Stack.Screen name="Studlist" component={Studlist_tea} />
        </Stack.Navigator>
        </NavigationContainer>
    )
}