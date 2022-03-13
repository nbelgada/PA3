import { StyleSheet } from 'react-native';
import { COLORS } from './variable';

export const GlobalStyles = StyleSheet.create({
    safeAreaViewStyle: {
        flex: 1,
        paddingBottom: 25, 
        backgroundColor: COLORS.white,
    },
    shadowDown:{
        shadowColor:COLORS.grayShadow,shadowOpacity:1, shadowOffset:{width:0, height:-50},shadowRadius: 5,elevation: 5,
    },
    bottomLine: {
        //borderWidth: 0.5,
        borderBottomWidth: 0.7,
        borderColor: COLORS.primaryGray,
        //marginTop: 10,
    },
    circle: {
        height: 20,
        width: 20,
        margin:3.1,
        borderRadius: 10,
        alignSelf:"center",
        borderWidth: 1,
        borderColor: COLORS.primaryGray
    },
    
    headerTextStyle: {
        fontSize: 22,
        textAlignVertical: "center",
        fontWeight: '600',
        color: COLORS.primaryBlue
    },
    contentContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    container: {
        marginHorizontal: 15,
        marginBottom: 40
    },
    textStyle: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.primaryBlue
    },
    headerStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textStyleBig: {
        fontSize: 20,
        fontWeight: '500',
        color: COLORS.primaryBlue
    },
    justifyContentCenter: {
        justifyContent: 'center'
    },
    alignItemsCenter: {
        alignItems: 'center',
    },
    flexDirectionRow: {
        flexDirection: 'row'
    },
    flexDirectionColumn: {
        flexDirection: 'column'
    },
})