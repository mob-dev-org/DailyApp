import React from 'react';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type TaskDoneProps = {
    done: boolean | undefined;
    onPress: () => void;
};

export default function TaskDone({ done, onPress }: TaskDoneProps) {
    return (
        <Pressable onPress={onPress}>
            {done ? (
                <Icon name="check-circle" size={25} color="green" />
            ) : (
                <Icon name="circle-thin" size={25} color="gray" />
            )}
        </Pressable>
    );
}
