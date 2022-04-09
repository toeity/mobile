import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Reqchildmore from '../screens/Reqchildmore';
import Reqchild from '../screens/Reqchild';
import Request from '../screens/Request';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

export default function Default() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='home' screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="home" component={Home} />
                <Stack.Screen name="Request" component={Request} />
                <Stack.Screen name="Reqchild" component={Reqchild} />
                <Stack.Screen name="Reqchildmore" component={Reqchildmore} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}