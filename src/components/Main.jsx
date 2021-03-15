import { Alert, Image, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-native';
import { AppBar } from './AppBar';
import { CustomMapView } from './CustomMapView';
import { SEARCH_FILTER_GET_DIRECTIONS } from '../../graphql/queries/searchFilterGetDirections';
import { SearchFilterDirectionsForm } from './SearchFilterDirectionsForm';
import { Separator } from './Separator';
import SignInForm from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../styles/styles';
import { useLazyQuery } from '@apollo/client';
import { useTheme } from 'react-native-paper';


export const Main = () => {

        //react router hooks
        const history = useHistory();

        //react native paper theme
        const { colors } = useTheme();

        //app state
        const [loggedIn, setLoggedIn] = useState(false);
        const [showLoadingScreen, setShowLoadingScreen] = useState(false);
        const [encodedRouteString, setEncodedRouteString] = useState('');
        const [addresses, setAddresses] = useState();
        const [currentQueryParams, setCurrentQueryParams] = useState({
            list: '',
            number: '',
            postcode: '',
            radius: ''
        });

        //graphQL state
        const [getDirections, result] = useLazyQuery(SEARCH_FILTER_GET_DIRECTIONS);

        useEffect(() => {
            if (result.called && !result.loading && result.data) {
                setShowLoadingScreen(false);
                const points = result.data.searchFilterGetDirections.EncodedPolyLine.points;
                setEncodedRouteString(points);
                const addresses = result.data.searchFilterGetDirections.addresses;
                setAddresses(addresses);
                history.push(`/route-map`);
            }
            if (result.error) {
                setShowLoadingScreen(false);
                Alert.alert('Something went wrong...', result.error.message);
            }
        }, [result]);

        return (
            <View>
                <StatusBar style="auto"/>
                <View style={styles.separator}/>
                <AppBar history={history} setLoggedIn={setLoggedIn} style={styles.appBar}/>
                <View style={styles.container}>
                    <Switch>
                        <Route exact path={'/'}>
                            {
                                loggedIn ?
                                    <SearchFilterDirectionsForm
                                        colors={colors}
                                        currentQueryParams={currentQueryParams}
                                        getDirections={getDirections}
                                        setCurrentQueryParams={setCurrentQueryParams}
                                        setShowLoadingScreen={setShowLoadingScreen}
                                        showLoadingScreen={showLoadingScreen}
                                    />
                                    :
                                    <SignInForm
                                        colors={colors}
                                        history={history}
                                        setLoggedIn={setLoggedIn}
                                    />
                            }
                            <Separator/>
                            <Image
                                source={require('../../assets/rfp-logo.png')}
                                style={styles.logo}
                            />

                        </Route>
                        <Route path={'/route-map'}>
                            <CustomMapView
                                addresses={addresses}
                                currentQueryParams={currentQueryParams}
                                encodedRouteString={encodedRouteString}
                            />
                        </Route>
                        <Route path={'/create-account'}>
                            <SignUpForm
                                colors={colors}
                                history={history}
                            />
                            <Separator/>
                            <Image
                                source={require('../../assets/rfp-logo.png')}
                                style={styles.logo}
                            />
                        </Route>
                    </Switch>
                </View>
            </View>);
    }
;

