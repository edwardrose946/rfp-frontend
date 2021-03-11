import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';

const styles = StyleSheet.create({
    errorText: {
        marginTop: 5,
        color: 'red'
    },
});

const FormikTextInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return (
        <>
            <TextInput
                error={showError}
                onBlur={() => helpers.setTouched(true)}
                onChangeText={value => helpers.setValue(value)}
                value={field.value}
                {...props}
            />
            {showError && <Text style={styles.errorText}>{meta.error}</Text>}
        </>
    );
};

export default FormikTextInput;