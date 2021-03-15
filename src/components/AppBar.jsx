import React, { useContext } from 'react';
import { animated, useSpring } from 'react-spring';
import { Appbar } from 'react-native-paper';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { View } from 'react-native';
import { useApolloClient } from '@apollo/client';

export const AppBar = ({ history, setLoggedIn }) => {

    const authStorage = useContext(AuthStorageContext);
    const client = useApolloClient();

    const pushHomePage = () => {
        history.push('/');
    };

    const logout = async () => {
        setLoggedIn(false);
        history.push('/');
        await authStorage.removeAccessToken();
        await client.resetStore();
    };

    const props = useSpring({
        from: {
            marginTop: -500,
            opacity: 0
        },
        marginTop: 0,
        opacity: 1
    });

    const AnimatedView = animated(View);

    return (
        <AnimatedView style={props}>
            <Appbar>
                <Appbar.Action
                    icon={'home'}
                    onPress={pushHomePage}
                />
                <Appbar.Action
                    icon={'logout'}
                    onPress={logout}
                />
            </Appbar>
        </AnimatedView>

    );
};