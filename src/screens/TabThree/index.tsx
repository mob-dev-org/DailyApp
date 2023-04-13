import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/atoms/Themed';
import { useAppSelector } from '@/store/hooks';

export default function TabThreeScreen() {
    const { teamB, teamA } = useAppSelector((state) => state);
    // const teamB  = useAppSelector((state) => state.);

    const combinePlayers = [...teamA.players, ...teamB.players];

    const playersMostGoals = () => {
        const sortedPlayers = combinePlayers.sort((a, b) => b.goal - a.goal);
        const mostGoals = sortedPlayers[0].goal;
        return sortedPlayers.filter((a) => a.goal === mostGoals);
    };

    const playersMostAssists = () => {
        const sortedPlayers = combinePlayers.sort((a, b) => b.assists - a.assists);
        const mostAssists = sortedPlayers[0].assists;
        return sortedPlayers.filter((b) => b.assists === mostAssists);
    };

    const playerMost = () => {
        const sortedPlayers = combinePlayers.sort((a, b) => b.apear - a.apear);
        const mostAppearances = sortedPlayers[0].apear;
        return sortedPlayers.filter((c) => c.apear === mostAppearances);
    };

    const playersWithMostGoals = playersMostGoals();
    const playersWithMostAssists = playersMostAssists();
    const playersWithMostAppearances = playerMost();

    return (
        <View style={styles.container}>
            <View style={styles.category}>
                <Text style={styles.heading}>Players with most goals:</Text>
                {playersWithMostGoals.map((player) => (
                    <Text key={player.name}>
                        {player.name} : {player.goal}
                    </Text>
                ))}
            </View>
            <View style={styles.category}>
                <Text style={styles.heading}>Players with most assists:</Text>
                {playersWithMostAssists.map((player) => (
                    <Text key={player.name}>
                        {player.name} : {player.assists}
                    </Text>
                ))}
            </View>
            <View style={styles.category}>
                <Text style={styles.heading}>Players with most appearances:</Text>
                {playersWithMostAppearances.map((player) => (
                    <Text key={player.name}>
                        {player.name}: {player.apear}
                    </Text>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    category: {
        marginVertical: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        width: '90%',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    playerText: {
        fontSize: 16,
        marginBottom: 4,
    },
});
