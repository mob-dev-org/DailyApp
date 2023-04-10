import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Player = {
    name: string;
};

type Team = {
    name: string;
    players: Player[];
};

export default function TabTwoScreen() {
    const [team1, setTeam1] = useState<Team>({
        name: 'Bajro',
        players: [{ name: 'Bajram' }, { name: 'Ahmet' }, { name: 'Harun' }],
    });
    const [team2, setTeam2] = useState<Team>({
        name: 'Malik',
        players: [{ name: 'Malik' }, { name: 'Mahir' }, { name: 'Adi' }],
    });
    const [newPlayerName, setNewPlayerName] = useState('');
    const [newPlayerName1, setNewPlayerName1] = useState('');

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
        <View style={styles.container}>
            <View style={styles.teamContainer}>
                <Text style={styles.teamName}>TEAM: {team1.name}</Text>
                <Button title="Clear Team 1" onPress={clearTeam1} />
                <View style={styles.playerList}>
                    {team1.players.map((player, index) => (
                        <Text key={index} style={styles.player}>
                            {player.name}
                        </Text>
                    ))}
                </View>
                <View style={styles.addPlayerContainer}>
                    <TextInput
                        style={styles.addPlayerInput}
                        placeholder="Enter player name..."
                        value={newPlayerName}
                        onChangeText={setNewPlayerName}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={() => addPlayer(1)} disabled={!newPlayerName}>
                        <Text style={styles.addButtonText}>Add Player</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* TEAM2 */}
            <View style={styles.teamContainer}>
                <Text style={styles.teamName}>TEAM: {team2.name}</Text>
                <Button title="Clear Team 2" onPress={clearTeam2} />

                <View style={styles.playerList}>
                    {team2.players.map((player, index) => (
                        <Text key={index} style={styles.player}>
                            {player.name}
                        </Text>
                    ))}
                </View>
                <View style={styles.addPlayerContainer}>
                    <TextInput
                        style={styles.addPlayerInput}
                        placeholder="Enter player name..."
                        value={newPlayerName1}
                        onChangeText={setNewPlayerName1}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={() => addPlayer(2)} disabled={!newPlayerName1}>
                        <Text style={styles.addButtonText}>Add Player</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    teamContainer: {
        marginBottom: 16,
    },
    teamName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    playerList: {
        backgroundColor: '#a123',
        borderRadius: 8,
        marginBottom: 16,
        padding: 16,
        maxHeight: 200,
    },
    addPlayerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    addPlayerInput: {
        flex: 1,
        height: 40,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 8,
        marginRight: 16,
    },
    addButton: {
        backgroundColor: '#007BFF',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    player: {
        marginBottom: 8,
        borderWidth: 1,
        padding: 4,
        borderRadius: 8,
    },
});
