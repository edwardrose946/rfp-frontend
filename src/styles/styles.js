import { Dimensions, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
    activityIndicatorWrapper: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        display: 'flex',
        height: 200,
        justifyContent: 'space-around',
        width: 200,
    },
    appBar: {
        position: 'absolute'
    },
    button: {
        flexGrow: 1
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    formikTextInput: {
        borderColor: '#426b56',
        borderRadius: 5,
        borderWidth: 1.0,
        margin: 10,
        minWidth: 150,
        padding: 10
    },
    logo: {
        flexGrow: 2,
        height: 150,
        marginLeft: 'auto',
        marginRight: 'auto',
        resizeMode: 'center',
        width: 150
    },
    lottie: {
        height: 100,
        width: 100
    },
    map: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    modalBackground: {
        alignItems: 'center',
        backgroundColor: '#00000040',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    separator: {
        margin: Constants.statusBarHeight
    }
});
