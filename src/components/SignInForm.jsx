import * as yup from 'yup';
import { Alert, Button, View } from 'react-native';
import React, { useEffect } from 'react';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { Separator } from './Separator';
import { styles } from '../styles/styles';
import { useLogIn } from '../hooks/useLogIn';

const defaultValidationSchema = yup.object().shape({
    password: yup
        .string()
        .min(8, 'Password must be 8 characters or longer')
        .required('Password is required'),
    username: yup
        .string()
        .min(5, 'Username must be longer than 5 characters')
        .required('Username is required')
});

const initialValues = {
    password: '',
    username: '',
};

const SignInFields = ({ onSubmit, history, colors }) => {


    return (
        <View style={{ padding: 10 }}>
            <FormikTextInput
                name={'username'}
                placeholder={'username'}
                style={styles.formikTextInput}
            />
            <FormikTextInput
                name={'password'}
                placeholder={'password'}
                secureTextEntry
                style={styles.formikTextInput}
            />
            <Button
                color={colors.primary}
                onPress={onSubmit}
                style={styles.button}
                testID={'signInFieldsButton'}
                title={'sign in'}
            />
            <Separator/>
            <Button
                color={colors.primary}
                onPress={() => history.push('/create-account')}
                style={styles.button}
                title={'create account'}
            />
        </View>
    );
};

export const SignInContainer = ({ onSubmit, initialValues, validationSchema, history, colors }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) =>
                <SignInFields
                    colors={colors}
                    history={history}
                    onSubmit={handleSubmit}
                />
            }
        </Formik>);
};

const SignInForm = ({ setLoggedIn, history, colors }) => {

    const [signIn, result] = useLogIn();

    useEffect(() => {
        if (!result.waiting && result.called && result.data) {
            if (result.data.login.value !== '') {
                setLoggedIn(true);
            }
        }
    }, [result]);

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            await signIn({
                password,
                username,
            });
        } catch (e) {
            console.log(e.message);
            Alert.alert('Invalid login credentials', e.message, [
                { cancelable: false }
            ]);
        }
    };

    return (

        <SignInContainer
            colors={colors}
            history={history}
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={defaultValidationSchema}
        />


    );
};

export default SignInForm;