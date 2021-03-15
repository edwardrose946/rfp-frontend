import { useApolloClient, useMutation } from '@apollo/client';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { LOGIN } from '../../graphql/mutations/login';
import { useContext } from 'react';

export const useLogIn = () => {

    const authStorage = useContext(AuthStorageContext);
    const client = useApolloClient();

    const [getToken, result] = useMutation(LOGIN);

    const logIn = async ({ username, password }) => {
        const { data } = await getToken({
            variables: {
                password,
                username
            }
        });
        await authStorage.setAccessToken(`Bearer ${data.login.value}`);
        await client.resetStore();

    };

    return [logIn, result];
};