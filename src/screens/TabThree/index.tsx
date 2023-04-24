import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/atoms/Themed';
import { useAppSelector } from '@/store/hooks';
import type { Player } from '@/store/teamA/slice';

export default function TabThreeScreen() {
    const { teamB, teamA } = useAppSelector((state) => state);

    const combinePlayers: Player[] = [...teamA.players, ...teamB.players];

    type PlayerWithMost = {
        title: string;
        play: Player[];
        key: string;
    };

    // type Player = {
    //     name: string;
    //     goal: number;
    //     assists: number;
    //     apear: number;
    // };

    // const getPlayersWithMost = (property: keyof Player): Player[] => {

    const getPlayersWithMost = (property: 'goal' | 'assists' | 'apear'): Player[] => {
        if (combinePlayers.length === 0) {
            return [];
        }
        const sortedPlayers = combinePlayers.sort((a, b) => b[property] - a[property]);
        const most = sortedPlayers[0][property];
        return sortedPlayers.filter((player) => player[property] === most);
    };

    const playersWithMostGoals = getPlayersWithMost('goal');
    const playersWithMostAssists = getPlayersWithMost('assists');
    const playersWithMostAppearances = getPlayersWithMost('apear');

    const allPlayersWithMost: PlayerWithMost[] = [
        { title: 'Players with most goals:', play: playersWithMostGoals, key: 'goal' },
        { title: 'Players with most assists:', play: playersWithMostAssists, key: 'assists' },
        { title: 'Players with most appearances:', play: playersWithMostAppearances, key: 'apear' },
    ];

    return (
        <View style={styles.container}>
            {allPlayersWithMost.map((category) => (
                <View style={styles.category} key={category.title}>
                    <Text style={styles.heading}>{category.title}</Text>
                    {category.play.map((player) => (
                        <Text key={player.name}>
                            {player.name}: {player[category.key]}
                        </Text>
                    ))}
                </View>
            ))}
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

//FOR REVIEW

// const playersMostGoals = () => {
//     if (combinePlayers.length === 0) {
//         return [];
//     }
//     const sortedPlayers = combinePlayers.sort((a, b) => b.goal - a.goal);
//     const mostGoals = sortedPlayers[0].goal;
//     return sortedPlayers.filter((a) => a.goal === mostGoals);
// };

// const playersMostAssists = () => {
//     if (combinePlayers.length === 0) {
//         return [];
//     }
//     const sortedPlayers = combinePlayers.sort((a, b) => b.assists - a.assists);
//     const mostAssists = sortedPlayers[0].assists;
//     return sortedPlayers.filter((b) => b.assists === mostAssists);
// };

// const playerMostAppear = () => {
//     if (combinePlayers.length === 0) {
//         return [];
//     }
//     const sortedPlayers = combinePlayers.sort((a, b) => b.apear - a.apear);
//     const mostAppearances = sortedPlayers[0].apear;
//     return sortedPlayers.filter((c) => c.apear === mostAppearances);
// };

// const playersWithMostGoals = playersMostGoals();
// const playersWithMostAssists = playersMostAssists();
// const playersWithMostAppearances = playerMostAppear();
