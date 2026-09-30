import {View, Image, Text} from 'react-native'
import {useSafeAreaInsets} from "react-native-safe-area-context";
import clsx from "clsx";
import {Tabs} from "expo-router";
import {colors, components} from "@/constants/theme";
import {tabs} from "@/constants/data";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';


const TabLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="index" key='index' options={{
                title: new Date().toLocaleDateString('en-AU', { month: 'long', year: 'numeric' }),
                headerTitleAlign: 'center',
                tabBarShowLabel: true,
                tabBarLabel: ({focused}) => (
                    <Text style={{color: focused ? colors.blue : "grey", fontSize: 10}}>Home</Text>
                ),
                tabBarIcon: ({focused}) => (
                    <Ionicons name="home" size={25} color={focused ? colors.blue : "grey"} />
                )
            }}/>
            <Tabs.Screen name="tracking" key='tracking' options={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarLabel: ({focused}) => (
                    <Text style={{color: focused ? colors.blue : "grey", fontSize: 10}}>Tracking</Text>
                ),
                tabBarIcon: ({focused}) => (
                    <MaterialIcons name="notes" size={25} color={focused ? colors.blue : "grey"}/>
                )
            }}/>
            <Tabs.Screen name="statistics" key='statistics' options={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarLabel: ({focused}) => (
                    <Text style={{color: focused ? colors.blue : "grey", fontSize: 10}}>Statistics</Text>
                ),
                tabBarIcon: ({focused}) => (
                    <Entypo name="bar-graph" size={25} color={focused ? colors.blue : "grey"} />
                )
            }}/>
            <Tabs.Screen name="settings" key='settings' options={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarLabel: ({focused}) => (
                    <Text style={{color: focused ? colors.blue : "grey", fontSize: 10}}>Settings</Text>
                ),
                tabBarIcon: ({focused}) => (
                    <Feather name="settings" size={25} color={focused ? colors.blue : "grey"} />
                )
            }}/>
        </Tabs>
    )
}

export default TabLayout
