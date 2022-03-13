import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { GlobalStyles } from '../../config/GlobalStyles';
import { styles } from './MainMenuStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS, isAndroid } from '../../config/variable';
// import changeNavigationBarColor, { hideNavigationBar } from 'react-native-navigation-bar-color';
// import { useApiAuth, useApiUser } from '../../../api/users';
// import { getAllState, getStore } from '../../../redux/selectors';
// import { useSelector, useDispatch } from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';//AsyncStorage.setItem('token', response.data)
// import {setTokenFromLocal, setUserFromLocal} from "../../../redux/actions";



// const googleLogoImage = require('../../../assets/images/google-logo/google-logo.png');
// const appleLogoImage = require('../../../assets/images/apple-logo/apple-logo.png');

const MainMenu = ({ navigation }) => {

  
    const goToTicTacToe = async () => {
        //tmp --- testing ---

        navigation.navigate('TicTacToe')
        return;
        
    }
    // const goToPuissance4 = () => {
    //     navigation.navigate('Puissance4')
    //     return;
    // }
    const goToDames = () => {
        navigation.navigate('Dames')
        return;
    }

    // useEffect(() => {
    //     hideNavigationBar();
    //     changeNavigationBarColor('white');
    //     changeNavigationBarColor('transparent', true);
    // })

    return (
        < SafeAreaView style={GlobalStyles.safeAreaViewStyle} >
            <ScrollView contentContainerStyle={GlobalStyles.contentContainer}
                keyboardShouldPersistTaps='handled'
            >
                <View style={styles.mainContainer}>
                    <View style={[styles.headerStyle, {marginTop:50}]}>
                        <View>
                            <Text style={styles.welcomeBackStyle}>Welcome</Text>
                        </View>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={styles.enterAccountStyle}>Choose your Game</Text>
                        </View>
                    </View>
                    <View style={[styles.mainInputStyle, {borderWidth:1, borderColor:COLORS.primaryGray, borderRadius:30, padding:20, paddingHorizontal:60}]}>
                        {/* <View style={{marginVertical:10}}>
                            <Text style={{color:COLORS.red, fontWeight:"500"}}>{errorMessage}</Text>
                        </View> */}
                            
                        <TouchableOpacity style={[styles.submitButton, {backgroundColor: COLORS.primaryGreen,}]} onPress={goToTicTacToe}>
                            <Text style={styles.buttonTextStyle}>TicTacToe</Text>
                        </TouchableOpacity>
                        
                        {/* <TouchableOpacity style={[styles.submitButton, {backgroundColor: COLORS.starYellowColor,}]} onPress={goToPuissance4}>
                            <Text style={styles.buttonTextStyle}>Puissance4</Text>
                        </TouchableOpacity> */}
                        
                        <TouchableOpacity style={[styles.submitButton, {backgroundColor: COLORS.darkBlue,}]} onPress={goToDames}>
                            <Text style={styles.buttonTextStyle}>Dames</Text>
                        </TouchableOpacity>
                    </View>
                    
                    
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default MainMenu