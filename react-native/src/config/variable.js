import { Dimensions, Platform } from 'react-native';


export const COLORS = {
    primaryGreen: '#23994c',//'#2eb1cf',
    primaryBlue: '#2E3E5C',
    white: '#ffffff',
    hover:"#ededed",
    darkBlue:"#171F2E",
    primaryGray: '#B8C5E6',
    placeholderTextColor: '#AAB2BE',
    lightYellow:"#e0c23d",
    lightBlue:'#234499',
    black: '#000000',
    starYellowColor:'#FC9029',
    grayShadow:'#CCCCCC',
    darkOrange:"#916326",
    lightOrange:"#a18f48",
    orange:'#FC9029',
    red:'#EB5757'
};




export const Screen = {
    W: Math.round(Dimensions.get('window').width),
    H: Math.round(Dimensions.get('window').height),
};

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';