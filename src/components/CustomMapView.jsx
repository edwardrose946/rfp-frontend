import MapView, { Marker, Polyline } from 'react-native-maps';
import { PolyUtil } from 'node-geometry-library';
import React from 'react';
import { View } from 'react-native';
import { styles } from '../styles/styles';

export const CustomMapView = ({ encodedRouteString, addresses }) => {
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
                            })}/>
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
                                        key={`${address.LatLng.lat} ${address.LatLng.lng}`}
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

                </View>
                :
                null}
        </View>);
};

