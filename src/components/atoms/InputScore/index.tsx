import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { View } from '../Themed';

type Input = {
    value: number;
    onChangeText: (value: string) => void;
    keyboardType: string;
    maxLength?: number;
};

const defaultMaxLength = 2;

export default function ScoreInput(props: Input) {
    const { onChangeText, value, maxLength = defaultMaxLength } = props;

    return (
        <View style={styles.input}>
            <TextInput
                value={value?.toString()}
                onChangeText={onChangeText}
                keyboardType={'numeric'}
                maxLength={maxLength}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        fontSize: 16,
    },
});
