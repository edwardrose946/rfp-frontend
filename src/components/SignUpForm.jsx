import * as yup from 'yup';
import { Alert, Button, View } from 'react-native';
import React, { useEffect } from 'react';
import { ADD_USER } from '../../graphql/mutations/addUser';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { styles } from '../styles/styles';
import { useMutation } from '@apollo/client';

const defaultValidationSchema = yup.object().shape({
    password: yup
        .string()
        .min(8)
        .max(50)
        .required('password is required'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'password confirmation must match password')
        .required('password confirmation is required'),
    username: yup
        .string()
        .min(1)
        .max(30)
        .required('username is required'),
});
const initialValues = {
    password: '',
    passwordConfirmation: '',
    username: '',
};
export const SignUpForm = ({ history, colors }) => {

    const [createUser, result] = useMutation(ADD_USER);

    useEffect(() => {
        if (result.called && !result.loading && result.data) {
            history.push('/');
            Alert.alert('Account created successfully', 'Please proceed to login');
        }
    });

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            await createUser({
                variables: {
                    password: password,
                    username: username,
                }
            });
        } catch (e) {
            Alert.alert('Error creating user.', 'Username probably already exists.');
        }
    };

    return (
        <SignUpFormContainer
            colors={colors}
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={defaultValidationSchema}
        />
    );
};

const SignUpFormContainer = ({ initialValues, onSubmit, validationSchema, colors }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) =>
                <SignInFields
                    colors={colors}
                    onSubmit={handleSubmit}
                />}
        </Formik>
    );
};
const SignInFields = ({ onSubmit, colors }) => {
    return (
        <View>
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
            <FormikTextInput
                name={'passwordConfirmation'}
                placeholder={'password confirmation'}
                secureTextEntry
                style={styles.formikTextInput}
            />
            <Button
                color={colors.primary}
                onPress={onSubmit}
                style={styles.button}
                title={'Submit'}
            />
        </View>
    );
};