import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import TaskActionButton from '@/components/atoms/TaskActionButton';
import { Text, View } from '@/components/atoms/Themed';
import MainButtons from '@/components/molecules/AppearanceButtons';
import Tasks from '@/components/molecules/ListOfTasks';
import alertMessages from '@/helpers/AlertMessage';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addNewTask, cancelEditing, clearTasks, saveEditedTask, setEditedText } from '@/store/toDo/slice';

export default function TabThreeScreen() {
    const { editingIndex, newText } = useAppSelector((state) => state.toDo);
    const isEditing = editingIndex !== null;

    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [taskName, setTaskName] = useState<string>('');
    const addTask = () => {
        if (!taskName) {
            Alert.alert('Error', 'You cannot add an empty task.');
            return;
        }
        dispatch(addNewTask(taskName));
        setTaskName('');
    };
    const clearAll = () => dispatch(clearTasks());

    const saveEditing = () => {
        if (!newText) {
            Alert.alert('Error', 'You cannot save an empty task.');
            return;
        }
        dispatch(saveEditedTask(newText));
    };

    const cancelEdit = () => dispatch(cancelEditing());

    const updateEdit = (text: string) => dispatch(setEditedText(text));
    const alertMessage = () =>
        alertMessages({
            title: 'DELETE',
            message: 'Delete all tasks!?',
            onPress: () => clearAll,
            buttonText: 'DELETE',
            buttonStyle: 'destructive',
        });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <MainButtons />
                        {/* HEAD input */}
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
                            {/* Buttons add / save,cancel/ */}
                            {!isEditing ? (
                                <TaskActionButton onPress={addTask} text="add" />
                            ) : (
                                <View style={styles.taskItemButtons}>
                                    <TaskActionButton onPress={saveEditing} text="save" />
                                    <TaskActionButton onPress={cancelEdit} text="cancel" />
                                </View>
                            )}
                        </View>
                        {/* dell all button  //TODO extrack to a fn*/}
                        <View style={styles.rowItems}>
                            <Text style={styles.title}>{t('listOfTasks')}</Text>
                            {!isEditing && <TaskActionButton onPress={alertMessage} text="deleteAll" />}
                        </View>
                        {/* List of tasks*/}
                        <Tasks />
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>
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
