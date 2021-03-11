import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { useField } from 'formik';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
    errorText: {
        marginTop: 5,
        color: 'red'
    },
});

const FormikDropdownPicker = ({ name, items, placeholder, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return (
        <>
            <DropDownPicker
                containerStyle={{ height: 40 }}
                dropDownMaxHeight={250}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                error={showError}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                items={items}
                onChangeItem={ field => helpers.setValue(field.value)}
                placeholder={placeholder}
                style={{ backgroundColor: '#fafafa' }}
                value={field.value}
                {...props}
            />
            {showError && <Text style={styles.errorText}>{meta.error}</Text>}
        </>
    );
};

export default FormikDropdownPicker;