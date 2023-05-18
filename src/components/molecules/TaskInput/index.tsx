import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, TextInput } from 'react-native';

import TaskActionButton from '@/components/atoms/TaskActionButton';
import { Text, View } from '@/components/atoms/Themed';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addNewTask, cancelEditing, saveEditedTask, setEditedText } from '@/store/toDo/slice';

export default function TaskInput() {
    const { editingIndex, newText } = useAppSelector((state) => state.toDo);
    const isEditing = editingIndex !== null;
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const [taskName, setTaskName] = useState<string>('');
    const addTask = () => {
        if (!taskName) {
            Alert.alert('Error', t('emptyTask') || '');
            return;
        }
        dispatch(addNewTask(taskName));
        setTaskName('');
    };
    const saveEditing = () => {
        if (!newText) {
            Alert.alert('Error', t('emptyTask') || '');
            return;
        }
        dispatch(saveEditedTask(newText));
    };
    const cancelEdit = () => dispatch(cancelEditing());
    const updateEdit = (text: string) => dispatch(setEditedText(text));

    return (
        <View>
            <Text style={styles.title}>{t('addTasks')}</Text>
            {!isEditing ? (
                <TextInput
                    style={styles.taskInput}
                    placeholder={t('addTaskPlaceholder') || ''}
                    value={taskName}
                    onChangeText={setTaskName}
                />
            ) : (
                <TextInput style={styles.taskInput} value={newText} onChangeText={updateEdit} />
            )}
            {!isEditing ? (
                <TaskActionButton onPress={addTask} text="add" />
            ) : (
                <View style={styles.taskItemButtons}>
                    <TaskActionButton onPress={saveEditing} text="save" />
                    <TaskActionButton onPress={cancelEdit} text="cancel" />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    rowItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    taskInput: {
        textAlign: 'center',
        fontSize: 16,
        borderBottomWidth: 1,
    },
    taskItemButtons: {
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginBottom: 10,
        textAlign: 'center',
        justifyContent: 'center',
    },
});
