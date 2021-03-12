import * as yup from 'yup';
import { Button, View } from 'react-native';
import { Formik } from 'formik';
import FormikDropdownPicker from './FormikDropdownPicker';
import FormikTextInput from './FormikTextInput';
import React from 'react';
import { styles } from '../styles/styles';
import { Loader } from './Loader';


const defaultValidationSchema = yup.object().shape({
    list: yup
        .string()
        .typeError('Must be a string')
        .required('Property List is required'),
    number: yup
        .number()
        .typeError('Must be a number / no spaces !')
        .integer('Number of results must be an integer')
        .min(10, 'Number of results must be between 10 - 100')
        .max(100, 'Number of results must be between 10 - 100')
        .required('Number of results is required'),
    postcode: yup
        .string()
        .typeError('Must be a string')
        .required('Starting Postcode is required'),
    radius: yup
        .number()
        .integer()
        .typeError('Must be a whole number / no spaces !')
        .min(0, 'Radius must be between 0 - 100')
        .max(100, 'Radius must be between 0 - 100')
        .required('Radius is required'),
});

const InputFields = ({ onSubmit, colors }) => {

    return (
        <View>
            <FormikTextInput
                name={'postcode'}
                placeholder={'starting postcode'}
                style={styles.formikTextInput}
            />

            <FormikDropdownPicker
                items={[
                    { label: 'repossessed-properties', value: 'repossessed-properties' },
                    { label: 'unmodernised-properties', value: 'unmodernised-properties' },
                    { label: 'cash-buyers-only-properties', value: 'cash-buyers-only-properties' },
                    { label: 'auction-properties', value: 'auction-properties' },
                    { label: 'quick-sale-properties', value: 'quick-sale-properties' },
                    { label: 'land-plots-for-sale', value: 'land-plots-for-sale' },
                    { label: 'new-build-properties', value: 'new-build-properties' },
                    { label: 'hmo-licenced-properties', value: 'hmo-licenced-properties' },
                    { label: 'reduced-properties', value: 'reduced-properties' },
                    { label: 'investment-portfolios', value: 'investment-portfolios' },
                    { label: 'back-on-market', value: 'back-on-market' },
                    { label: 'slow-to-sell-properties', value: 'slow-to-sell-properties' },
                    { label: 'georgian-houses', value: 'georgian-houses' },
                    { label: 'holiday-let-properties', value: 'holiday-let-properties' },
                    { label: 'properties-in-growth-zones', value: 'properties-in-growth-zones' },
                    { label: 'high-yield-properties', value: 'high-yield-properties' },
                    { label: 'tenanted-properties-for-sale', value: 'tenanted-properties-for-sale' },
                    { label: 'properties-with-good-views', value: 'properties-with-good-views' },
                    { label: 'properties-near-great-school', value: 'properties-near-great-school' },
                    { label: 'properties-with-no-chain', value: 'properties-with-no-chain' },
                    { label: 'properties-with-planning-granted', value: 'properties-with-planning-granted' },
                    { label: 'properties-near-a-university', value: 'properties-near-a-university' },
                    { label: 'properties-with-an-annexe', value: 'properties-with-an-annexe' },
                    { label: 'large-properties', value: 'large-properties' },
                ]}
                name={'list'}
                placeholder={'select property list'}
            />

            <FormikTextInput
                name={'radius'}
                placeholder={'search radius'}
                style={styles.formikTextInput}
            />

            <FormikTextInput
                name={'number'}
                placeholder={'number of results to filter from'}
                style={styles.formikTextInput}
            />

            <View style={{ zIndex: -5 }}>
                <Button
                    color={colors.primary}
                    onPress={() => onSubmit()}
                    testID={'searchFilterGetDirectionsButton'}
                    title={'get directions'}
                />
            </View>
        </View>
    );
};
const SearchFilterDirectionsFormContainer = ({
                                                 colors,
                                                 initialValues,
                                                 onSubmit,
                                                 validationSchema
                                             }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <InputFields
                colors={colors}
                onSubmit={handleSubmit}
            />}
        </Formik>
    );
};
export const SearchFilterDirectionsForm = ({ getDirections, colors, showLoadingScreen, setShowLoadingScreen }) => {

    const onSubmit = async (values) => {
        setShowLoadingScreen(true);
        const { postcode, list, radius, number } = values;
        try {
            await getDirections({
                variables: {
                    list: list,
                    postcode: postcode,
                    radius: radius.toString(),
                    results: number.toString()
                }
            });
        } catch (e) {
            console.log('error getting directions', e);
        }
    };

    const initialValues = {
        list: '',
        number: '',
        postcode: 'WA60PT',
        radius: '',
    };

    return (
        <View>
            <Loader
                loading={showLoadingScreen}
            />
            <SearchFilterDirectionsFormContainer
                colors={colors}
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={defaultValidationSchema}
            />
        </View>
    );

};