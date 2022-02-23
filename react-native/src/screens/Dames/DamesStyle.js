
import { StyleSheet } from 'react-native';
import { COLORS } from '../../config/variable';

export const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        marginHorizontal: 15,
        //marginTop: 30
    },
    headerStyle: {
        alignItems: 'center',
    },
    welcomeBackStyle: {
        fontWeight: '700',
        fontSize: 22,
        color: COLORS.primaryBlue
    },
    enterAccountStyle: {
        fontWeight: '400',
        fontSize: 14,
        color: '#AAB2BE',
    },
    mainInputStyle: {
        marginTop: 50,
        alignItems: 'center'
    },
    inputTextViewStyle: {
        flexDirection: 'row',
    },
    inputBoxStyle: {
        flex: 1,
        height: 50,
        marginVertical: 12,
        color: COLORS.black,
        fontWeight: '400',
        fontSize: 14,
        borderColor: '#bec7d3',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    forgotPasswordStyle: {
        alignSelf: 'flex-end',
    },
    logoIcon: {
        paddingHorizontal: 10,
        color: COLORS.primaryBlue,
        fontSize: 20,
        position: 'absolute',
        alignSelf: 'center'
    },
    eyeIcon: {
        paddingHorizontal: 10,
        color: '#AAB2BE',
        fontSize: 20,
        position: 'absolute',
        right: 2,
        alignSelf: 'center'
    },
    submitButton: {
        paddingVertical: 10,
        backgroundColor: COLORS.primaryGreen,
        borderRadius: 12,
        height: 50,
        width: '100%',
        marginVertical: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hostSubmitButton: {
        paddingVertical: 10,
        backgroundColor: COLORS.primaryGreen,
        borderRadius: 12,
        height: 50,
        width: '100%',
        marginTop: -20,
        marginBottom:30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextStyle: {
        color: COLORS.white,
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 16,
    },
    socialLogoMainViewStyle: {
        width: '100%',
        marginVertical: 30,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    socialLogoViewStyle: {
        borderWidth: 1,
        borderColor: COLORS.primaryGray,
        borderRadius: 10,
        width: 80,
        height: 50,
        justifyContent: 'center',
    },
    socialIcon: {
        alignSelf: 'center',
        fontSize: 24,
        color: '#1976F2'
    },
    socialIconImageStyle: {
        alignSelf: 'center',
        height: 20,
        width: 20
    }
})