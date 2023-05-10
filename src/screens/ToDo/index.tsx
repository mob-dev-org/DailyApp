import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Alert,
    Button,
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

import TaskActionButton from '@/components/atoms/ActionButton';
import { Text, View } from '@/components/atoms/Themed';
import { Task } from '@/constants/Types';
import { Theme, setLanguage, setTheme } from '@/store/appSettings/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function TabThreeScreen() {
    //Translation and theme
    const { t } = useTranslation();
    const { theme, language } = useAppSelector((state) => state.appSettings);
    const dispatch = useAppDispatch();
    const changeTheme = (theme: Theme) => dispatch(setTheme(theme));
    const changeLanguage = () => {
        console.log('Changing language', language);
        dispatch(setLanguage(language === 'en-US' ? 'bs-BA' : 'en-US'));
    };

    //useState hook for array of tasks
    const [tasks, setTasks] = useState<Task[]>([
        { text: 'one', done: false },
        { text: 'two', done: false },
        { text: 'three', done: false },
    ]);
    //useState hook for adding task
    const [newTaskName, setNewTaskName] = useState<string>('');
    //useState for editing
    const [editedTask, setEditedTask] = useState<string>('');
    //useState for user to display the task is it editable or not
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    //function for adding task in the list
    const addTask = () => {
        const newTasks = [...tasks, { text: newTaskName, done: false }];
        setTasks(newTasks);
        setNewTaskName('');
    };

    console.log('Tasks', tasks);
    //function for clearing all tasks

    const clearAll = () => {
        Alert.alert('DELETE', 'Delete all tasks!?', [
            {
                text: 'DELETE',
                onPress: () => {
                    setTasks([]);
                },
                style: 'destructive',
            },
            {
                text: 'Cancel',
                style: 'default',
            },
        ]);
    };

    //function for clearing single task on certiain index

    const clearSingleTask = (index: number) => {
        Alert.alert('DELETE', 'You want to delete this task!?', [
            {
                text: 'DELETE',
                onPress: () => {
                    const newList = [...tasks];
                    newList.splice(index, 1);
                    setTasks(newList);
                },
                style: 'destructive',
            },
            {
                text: 'Cancel',
                style: 'default',
            },
        ]);
    };

    const toggleTaskDone = (index: number) => {
        const newTasks = [...tasks];
        newTasks[index].done = !newTasks[index].done;
        setTasks(newTasks);
    };

    const addTaskPlaceholder = t('addTaskPlaceholder');

    const handleStartEditing = (index: number) => {
        setEditedTask(tasks[index].text);
        setEditingIndex(index);
    };

    const handleSaveEditing = (index: number) => {
        if (editedTask.trim() === '') {
            Alert.alert('Error', 'You cannot save an empty task.');
            return;
        }

        const newTasks = [...tasks];
        newTasks[index].text = editedTask;
        setTasks(newTasks);
        setEditingIndex(null);
    };

    const handleCancelEditing = () => {
        setEditingIndex(null);
    };

    return (
        <ScrollView style={styles.container}>
            <KeyboardAvoidingView behavior="height" enabled>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <View style={styles.rowItems}>
                            <Button
                                title="Change theme"
                                onPress={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}
                            />
                            <Button title="Toggle language" onPress={changeLanguage} />
                        </View>
                        {/* HEAD */}
                        <View>
                            <Text style={styles.title}>{t('addTasks')}</Text>
                            {editingIndex === null ? (
                                <TextInput
                                    style={styles.taskInput}
                                    placeholder={addTaskPlaceholder}
                                    value={newTaskName}
                                    onChangeText={setNewTaskName}
                                />
                            ) : (
                                <TextInput style={styles.taskInput} value={editedTask} onChangeText={setEditedTask} />
                            )}
                            {editingIndex === null ? (
                                <Pressable style={styles.pressableAdd} onPress={addTask} disabled={!newTaskName}>
                                    <Text style={styles.addButton}>{t('add')}</Text>
                                </Pressable>
                            ) : (
                                <View style={styles.taskItemButtons}>
                                    <TaskActionButton onPress={() => handleSaveEditing(editingIndex)} text="save" />
                                    <TaskActionButton onPress={handleCancelEditing} text="cancel" />
                                </View>
                            )}
                        </View>
                        <View style={styles.rowItems}>
                            <Text style={styles.title}>{t('listOfTasks')}</Text>
                            <Pressable style={styles.clear} onPress={clearAll}>
                                <AntDesign name="delete" size={40} color="black" />
                            </Pressable>
                        </View>
                        {/* BODY */}
                        <View>
                            {tasks.map((task, index) => (
                                <View style={styles.taskItem} key={index}>
                                    {editingIndex === index ? (
                                        <>
                                            <Text>{t('editingTask')}</Text>
                                        </>
                                    ) : (
                                        <>
                                            <Text style={[styles.taskText, task.done && styles.taskDone]}>
                                                {task.text}
                                            </Text>
                                            <Divider />
                                            <Pressable onPress={() => toggleTaskDone(index)}>
                                                {task.done ? (
                                                    <Icon name="check-circle" size={25} color="green" />
                                                ) : (
                                                    <Icon name="circle-thin" size={25} color="gray" />
                                                )}
                                            </Pressable>
                                            <View style={styles.taskItemButtons}>
                                                <TaskActionButton onPress={() => clearSingleTask(index)} text="del" />
                                                <TaskActionButton
                                                    onPress={() => handleStartEditing(index)}
                                                    text="edit"
                                                />
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
        marginBottom: 20,
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
    taskText: { flex: 1, fontSize: 16, maxWidth: 200 },
});
