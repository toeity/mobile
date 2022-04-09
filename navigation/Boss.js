
import React from 'react'
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index_boss from '../screens/Index_boss';
import Status_boss from '../screens/Status_boss';
import List_boss from '../screens/List_boss';
// import Listmoon_boss from '../screens/Listmoon_boss';
// import Report_boss from '../screens/Report_boss';
import Studlist_boss from '../screens/Studlist_boss';
import CustomDrawerContent from './CustomDrawerContent';
import Listnext_boss from '../screens/Listnext_boss';
// import Listmoonnext_boss from '../screens/Listmoonnext_boss';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function WithDrawer() {
    return (
        <Drawer.Navigator initialRouteName="Main" screenOptions={{
           headerShown:false, title:""
        }} drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Main" component={Index_boss} />
            <Drawer.Screen name="Status" component={Status_boss} />
            <Drawer.Screen name="List" component={List_boss} />
            {/* <Drawer.Screen name="Listmoon" component={Listmoon_boss} /> */}
            {/* <Drawer.Screen name="Report" component={Report_boss} /> */}
        </Drawer.Navigator>
    )
}
export default function Boss() {
    return (
        <NavigationContainer>
             <Stack.Navigator screenOptions={{
                headerShown:false,
                title:""
            }}>
                <Stack.Screen name="Index" component={WithDrawer} />
                <Stack.Screen name="Studlist" component={Studlist_boss} />
                <Stack.Screen name="Listnext" component={Listnext_boss} />
                {/* <Stack.Screen name="Listmoonnext" component={Listmoonnext_boss} /> */}

            </Stack.Navigator>
        </NavigationContainer>
    )
} 