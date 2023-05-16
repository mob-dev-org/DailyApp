import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Keyboard, KeyboardAvoidingView, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import alertMessage from '@/components/atoms/AlertMessage';
import TaskActionButton from '@/components/atoms/TaskActionButton';
import { Text, View } from '@/components/atoms/Themed';
import MainButtons from '@/components/molecules/AppearanceButtons';
import Tasks from '@/components/molecules/ListOfTasks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addNewTask, cancelEditing, clearTasks, saveEditedTask, setEditedText } from '@/store/toDo/slice';

export default function TabThreeScreen() {
    const { editingIndex, newText } = useAppSelector((state) => state.toDo);
    const isEditing = editingIndex === null;
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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <KeyboardAvoidingView behavior="height" enabled>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>
                            <MainButtons />
                            {/* HEAD input */}
                            <View>
                                <Text style={styles.title}>{t('addTasks')}</Text>
                                {isEditing ? (
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
                                {isEditing ? (
                                    <TaskActionButton onPress={addTask} text="add" />
                                ) : (
                                    <View style={styles.taskItemButtons}>
                                        <TaskActionButton onPress={saveEditing} text="save" />
                                        <TaskActionButton onPress={cancelEdit} text="cancel" />
                                    </View>
                                )}
                            </View>
                            {/* dell all button */}
                            <View style={styles.rowItems}>
                                <Text style={styles.title}>{t('listOfTasks')}</Text>
                                {isEditing && (
                                    <TaskActionButton
                                        onPress={() =>
                                            alertMessage({
                                                title: 'DELETE',
                                                message: 'Delete all tasks!?',
                                                onPress: clearAll,
                                                buttonText: 'DELETE',
                                                buttonStyle: 'destructive',
                                            })
                                        }
                                        text="deleteAll"
                                    />
                                )}
                            </View>
                            {/* List of tasks*/}
                            <Tasks />
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    taskButtonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    taskInput2: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        backgroundColor: '#acdc',
    },
    taskInput: {
        textAlign: 'center',
        fontSize: 16,
        borderBottomWidth: 1,
    },
    pressableAdd: {
        width: 100,
        alignSelf: 'center',
    },
    addButton: {
        backgroundColor: '#acdc',
        fontSize: 16,
        borderWidth: 1,
        padding: 4,
        margin: 8,
        justifyContent: 'center',
        textAlign: 'center',
    },
    actionIconText: {
        fontSize: 12,
    },
    taskItemButtons: {
        flexDirection: 'row',
    },
    actionIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccfc',
        marginHorizontal: 4,
        paddingHorizontal: 8,
        borderRadius: 3,
        borderWidth: 1,
    },
    clear: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
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
