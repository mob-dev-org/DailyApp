import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/atoms/Themed';

export default function TabThreeScreen() {
    type Player = {
        name: string;
        goal: number;
        assists: number;
        apear: number;
    };
    const players: Player[] = [
        { name: 'Bajram', goal: 5, assists: 0, apear: 5 },
        { name: 'Ahmet', goal: 2, assists: 3, apear: 5 },
        { name: 'Irfan', goal: 2, assists: 0, apear: 5 },
        { name: 'Keno', goal: 1, assists: 0, apear: 4 },
        { name: 'Harun', goal: 3, assists: 1, apear: 5 },
    ];

    const players2: Player[] = [
        { name: 'Malik', goal: 3, assists: 1, apear: 5 },
        { name: 'Mahir', goal: 2, assists: 3, apear: 5 },
        { name: 'Adi', goal: 1, assists: 2, apear: 4 },
        { name: 'Pepa', goal: 1, assists: 2, apear: 5 },
        { name: 'Mirza', goal: 5, assists: 2, apear: 1 },
        { name: 'Almo', goal: 7, assists: 2, apear: 0 },
    ];

    const combinedPlayers: Player[] = [...players, ...players2];

    // Find player with most goals
    const playerWithMostGoals = combinedPlayers.reduce((prevPlayer, currentPlayer) =>
        prevPlayer.goal > currentPlayer.goal ? prevPlayer : currentPlayer,
    );

    // Find player with most assits
    const playerWithMostAssists = combinedPlayers.reduce((prevPlayer, currentPlayer) =>
        prevPlayer.assists > currentPlayer.assists ? prevPlayer : currentPlayer,
    );
    // Find player with most assits
    const playerWithMostApears = combinedPlayers.reduce((prevPlayer, currentPlayer) =>
        prevPlayer.apear > currentPlayer.apear ? prevPlayer : currentPlayer,
    );
    // Access player details
    const goalPlayerName = playerWithMostGoals.name;
    const playerGoals = playerWithMostGoals.goal;
    const assistsPlayerName = playerWithMostAssists.name;
    const playerAssists = playerWithMostAssists.assists;
    const apearPlayerName = playerWithMostApears.name;
    const playerApear = playerWithMostApears.apear;

    // Render player details in component's UI
    return (
        <View style={styles.container}>
            <Text>Player with most goals: {goalPlayerName}</Text>
            <Text>Goals: {playerGoals}</Text>
            <Text>Player with most assists: {assistsPlayerName}</Text>
            <Text>Assists: {playerAssists}</Text>
            <Text>Player with most apears: {apearPlayerName}</Text>
            <Text>Apears: {playerApear}</Text>
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
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
