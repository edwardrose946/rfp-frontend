import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { authStorage, client } from './src/utils/apolloClient';
import { ApolloProvider } from '@apollo/client';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import { Main } from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import React from 'react';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        accent: '#FFFFFF',
        primary: '#426b56',
    }
};

const App = () => {

    return (
        <NativeRouter>
            <ApolloProvider client={client}>
                <AuthStorageContext.Provider value={authStorage}>
                    <PaperProvider theme={theme}>
                        <Main/>
                    </PaperProvider>
                </AuthStorageContext.Provider>
            </ApolloProvider>
        </NativeRouter>
    );
};

export default App;

