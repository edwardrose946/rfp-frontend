import { Appbar } from 'react-native-paper';
import React from 'react';

export const AppBar = ({ history }) => {

    const pushHomePage = () => {
        history.push('/');
    };

    return (
            <Appbar>
                <Appbar.Action
                    icon={'home'}
                    onPress={pushHomePage}
                />
                <Appbar.Action
                    icon={'logout'}
                    onPress={() => console.log('pressed logout')}
                />
            </Appbar>
    );
};