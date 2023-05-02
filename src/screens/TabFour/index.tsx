import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, StyleSheet } from 'react-native';

import CurrentDateTime from '@/components/atoms/Date';
import ScoreInput from '@/components/atoms/InputScore';
import { Text, View } from '@/components/atoms/Themed';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addGame } from '@/store/score/slice';
import { updateTeamAResult } from '@/store/score/slice';
import { updateTeamBResult } from '@/store/score/slice';

// Import the Redux action

export default function TabFourScreen() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { games, teamScoreA, teamScoreB } = useAppSelector((state) => state.score);

    const [scoreA, setScoreA] = useState<number>(0);
    const [scoreB, setScoreB] = useState<number>(0);

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
    return (
        <View style={styles.container}>
            <CurrentDateTime />
            <Text style={styles.title}>{t('finalScore')}</Text>
            <Text style={styles.title}>
                Bijeli {teamScoreA} : {teamScoreB} Šareni
            </Text>
            <Button
                title="ADD GAME"
                onPress={() => dispatch(addGame({ resultA: teamScoreA, resultB: teamScoreB }))}></Button>

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
                {games.map((game, index) => (
                    <View style={styles.input} key={index}>
                        <Text style={styles.title}>Game on date: DATE</Text>
                        <Text>Team A: {game.resultA}</Text>
                        <Text>Team B: {game.resultB}</Text>
                    </View>
                ))}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    lastGame: { fontSize: 16, fontWeight: 'bold' },
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
