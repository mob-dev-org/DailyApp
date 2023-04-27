import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

type Input = {
    value: string;
    onChangeText: (value: string) => void;
    placeholder: string;
};

export default function PlayerNameInput(props: Input) {
    const { value, onChangeText, placeholder } = props;

    return (
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#C7C7CD"
        />
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginBottom: 8,
    },
});
