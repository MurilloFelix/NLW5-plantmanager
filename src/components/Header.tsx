import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import colors from '../style/colors'
import userImg from '../assets/user.png'
import fonts from '../style/fonts'

export function Header(){
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>Murillo</Text>
            </View>

            <Image source={userImg} style={styles.image}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight()
    },
    image:{
        width: 80,
        height: 80,
        borderRadius: 40
    },
    greeting:{
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading
    },
    userName:{
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight:40
    }
})