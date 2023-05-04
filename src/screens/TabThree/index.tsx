import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/atoms/Themed';
import { useAppSelector } from '@/store/hooks';
import { Player } from '@/store/teamA/slice';

export type PlayersWithMost = {
    title: string;
    players: Player[];
    key: string;
};

export type PlayerStat = {
    key: 'goal' | 'assists' | 'apear';
    title: string;
};

export default function TabThreeScreen() {
    const { t } = useTranslation();
    const { teamB, teamA } = useAppSelector((state) => state);

    const combinePlayers: Player[] = [...teamA.players, ...teamB.players];

    const getPlayersWithMost = (tracker: 'goal' | 'assists' | 'apear'): Player[] => {
        if (combinePlayers.length === 0) {
            return [];
        } else {
            const sortedPlayers = combinePlayers.sort((a, b) => (b[tracker] || 0) - (a[tracker] || 0));
            const most = sortedPlayers[0][tracker];
            return sortedPlayers.filter((player) => player[tracker] === most);
        }
    };

    const playersWithMost: PlayerStat[] = [
        { key: 'goal', title: t('playersWithmostGoals') },
        { key: 'assists', title: t('playersWithmostAssists') },
        { key: 'apear', title: t('playersWithMostAppearances') },
    ];

    const allPlayersWithMost = playersWithMost.map(({ key, title }) => ({
        title,
        players: getPlayersWithMost(key),
        key,
    }));

    return (
        <View style={styles.container}>
            {allPlayersWithMost.map((category) => (
                <View style={styles.category} key={category.title}>
                    <Text style={styles.heading}>{category.title}</Text>
                    {category.players.map((player) => (
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

// const getPlayersWithMost = (property: keyof Player): Player[] => {
//prosljeđivanje objekata u funkciju(parametar)
// if (combinePlayers.length === 0) { !logical NOT oeprator give fasly value

// const playersWithMostGoals = getPlayersWithMost('goal');
// const playersWithMostAssists = getPlayersWithMost('assists');
// const playersWithMostAppearances = getPlayersWithMost('apear');
// const allPlayersWithMost: PlayersWithMost[] = ['goal', 'assists', 'apear'].map((key) => ({
//     title: t(`playerWithMost${key}`),
//     players: getPlayersWithMost(key as 'goal' | 'assists' | 'apear'),
//     key,
// }));

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
