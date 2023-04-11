import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Player = {
    name: string;
    goal?: number;
    assists?: number;
    apear?: number;
};

type Team = {
    name: string;
    players: Player[];
};

export default function TabTwoScreen() {
    const [team1, setTeam1] = useState<Team>({
        name: 'Bajro',
        players: [
            { name: 'Bajram', goal: 2, assists: 0, apear: 5 },
            { name: 'Ahmet', goal: 3, assists: 1, apear: 5 },
            { name: 'Irfan', goal: 2, assists: 0, apear: 5 },
            { name: 'Keno', goal: 1, assists: 0, apear: 4 },
            { name: 'Harun', goal: 1, assists: 1, apear: 5 },
        ],
    });
    const [team2, setTeam2] = useState<Team>({
        name: 'Malik',
        players: [
            { name: 'Malik', goal: 3, assists: 1, apear: 5 },
            { name: 'Mahir', goal: 2, assists: 3, apear: 5 },
            { name: 'Adi', goal: 1, assists: 2, apear: 4 },
            { name: 'Pepa', goal: 1, assists: 2, apear: 5 },
            { name: 'Mirza', goal: 1, assists: 2, apear: 1 },
            { name: 'Almo', goal: 1, assists: 2, apear: 3 },
        ],
    });
    const [newPlayerName, setNewPlayerName] = useState('');
    const [newPlayerName1, setNewPlayerName1] = useState('');
    // const [count, setCount] = useState(0);
    // const [count2, setCount2] = useState(0);

    const addPlayer = (teamId: number) => {
        // Check if teamId is 1 and newPlayerName is not empty
        if (teamId === 1 && newPlayerName) {
            const newPlayer: Player = { name: newPlayerName };
            // Use the setTeam1 function to update the team1 state
            // Use the spread operator to create spread copy of the previous team1 state
            // Update the players property of team1 state with a new array that contains the previous players and the newPlayer
            setTeam1((prevTeam1) => ({ ...prevTeam1, players: [...prevTeam1.players, newPlayer] }));
            // Clear the newPlayerName input field by setting it to an empty string
            setNewPlayerName('');
        }
        // Check if teamId is 2 and newPlayerName1 is not empty
        else if (teamId === 2 && newPlayerName1) {
            const newPlayer: Player = { name: newPlayerName1 };
            // Use the setTeam2 function to update the team2 state
            // Use the spread operator to create a shallow copy of the previous team2 state
            // Update the players property of team2 state with a new array that contains the previous players and the newPlayer
            setTeam2((prevTeam2) => ({ ...prevTeam2, players: [...prevTeam2.players, newPlayer] }));
            // Clear the newPlayerName1 input field by setting it to an empty string
            setNewPlayerName1('');
        }
    };

    //clear all players from Team1
    const clearTeam1 = () => {
        setTeam1((i) => ({ ...i, players: [] }));
    };

    //clear all players from Team2
    const clearTeam2 = () => {
        setTeam2((i) => ({ ...i, players: [] }));
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <StatusBar backgroundColor="#FFFFFF" />
                <View style={styles.teamContainer}>
                    <Text style={styles.teamName}>TEAM {team1.name}</Text>
                    {/* <Button title="Goal" onPress={() => setCount(count + 1)} /> */}
                    <Button title="Clear Team 1" onPress={clearTeam1} />
                    <View style={styles.teamName}>
                        {team1.players.map((player, index) => (
                            <Text key={index} style={styles.playerName}>
                                {player.name}- G : {player.goal} - A : {player.assists} - P : {player.apear}
                            </Text>
                        ))}
                    </View>
                    {/* <View style={styles.addPlayerContainer}> */}
                    <TextInput
                        style={styles.input}
                        placeholder="Enter player name..."
                        value={newPlayerName}
                        onChangeText={setNewPlayerName}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => addPlayer(1)} disabled={!newPlayerName}>
                        <Text style={styles.buttonText}>Add Player</Text>
                    </TouchableOpacity>
                    {/* </View> */}
                </View>
                {/* TEAM2 */}
                <View style={styles.teamContainer}>
                    <Text style={styles.teamName}>TEAM {team2.name}</Text>
                    {/* <Button title="Goal" onPress={() => setCount2(count2 + 1)} /> */}
                    <Button title="Clear Team 2" onPress={clearTeam2} />
                    <View style={styles.teamName}>
                        {team2.players.map((player, index) => (
                            <Text key={index} style={styles.playerName}>
                                {player.name}- G : {player.goal} - A : {player.assists} - P : {player.apear}
                            </Text>
                        ))}
                    </View>
                    {/* <View style={styles.addPlayerContainer}> */}
                    <TextInput
                        style={styles.input}
                        placeholder="Enter player name..."
                        value={newPlayerName1}
                        onChangeText={setNewPlayerName1}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => addPlayer(2)} disabled={!newPlayerName1}>
                        <Text style={styles.buttonText}>Add Player</Text>
                    </TouchableOpacity>
                    {/* </View> */}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    teamContainer: {
        flex: 1,
        marginBottom: 16,
        paddingTop: 24,
    },
    team: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 16,
    },
    teamName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    playerName: {
        fontSize: 16,
        marginBottom: 4,
        borderWidth: 1,
        padding: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginBottom: 8,
    },
    button: {
        backgroundColor: 'blue',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

// const styles = StyleSheet.create({
//     contentContainer: {
//         flexGrow: 1,
//         justifyContent: 'center',
//     },
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         paddingHorizontal: 16,
//         paddingTop: 24,
//     },
//     teamContainer: {
//         flex: 1,
//         marginBottom: 16,
//     },
//     teamName: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 16,
//     },
//     playerList: {
//         flex: 1,
//         borderRadius: 8,
//         marginBottom: 16,
//         padding: 16,
//         maxHeight: 200,
//     },
//     addPlayerContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 16,
//         paddingTop: 24,
//     },
//     addPlayerInput: {
//         flex: 1,
//         height: 40,
//         borderRadius: 8,
//         borderWidth: 1,
//         borderColor: 'gray',
//         paddingHorizontal: 8,
//         marginRight: 16,
//     },
//     addButton: {
//         backgroundColor: '#007BFF',
//         borderRadius: 8,
//         paddingVertical: 8,
//         paddingHorizontal: 16,
//     },
//     addButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },
//     player: {
//         marginBottom: 8,
//         borderWidth: 1,
//         padding: 4,
//         borderRadius: 8,
//     },
// });
