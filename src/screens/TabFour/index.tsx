import { useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';

import CurrentDateTime from '@/components/atoms/Date';
import { Text, View } from '@/components/atoms/Themed';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateTeamAResult } from '@/store/teamA/slice';
import { updateTeamBResult } from '@/store/teamB/slice';

// Import the Redux action

export default function TabFourScreen() {
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
    return (
        <View style={styles.container}>
            <CurrentDateTime />
            <Text style={styles.title}>
                Bijeli {teamA.result} : {teamB.result} Šareni
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={scoreA.toString()}
                    onChangeText={(score) => setScoreA(Number(score))}
                    keyboardType="numeric"
                    maxLength={2}
                />
                <Button title="ADD" onPress={handleSetResultA} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={scoreB.toString()}
                    onChangeText={(score) => setScoreB(Number(score))}
                    keyboardType="numeric"
                    maxLength={2}
                />
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
