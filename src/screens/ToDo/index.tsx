import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import alertMessage from '@/components/atoms/AlertMessage';
import TaskActionButton from '@/components/atoms/TaskActionButton';
import { Text, View } from '@/components/atoms/Themed';
import MainButtons from '@/components/molecules/AppearanceButtons';
import { Theme, setLanguage, setTheme } from '@/store/appSettings/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addNewTask, clearTasks, deleteTask, resetTasks, taskIsDone } from '@/store/toDo/slice';

export default function TabThreeScreen() {
    //Translation and theme

    const { t } = useTranslation();

    // import inital state from redux store
    const { tasks } = useAppSelector((state) => state.toDo);

    const { theme, language } = useAppSelector((state) => state.appSettings);
    const dispatch = useAppDispatch();
    const changeTheme = (theme: Theme) => dispatch(setTheme(theme));
    const changeLanguage = () => {
        console.log('Changing language', language);
        dispatch(setLanguage(language === 'en-US' ? 'bs-BA' : 'en-US'));
    };

    const ThemeChange = () => {
        changeTheme(theme === 'dark' ? 'light' : 'dark');
    };
    const resetState = () => {
        dispatch(resetTasks());
    };
    //useState hook for adding task
    const [newTaskName, setNewTaskName] = useState<string>('');
    //useState for editing
    const [editedTask, setEditedTask] = useState<string>('');
    //useState for user to display the task is it editable or not
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    //function for adding task in the list
    const addTask = () => {
        if (!newTaskName) {
            Alert.alert('Error', 'You cannot add an empty task.');
            return;
        }
        dispatch(addNewTask(newTaskName));
        setNewTaskName('');
    };
    console.log('Tasks', tasks);
    const clearAll = () => {
        dispatch(clearTasks());
    };
    const clearTask = (index: number) => dispatch(deleteTask(index));

    const toggleTaskDone = (index: number) => {
        dispatch(taskIsDone({ index }));
    };

    const editTask = (index: number) => {
        setEditedTask(tasks[index].text);
        setEditingIndex(index);
    };
    const saveEditing = (index: number) => {
        if (editedTask) {
            Alert.alert('Error', 'You cannot save an empty task.');
            return;
        }
        const newTasks = [...tasks];
        newTasks[index].text = editedTask;
        // setNewTaskName(newTasks);
        setEditingIndex(null);
    };

    const cancelEdit = () => {
        setEditingIndex(null);
    };

    return (
        <ScrollView style={styles.container}>
            <KeyboardAvoidingView behavior="height" enabled>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <MainButtons
                            changeLanguage={changeLanguage}
                            handleThemeChange={ThemeChange}
                            resetState={resetState}
                        />
                        {/* HEAD */}
                        <View>
                            <Text style={styles.title}>{t('addTasks')}</Text>
                            {editingIndex === null ? (
                                <TextInput
                                    style={styles.taskInput}
                                    placeholder={t('addTaskPlaceholder') || ''}
                                    value={newTaskName}
                                    onChangeText={setNewTaskName}
                                />
                            ) : (
                                <TextInput style={styles.taskInput} value={editedTask} onChangeText={setEditedTask} />
                            )}
                            {editingIndex === null ? (
                                <TaskActionButton onPress={addTask} text="add" />
                            ) : (
                                <View style={styles.taskItemButtons}>
                                    <TaskActionButton onPress={() => saveEditing(editingIndex)} text="save" />
                                    <TaskActionButton onPress={cancelEdit} text="cancel" />
                                </View>
                            )}
                        </View>
                        <View style={styles.rowItems}>
                            <Text style={styles.title}>{t('listOfTasks')}</Text>
                            {editingIndex === null && (
                                <TaskActionButton
                                    onPress={() => alertMessage({ onPress: clearAll })}
                                    text="deleteAll"
                                />
                            )}
                        </View>
                        {/* BODY */}
                        <View>
                            {tasks.map((task, index) => (
                                <View style={styles.taskItem} key={index}>
                                    {editingIndex === index ? (
                                        <Text>{t('editingTask')}</Text>
                                    ) : (
                                        <>
                                            <Pressable onPress={() => toggleTaskDone(index)}>
                                                {tasks[index].done ? (
                                                    <Icon name="check-circle" size={25} color="green" />
                                                ) : (
                                                    <Icon name="circle-thin" size={25} color="gray" />
                                                )}
                                            </Pressable>
                                            <Text style={[styles.taskText, task.done && styles.taskDone]}>
                                                {task.text}
                                            </Text>
                                            <Divider />
                                            <View style={styles.taskItemButtons}>
                                                {editingIndex === null && (
                                                    <TaskActionButton
                                                        onPress={() =>
                                                            alertMessage({ onPress: () => clearTask(index) })
                                                        }
                                                        text="del"
                                                    />
                                                )}
                                                {!task.done && (
                                                    <TaskActionButton onPress={() => editTask(index)} text="edit" />
                                                )}
                                            </View>
                                        </>
                                    )}
                                </View>
                            ))}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    taskDone: {
        textDecorationLine: 'line-through',
    },
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

    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f2f2f2',
        padding: 10,
        marginBottom: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    taskText: {
        flex: 1,
        fontSize: 16,
        maxWidth: 200,
    },
});
