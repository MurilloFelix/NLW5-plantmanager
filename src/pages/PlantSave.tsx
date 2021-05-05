import React from 'react'
import {StyleSheet, Alert, Text, View, Image, ScrollView, Platform, TouchableOpacity} from 'react-native'
import { SvgFromUri } from 'react-native-svg'
import { getBottomSpace } from 'react-native-iphone-x-helper'

import { Button } from '../components/Button'

import fonts from '../style/fonts'
import colors from '../style/colors'
import waterDrop from '../assets/waterdrop.png';

export function PlantSave(){
    return(
        <View style={styles.container}>
            <View style={styles.plantInfo}>
                {/* <SvgFromUri
                    uri={}
                    height={150}
                    width={150}
                    /> */}
                <Text style={styles.plantNama}>
                        Nome da planta
                </Text>
                <Text style={styles.plantAbout}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius magnam ad nisi veniam cum fuga unde fugiat perferendis atque sint officia commodi,
                    possimus deleniti. Maiores sapiente perferendis unde modi repellendus!
                </Text>
            </View>
            <View style={styles.controller}>
                <View style={styles.tipContainer}>
                    <Image source={waterDrop} style={styles.tipImage}/>
                    <Text style={styles.tipText}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, ipsam in. Officia 
                        ut mollitia tempora est magnam culpa eaque esse odio doloribus, vitae aliquam ratione quidem voluptatem eveniet asperiores nobis!
                    </Text>
                </View>
                <Text style={styles.alertLabel}>
                    Escolha o melhor horário para ser lembrado
                </Text>
                <Button
                    title='Cadastrar planta'
                    onPress={() =>{}} 
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,

    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    controller:{   
        backgroundColor: colors.white,
        paddingHorizontal:20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
    },
    plantNama:{
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15 
    },
    plantAbout:{
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    tipContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20
    },
    tipImage:{
        width: 56,
        height: 56
    },
    tipText:{   
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel:{
        textAlign: 'center',
        fontFamily: fonts.complement,
        color:colors.heading,
        fontSize: 12,
        marginBottom: 5
    }
})
