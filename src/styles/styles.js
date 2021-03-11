import { Dimensions, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
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
    map: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    separator: {
        margin: Constants.statusBarHeight
    }
});
