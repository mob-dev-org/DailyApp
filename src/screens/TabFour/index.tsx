import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/atoms/Themed';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function TabFourScreen() {
    const dispatch = useAppDispatch();
    const { teamB, teamA } = useAppSelector((state) => state);

    const d = new Date('July 21, 1983 01:15:00');
    d.setDate(15);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>REZULATAT</Text>
            <Text style={styles.title}>
                Bijeli {teamA.result} : {teamB.result} Šareni
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
