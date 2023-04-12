import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/atoms/Themed';

export default function TabThreeScreen() {
    const players = [
        { name: 'Bajram', goal: 5, assists: 0, apear: 5 },
        { name: 'Ahmet', goal: 2, assists: 3, apear: 5 },
        { name: 'Irfan', goal: 2, assists: 0, apear: 5 },
        { name: 'Keno', goal: 1, assists: 0, apear: 4 },
        { name: 'Harun', goal: 3, assists: 1, apear: 5 },
    ];

    const players2 = [
        { name: 'Malik', goal: 3, assists: 1, apear: 5 },
        { name: 'Mahir', goal: 2, assists: 4, apear: 5 },
        { name: 'Adi', goal: 1, assists: 2, apear: 4 },
        { name: 'Pepa', goal: 1, assists: 2, apear: 5 },
        { name: 'Mirza', goal: 5, assists: 2, apear: 1 },
        { name: 'Almo', goal: 5, assists: 2, apear: 0 },
    ];

    const combinePlayers = [...players, ...players2];

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
    },
    category: {
        marginVertical: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});
