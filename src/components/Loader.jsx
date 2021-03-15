import { ActivityIndicator, useTheme } from 'react-native-paper';
import { Modal, Text, View } from 'react-native';
import React from 'react';
import { styles } from '../styles/styles';

export const Loader = ({ loading }) => {

    const { colors } = useTheme();

    return (
        <Modal
            animationType={'none'}
            transparent={true}
            visible={loading}
        >
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        animating={true}
                        color={colors.primary}
                        size={'large'}
                    />
                    <Text>
                        Loading...
                    </Text>
                </View>
            </View>
        </Modal>
    );
};