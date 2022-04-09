import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import History from "../screens/History";
import Hissun from "../screens/Hissun";
import Index from "../screens/Index";
import Listmoon from "../screens/Listmoon";
import Listsun from "../screens/Listsun";
import Status from "../screens/Status";
import Studlist from "../screens/Studlist";
import CustomDrawerContent from "./CustomDrawerContent";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function WithDrawer() {
    return (
        <Drawer.Navigator initialRouteName="Main" screenOptions={{
            headerShown:false, title:""
        }} drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Main" component={Index} />
            <Drawer.Screen name="Status" component={Status} />
            <Drawer.Screen name="Listsun" component={Listsun} />
            {/* <Drawer.Screen name="Hissun" component={Hissun} /> */}
            <Drawer.Screen name="Listmoon" component={Listmoon} />
            <Drawer.Screen name="History" component={History} />
        </Drawer.Navigator>
    )
}
export default function Parent() {
    return (
        <NavigationContainer>
              <Stack.Navigator screenOptions={{
                headerShown:false,
                title:""
            }}>
                <Stack.Screen name="Index" component={WithDrawer} />
                <Stack.Screen name="Studlist" component={Studlist} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}