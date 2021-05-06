import React, { useEffect, useState } from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'
import { Header } from '../components/Header'

import colors from '../style/colors'
import waterDrop from '../assets/waterdrop.png';
import { FlatList } from 'react-native-gesture-handler';
import { PlantsProps, loadPlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Load } from '../components/Load';

export function MyPlants(){
    const [myPlants, setMyPlants] = useState<PlantsProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>()    

    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await loadPlant();

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(), 
                new Date().getTime(),
                { locale: ptBR }
            );

            setNextWatered(
                `Não esqueça de regar a ${plantsStoraged[0].name} às ${nextTime}`
            )

            setMyPlants(plantsStoraged);
            setLoading(false);
        }

        loadStorageData();
    }, []);

    return(
        <View style={styles.container}>
            <Header />

            <View style={styles.spotlight}>

                <Image source={waterDrop} style={styles.spotlightImage} />
                <Text style={styles.spotlightText}>
                    {nextWatered}
                </Text>

            </View>

            <View style={styles.plants}>

                <Text style={styles.plantsTitle}>
                    Proximas regadas
                </Text>
                <FlatList data={myPlants} 
                    keyExtractor={(item) => String(item.id)} 
                    renderItem={({item}) => (
                        <Text>asdsadasda</Text>
                    )} 
                    showsVerticalScrollIndicator={false} 
                    contentContainerStyle={{ flex: 1 }}
                />
                
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight:{
        
    },
    spotlightImage:{

    },
    spotlightText:{
        
    },
    plants:{

    },
    plantsTitle:{
        
    }
    
})