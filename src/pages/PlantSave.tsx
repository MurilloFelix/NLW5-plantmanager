import React, { useState } from 'react'
import { StyleSheet, Alert, Text, View, Image, ScrollView, Platform, TouchableOpacity, TouchableOpacityBase } from 'react-native'
import { SvgFromUri } from 'react-native-svg'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { useNavigation, useRoute } from '@react-navigation/core'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { format, isBefore } from 'date-fns'
import { loadPlant, PlantsProps, savePlant } from '../libs/storage'

import { Button } from '../components/Button'

import fonts from '../style/fonts'
import colors from '../style/colors'
import waterDrop from '../assets/waterdrop.png';

interface Params {
    plant: PlantsProps
}

export function PlantSave() {
    const [selectedDataTime, setSelectedDataTime] = useState(new Date());
    const [showDataPicker, setShowDataPicker] = useState(Platform.OS == 'ios')

    const route = useRoute();
    const { plant } = route.params as Params

    const navigation = useNavigation();

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === 'android') {
            setShowDataPicker(oldState => !oldState)
        }

        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDataTime(new Date());
            return Alert.alert('Ecolha uma hora no futuro! ⏰')
        }

        if (dateTime)
            setSelectedDataTime(dateTime)
    }

    function handleOpenDateTimePickerForAndroid() {
        setShowDataPicker(oldState => !oldState);
    }

    async function handleSave() {
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDataTime
            });

            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                subtitle: 'Fique tranquilo que vamos lembrar você de cuidar de suas plantas com cuidado',
                buttonTitle: 'Muito obrigado',
                icon: 'hug',
                nextScreen: 'MyPlants'
            });
        } catch {
            return Alert.alert('Erro ao salvar!');
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.plantInfo}>
                    <SvgFromUri
                        uri={plant.photo}
                        height={150}
                        width={150}
                    />
                    <Text style={styles.plantName}>
                        {plant.name}
                    </Text>
                    <Text style={styles.plantAbout}>
                        {plant.about}
                    </Text>
                </View>
                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image source={waterDrop} style={styles.tipImage} />
                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>
                    <Text style={styles.alertLabel}>
                        Escolha o melhor horário para ser lembrado
                </Text>

                    {
                        showDataPicker &&
                        <DateTimePicker
                            value={selectedDataTime}
                            mode='time'
                            display="spinner"
                            onChange={handleChangeTime}
                        />
                    }

                    {
                        Platform.OS == 'android' && (
                            <TouchableOpacity
                                style={styles.dateTimePickerButton}
                                onPress={handleOpenDateTimePickerForAndroid}
                            >
                                <Text style={styles.dateTimePickerText}>
                                    {`Mudar Horário ${format(selectedDataTime, 'HH:mm')}`}
                                </Text>
                            </TouchableOpacity>

                        )
                    }

                    <Button
                        title='Cadastrar planta'
                        onPress={handleSave}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },

    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },

    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
    },

    plantName: {
        textAlign: 'center',
        fontFamily: fonts.heading,
        fontSize: 14,
        color: colors.heading,
        marginTop: 15
    },

    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },

    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },

    tipImage: {
        width: 56,
        height: 56
    },

    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },

    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },

    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },

    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    }
});
