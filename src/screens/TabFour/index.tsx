import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, StyleSheet } from 'react-native';

import CurrentDateTime from '@/components/atoms/Date';
import ScoreInput from '@/components/atoms/InputScore';
import { Text, View } from '@/components/atoms/Themed';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateTeamAResult } from '@/store/teamA/slice';
import { updateTeamBResult } from '@/store/teamB/slice';

// Import the Redux action

export default function TabFourScreen() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { teamB, teamA } = useAppSelector((state) => state);
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
                Bijeli {teamA.result} : {teamB.result} Šareni
            </Text>

            <View style={styles.inputContainer}>
                <Text style={styles.title}>Bijeli</Text>
                <ScoreInput value={scoreA} onChangeText={handleScoreAChange} keyboardType="numeric" maxLength={2} />
                <Button title="ADD" onPress={handleSetResultA} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Šareni</Text>

                <ScoreInput value={scoreB} onChangeText={handleScoreBChange} keyboardType="numeric" maxLength={2} />

                <Button title="ADD" onPress={handleSetResultB} />
            </View>
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
        width: 200,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
