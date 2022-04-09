import React from 'react'
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Studlist_dri from '../screens/Studlist_dri';
import Leave_dri from '../screens/Leave_dri';
import Listmoon_dri from '../screens/Listmoon_dri';
import Listsun_dri from '../screens/Listsun_dri';
import Status_dri from '../screens/Status_dri';
import Index_dri from '../screens/Index_dri';
import CustomDrawerContent from './CustomDrawerContent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function WithDrawer() {
    return (
        <Drawer.Navigator initialRouteName="Main" screenOptions={{
            headerShown:false,title:""
        }} drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Main"  component={Index_dri} />
            <Drawer.Screen name="Status" component={Status_dri} />
            {/* <Drawer.Screen name="Listsun" component={Listsun_dri} />
            <Drawer.Screen name="Listmoon" component={Listmoon_dri} /> */}
            <Drawer.Screen name="Leave" component={Leave_dri} />
        </Drawer.Navigator>
    )
}
export default function Driver() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown:false,
                title:""
            }}>
                <Stack.Screen name="Index" component={WithDrawer} />
                <Stack.Screen name="Studlist" component={Studlist_dri} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}