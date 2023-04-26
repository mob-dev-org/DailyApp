import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Button,
    Keyboard,
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Player, addPlayerA, deletePlayerA, updatePlayerA } from '@/store/teamA/slice';
import { addPlayerB, deletePlayerB, updatePlayerB } from '@/store/teamB/slice';

export default function TabTwoScreen() {
    const dispatch = useAppDispatch();
    const { teamB, teamA } = useAppSelector((state) => state);
    const [newPlayer, setNewPlayer] = useState<Player>({ name: '', goal: 0, assists: 0, apear: 0, willPlay: true });

    const [newPlayer1, setNewPlayer1] = useState<Player>({ name: '', goal: 0, assists: 0, apear: 0, willPlay: true });
    const addPlayerTeamA = () => {
        dispatch(addPlayerA(newPlayer));
        setNewPlayer({ name: '', goal: 0, assists: 0, apear: 0, willPlay: true });
    };

    const addPlayerTeamB = () => {
        dispatch(addPlayerB(newPlayer1));
        setNewPlayer1({ name: '', goal: 0, assists: 0, apear: 0, willPlay: true });
    };

    const updatePlayerTeamA = (index: number, willPlay: boolean) => {
        dispatch(updatePlayerA({ index, willPlay }));
    };

    const delPlayerTeamA = (index: number) => dispatch(deletePlayerA(index));
    const delPlayerTeamB = (index: number) => dispatch(deletePlayerB(index));

    const updatePlayerTeamB = (index: number, willPlay: boolean) => {
        dispatch(updatePlayerB({ index, willPlay }));
    };
    return (
        <ScrollView>
            <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {/* TEAM A */}
                    <View style={styles.teamContainer}>
                        <StatusBar backgroundColor="#FFFFFF" />
                        <View style={styles.teamContainer}>
                            <Text style={styles.teamName}>TEAM Bijeli</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Player Name"
                                onChangeText={(text) => setNewPlayer({ ...newPlayer, name: text })}
                                value={newPlayer.name}
                            />

                            <Button
                                title="Add Player to Bijeli"
                                onPress={addPlayerTeamA}
                                disabled={newPlayer.name.trim() === ''}
                            />
                            <View style={styles.teamName}>
                                {teamA.players.map((player, index) => (
                                    <View key={index} style={styles.playerName}>
                                        <Text>
                                            {player.name}- G : {player.goal} - A : {player.assists} - P : {player.apear}
                                        </Text>
                                        <Pressable onPress={() => updatePlayerTeamA(index, !player.willPlay)}>
                                            {player.willPlay ? (
                                                <Icon name="check-circle" size={25} color="green" />
                                            ) : (
                                                <Icon name="circle-thin" size={25} color="gray" />
                                            )}
                                        </Pressable>

                                        <Pressable onPress={() => delPlayerTeamA(index)}>
                                            <Text style={styles.deleteButton}>Delete</Text>
                                        </Pressable>
                                    </View>
                                ))}
                            </View>
                        </View>
                        {/* TEAM B */}
                        <View style={styles.teamContainer}>
                            <Text style={styles.teamName}>TEAM Šareni</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Player Name"
                                onChangeText={(text) => setNewPlayer1({ ...newPlayer1, name: text })}
                                value={newPlayer1.name}
                            />

                            <Button
                                title="Add Player to Šareni"
                                onPress={addPlayerTeamB}
                                disabled={newPlayer1.name.trim() === ''}
                            />

                            <View style={styles.teamName}>
                                {teamB.players.map((player, index) => (
                                    <View key={index} style={styles.playerName}>
                                        <Text>
                                            {player.name}- G : {player.goal} - A : {player.assists} - P : {player.apear}
                                        </Text>

                                        <Pressable onPress={() => updatePlayerTeamB(index, !player.willPlay)}>
                                            {player.willPlay ? (
                                                <Icon name="check-circle" size={25} color="green" />
                                            ) : (
                                                <Icon name="circle-thin" size={25} color="gray" />
                                            )}
                                        </Pressable>
                                        <Pressable onPress={() => delPlayerTeamB(index)}>
                                            <Text style={styles.deleteButton}>Delete</Text>
                                        </Pressable>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    playingButton: {
        color: 'green',
        marginLeft: 10,
        fontWeight: 'bold',
    },
    deleteButton: {
        color: 'red',
        marginLeft: 10,
        fontWeight: 'bold',
    },
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 24,
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
