import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import AuthStorage from './authStorage';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';


export const authStorage = new AuthStorage();
const httpLink = new HttpLink({
    uri: Constants.manifest.extra.APOLLO_URI
});
const authLink = setContext(async (_, { headers }) => {

    const accessToken = await authStorage.getAccessToken();
    return {
        headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : ``
        }
    };
});
export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});