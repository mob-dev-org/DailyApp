import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';

import CurrentDateTime from '@/components/atoms/Date';
import ScoreInput from '@/components/atoms/InputScore';
import { Text, View } from '@/components/atoms/Themed';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addGame } from '@/store/score/slice';
import { updateTeamAResult } from '@/store/score/slice';
import { updateTeamBResult } from '@/store/score/slice';
import { setTeamA } from '@/store/teamA/slice';
import { setTeamB } from '@/store/teamB/slice';

export default function TabFourScreen() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const { teamA, teamB } = useAppSelector((state) => state);
    const { games, teamScoreA, teamScoreB } = useAppSelector((state) => state.score);

    const [scoreA, setScoreA] = useState<number>(0);
    const [scoreB, setScoreB] = useState<number>(0);

    const playingPlayersA = [...teamA.players].filter((player) => player.willPlay);
    const playingPlayersB = [...teamB.players].filter((player) => player.willPlay);

    const handleSetResultA = () => {
        if (!isNaN(scoreA)) {
            dispatch(updateTeamAResult(scoreA));
            setScoreA(0);
        } else {
            alert('Please enter a vaild ');
            setScoreA(0);
        }
    };
    const handleSetResultB = () => {
        if (!isNaN(scoreB)) {
            dispatch(updateTeamBResult(scoreB));
            setScoreB(0);
        } else {
            alert('Please enter a vaild ');
            setScoreB(0);
        }
    };

    const handleScoreAChange = (score: string) => {
        setScoreA(Number(score));
    };

    const handleScoreBChange = (score: string) => {
        setScoreB(Number(score));
    };

    const handleAddGame = () => {
        dispatch(addGame({ resultA: teamScoreA, resultB: teamScoreB }));
        console.log(games);
    };

    const handlePlayerStatChange = (type: string, index: number) => {
        const updatedPlayers = [...teamA.players];
        if (type === 'goal') {
            updatedPlayers[index] = { ...updatedPlayers[index], goal: updatedPlayers[index].goal + 1 };
        } else if (type === 'assist') {
            updatedPlayers[index] = { ...updatedPlayers[index], assists: updatedPlayers[index].assists + 1 };
        }
        dispatch(setTeamA({ ...teamA, players: updatedPlayers }));
    };

    const handleGoalChangeB = (index: number) => {
        const updatedPlayers = [...teamB.players];
        updatedPlayers[index] = { ...updatedPlayers[index], goal: updatedPlayers[index].goal + 1 };
        dispatch(setTeamB({ ...teamB, players: updatedPlayers }));
    };
    const handleAssistChangeB = (index: number) => {
        const updatedPlayers = [...teamB.players];
        updatedPlayers[index] = { ...updatedPlayers[index], assists: updatedPlayers[index].assists + 1 };
        dispatch(setTeamB({ ...teamB, players: updatedPlayers }));
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <CurrentDateTime />
                <Text style={styles.title}>{t('finalScore')}</Text>
                <Text style={styles.title}>
                    Bijeli {teamScoreA} : {teamScoreB} Šareni
                </Text>
                <Button title="ADD GAME" onPress={handleAddGame}></Button>

                <View style={styles.inputContainer}>
                    <Text style={styles.title}>Bijeli</Text>
                    <ScoreInput value={scoreA} onChangeText={handleScoreAChange} keyboardType="numeric" />
                    <Button title="ADD" onPress={handleSetResultA} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>Šareni</Text>
                    <ScoreInput value={scoreB} onChangeText={handleScoreBChange} keyboardType="numeric" />
                    <Button title="ADD" onPress={handleSetResultB} />
                </View>

                <Text style={styles.title}>
                    <Text style={styles.title}>
                        {games.slice(1).map((game, index) => (
                            <View style={styles.gameContainer} key={index}>
                                {/* Add Date //TODO  */}
                                <Text style={styles.gameDate}>Game on date: Date needed</Text>
                                <View style={styles.gameScores}>
                                    <Text style={styles.gameTeamA}> Bijeli: {game.resultA}</Text>
                                    <Text style={styles.gameTeamB}> Šareni: {game.resultB}</Text>
                                </View>
                            </View>
                        ))}
                    </Text>
                </Text>
                <View style={styles.gameContainer}>
                    <Text style={styles.gameTeamA}>BIJELI</Text>
                    {playingPlayersA.map((player, index) => (
                        <View key={index} style={styles.gameScores}>
                            <Text>{player.name}</Text>
                            <View style={styles.goalAssistContainer}>
                                <TouchableOpacity onPress={() => handlePlayerStatChange('goal', index)}>
                                    <Text style={styles.goalAssistButton}>+</Text>
                                </TouchableOpacity>
                                <Text style={styles.goalAssistText}>G: {player.goal}</Text>
                            </View>
                            <View style={styles.goalAssistContainer}>
                                <TouchableOpacity onPress={() => handlePlayerStatChange('assist', index)}>
                                    <Text style={styles.goalAssistButton}>+</Text>
                                </TouchableOpacity>
                                <Text style={styles.goalAssistText}>A: {player.assists}</Text>
                            </View>
                            <Text style={styles.goalAssistText}>P: {player.apear}</Text>
                        </View>
                    ))}
                </View>

                {/* .....TEAM B.... */}
                <View style={styles.gameContainer}>
                    <Text style={styles.gameTeamA}>ŠARENI</Text>
                    {playingPlayersB.map((player, index) => (
                        <View key={index} style={styles.gameScores}>
                            <Text>{player.name}</Text>
                            <View style={styles.goalAssistContainer}>
                                <TouchableOpacity onPress={() => handleGoalChangeB(index)}>
                                    <Text style={styles.goalAssistButton}>+</Text>
                                </TouchableOpacity>
                                <Text style={styles.goalAssistText}>G: {player.goal}</Text>
                            </View>
                            <View style={styles.goalAssistContainer}>
                                <TouchableOpacity onPress={() => handleAssistChangeB(index)}>
                                    <Text style={styles.goalAssistButton}>+</Text>
                                </TouchableOpacity>
                                <Text style={styles.goalAssistText}>A: {player.assists}</Text>
                            </View>
                            <Text style={styles.goalAssistText}>P: {player.apear}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

//For each game to add who scored, assisted, ..

const styles = StyleSheet.create({
    goalAssistButton: {
        fontSize: 24,
        paddingHorizontal: 10,
    },
    goalAssistText: {
        marginHorizontal: 10,
    },
    goalAssistContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    gameContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        width: '100%',
    },
    gameDate: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    gameScores: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gameTeamA: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue',
    },
    gameTeamB: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
        width: 350,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
