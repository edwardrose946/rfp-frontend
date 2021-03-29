import MapView, { Marker, Polyline } from 'react-native-maps';
import { Text, TouchableOpacity, View } from 'react-native';
import { PolyUtil } from 'node-geometry-library';
import React from 'react';
import { styles } from '../styles/styles';
import { useTheme } from 'react-native-paper';

export const CustomMapView = ({ encodedRouteString, addresses, currentQueryParams }) => {

    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            {encodedRouteString !== '' ?
                <View>
                    <MapView
                        initialRegion={{
                            latitude: 53.2776,
                            latitudeDelta: 1,
                            longitude: -2.7636,
                            longitudeDelta: 0.04
                        }}
                        style={styles.map}
                        toolbarEnabled
                    >
                        <Polyline
                            coordinates={PolyUtil.decode(encodedRouteString).map(object => {
                                return {
                                    latitude: Number(object.lat),
                                    longitude: Number(object.lng),
                                };
                            })}
                            strokeColor={colors.primary}
                            strokeWidth={1.5}
                        />
                        {
                            addresses.map(address => {
                                return (
                                    <Marker
                                        coordinate={
                                            {
                                                latitude: Number(address.LatLng.lat),
                                                longitude: Number(address.LatLng.lng)
                                            }
                                        }
                                        description={address.postcode}
                                        key={`${address.LatLng.lat} ${address.LatLng.lng} ${address.firstLine}`}
                                        title={address.firstLine}
                                    />);
                            })
                        }
                        <Marker
                            coordinate={{
                                latitude: 53.2776,
                                longitude: -2.7636
                            }}
                            description={'WA6 0PT'}
                            title={'Home'}
                        />
                    </MapView>
                    <TouchableOpacity style={styles.touchableOpacity}>
                        <Text>Query Parameters: </Text>
                        <Text style={{ color: colors.secondary }}>{currentQueryParams.postcode}</Text>
                        <Text style={{ color: colors.secondary }}>{currentQueryParams.list}</Text>
                        <Text style={{ color: colors.secondary }}>{currentQueryParams.radius} miles radius</Text>
                    </TouchableOpacity>
                </View>
                :
                null}
        </View>);
};

