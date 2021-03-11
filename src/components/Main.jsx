import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
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

        const history = useHistory();
        const { colors } = useTheme();
        const [loggedIn, setLoggedIn] = useState(false);
        const [encodedRouteString, setEncodedRouteString] = useState('');
        const [addresses, setAddresses] = useState();
        const [getDirections, result] = useLazyQuery(SEARCH_FILTER_GET_DIRECTIONS);


        useEffect(() => {
            if (result.called && !result.loading && result.data) {
                const points = result.data.searchFilterGetDirections.EncodedPolyLine.points;
                setEncodedRouteString(points);
                const addresses = result.data.searchFilterGetDirections.addresses;
                setAddresses(addresses);
                history.push(`/route-map`);
            }
        }, [result]);

        return (
            <View>
                <StatusBar style="auto"/>
                <View style={styles.separator}/>
                <AppBar history={history} style={styles.appBar}/>
                <View style={styles.container}>
                    <Switch>
                        <Route exact path={'/'}>
                            {
                                loggedIn ?
                                    <SearchFilterDirectionsForm
                                        colors={colors}
                                        getDirections={getDirections}
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

