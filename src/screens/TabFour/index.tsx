import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/atoms/Themed';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

// Import the Redux action

export default function TabFourScreen() {
    const dispatch = useAppDispatch();
    const { teamB, teamA } = useAppSelector((state) => state);

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
