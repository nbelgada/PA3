import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS } from './config/variable';
import TicTacToe from './screens/TicTacToe/TicTacToe';
import MainMenu from './screens/MainMenu/MainMenu';
import Puissance4 from './screens/Puissance4/Puissance4';
import Dames from './screens/Dames/Dames';



// const Tab = createBottomTabNavigator();
// const TabRoutes = () => {
//     // global.currentMode = "Client";
//     return (

//         <Tab.Navigator
//             screenOptions={({ route }) => ({
//                 tabBarHideOnKeyboard: true,
//                 tabBarStyle: {
//                     display: 'flex',//{visible ? 'flex' : 'none'},
//                     position: 'absolute',
//                     height: 60,
//                     paddingTop: 5,
//                     paddingBottom: Platform.OS == 'ios' ? 20 : 5,
//                     borderTopColor: COLORS.grayShadow,
//                     backgroundColor:COLORS.white,
//                     borderTopWidth: 0.2,
//                 },
//                 tabBarShowLabel: false,
//                 tabBarIcon: ({ focused, color }) => {
//                     let iconName;
//                     if (route.name === 'Home') {
//                         iconName = focused ? 'home' : 'home-outline';
//                     } else if (route.name === 'Favourite') {
//                         iconName = focused ? 'heart' : 'heart-outline';
//                     } else if (route.name === 'Search') {
//                         iconName = focused ? 'search' : 'search-outline';
//                     } else if (route.name === 'Inbox') {
//                         iconName = focused ? 'mail' : 'mail-outline';
//                     } else if (route.name === 'Profile') {
//                         iconName = focused ? 'person' : 'person-outline';
//                     }

//                     return <Icon name={iconName} size={30} color={color} style={{padding:10}} />;
//                 },
//                 tabBarActiveTintColor: COLORS.primaryGreen,
//                 tabBarInactiveTintColor: COLORS.primaryGray,
//             })}
//         >
//             <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//             <Tab.Screen name="Favourite" component={FavoriteScreen} options={{ headerShown: false }} />
//             <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
//             <Tab.Screen name="Inbox" component={InboxScreen} options={{ headerShown: false }} />
//             <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
//         </Tab.Navigator>
//     );
// }

// const HostTabRoutes = () => {
//     global.currentMode = "Host";
//     return (

//         <Tab.Navigator
//             screenOptions={({ route }) => ({
//                 tabBarHideOnKeyboard: true,
//                 tabBarStyle: {
//                     display: 'flex',//{visible ? 'flex' : 'none'},
//                     position: 'absolute',
//                     height: 60,
//                     paddingTop: 5,
//                     paddingBottom: Platform.OS == 'ios' ? 20 : 5,
//                     borderTopColor: COLORS.grayShadow,
//                     backgroundColor:COLORS.white,
//                     borderTopWidth: 0.2,
//                 },
//                 tabBarShowLabel: false,
//                 tabBarIcon: ({ focused, color }) => {
//                     let iconName;
//                     if (route.name === 'HostHomeScreen') {
//                         iconName = focused ? 'home' : 'home-outline';
//                     } else if (route.name === 'Booking') {
//                         iconName = focused ? 'calendar-check' : 'calendar-check-outline';
//                     } else if (route.name === 'Calendar') {
//                         iconName = focused ? 'calendar-month' : 'calendar-month-outline';
//                     } else if (route.name === 'Inbox') {
//                         iconName = focused ? 'mail' : 'mail-outline';
//                     } else if (route.name === 'Profile') {
//                         iconName = focused ? 'person' : 'person-outline';
//                     }
//                     if (route.name === 'Booking' || route.name === 'Calendar') {
//                         return <MaterialCommunityIcons name={iconName} size={30} color={color} />
//                     }
//                     else {
//                         return <Icon name={iconName} size={30} color={color} style={{padding:10}} />;
//                     }
//                 },
//                 tabBarActiveTintColor: COLORS.primaryGreen,
//                 tabBarInactiveTintColor: COLORS.primaryGray,
//             })}
//         >
//             <Tab.Screen name="HostHomeScreen" component={HostHomeScreen} options={{ headerShown: false }} />
//             <Tab.Screen name="Booking" component={BookingScreen} options={{ headerShown: false }} />
//             <Tab.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }} />
//             <Tab.Screen name="Inbox" component={InboxScreen} options={{ headerShown: false }} />
//             <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
//         </Tab.Navigator>
//     );
// }


const Stack = createNativeStackNavigator();
const StackRoutes = () => {
    return (
        <Stack.Navigator
            initialRouteName="MainMenu"
            screenOptions={() => ({
                headerShown: false,
                gestureEnabled: false,
            })}
            
            >
            {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}
            <Stack.Screen name="MainMenu" component={MainMenu} options={{ headerShown: false }} />
            <Stack.Screen name="TicTacToe" component={TicTacToe} options={{ headerShown: false }} />
            <Stack.Screen name="Puissance4" component={Puissance4} options={{ headerShown: false }} />
            <Stack.Screen name="Dames" component={Dames} options={{ headerShown: false }} />

        </Stack.Navigator>
    )
}

const MainStack = createNativeStackNavigator();
const Navigator = () => {

    // useEffect(() => {
    //     let timeOutHandle = setTimeout(() => {
    //         SplashScreen.hide();
    //     }, 2000)
    //     return () => {
    //         clearTimeout(timeOutHandle);
    //     };
    // })

    return (
        <NavigationContainer>
            <MainStack.Navigator screenOptions={() => ({
                headerShown: false,
                gestureEnabled: false,//ios
            })}
            
            
            >
                <MainStack.Screen name="StackRoutes" component={StackRoutes} options={{ headerShown: false }} />
                {/* <MainStack.Screen name="TicTacToe" component={TicTacToe} options={{ headerShown: false }} /> */}

            </MainStack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator