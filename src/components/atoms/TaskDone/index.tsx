import React from 'react';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type CheckboxProps = {
    done: boolean | undefined;
    onPress: () => void;
};

export default function Checkbox({ done, onPress }: CheckboxProps) {
    return (
        <Pressable onPress={onPress}>
            {done ? (
                <Icon name="check-circle" size={24} color="green" />
            ) : (
                <Icon name="circle-thin" size={24} color="gray" />
            )}
        </Pressable>
    );
}
