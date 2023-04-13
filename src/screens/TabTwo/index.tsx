import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addPlayerA, deletePlayerA } from '@/store/teamA/slice';

type Player = {
    name: string;
    goal: number;
    assists: number;
    apear: number;
};

export default function TabTwoScreen() {
    const dispatch = useAppDispatch();
    const { teamB, teamA } = useAppSelector((state) => state);
    const [newPlayer, setNewPlayer] = useState<Player>({
        name: '',
        goal: 0,
        assists: 0,
        apear: 0,
    });
    const addPlayerTeamA = () => {
        dispatch(addPlayerA(newPlayer));
    };
    const delPlayerTeamA = (index: number) => dispatch(deletePlayerA(index));

    return (
        <ScrollView>
            {/* TEAM A */}
            <View style={styles.container}>
                <StatusBar backgroundColor="#FFFFFF" />
                <View style={styles.teamContainer}>
                    <Text style={styles.teamName}>TEAM Bijeli</Text>
                    <View style={styles.teamName}>
                        {teamA.players.map((player, index) => (
                            <Text key={index} style={styles.playerName}>
                                {player.name}- G : {player.goal} - A : {player.assists} - P : {player.apear}
                            </Text>
                        ))}
                    </View>
                </View>
                {/* TEAM B */}
                <View style={styles.teamContainer}>
                    <Text style={styles.teamName}>TEAM Šareni</Text>

                    <View style={styles.teamName}>
                        {teamB.players.map((player, index) => (
                            <Text key={index} style={styles.playerName}>
                                {player.name}- G : {player.goal} - A : {player.assists} - P : {player.apear}
                            </Text>
                        ))}
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Player Name"
                        onChangeText={(text) => setNewPlayer({ ...newPlayer, name: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Goals"
                        onChangeText={(text) => setNewPlayer({ ...newPlayer, goal: parseInt(text) })}
                        keyboardType="numeric"
                    />

                    <Button
                        title="Add Player to Team A"
                        onPress={addPlayerTeamA}
                        disabled={newPlayer.name.trim() === ''}
                    />
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

// //clear all players from Team1
// const clearTeam1 = () => {
//     setTeam1((i) => ({ ...i, players: [] }));
// };

// //clear all players from Team2
// const clearTeam2 = () => {
//     setTeam2((i) => ({ ...i, players: [] }));
// };
