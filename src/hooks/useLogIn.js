import { useContext } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { LOGIN } from '../../graphql/mutations/login';

export const useLogIn = () => {

    const authStorage = useContext(AuthStorageContext);
    const client = useApolloClient();

    const [getToken, result] = useMutation(LOGIN);

    const logIn = async ({ username, password }) => {
        const { data } = await getToken({ variables: { username, password } });
        await authStorage.setAccessToken(`Bearer ${data.login.value}`);
        await client.resetStore();
    };

    return [logIn, result];
};