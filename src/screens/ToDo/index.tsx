import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Pressable, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';

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
        { text: 'one', isEditing: false },
        { text: 'two', isEditing: false },
        { text: 'three', isEditing: false },
    ]);
    //useState hook for adding task
    const [newTask, setNewTask] = useState<string>('');
    //useState for editing
    const [editedTask, setEditedTask] = useState<string>('');
    //useState for user to display the task is it editable or not
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    //function for adding task in the list
    const addTask = () => {
        const newTasks = [...tasks, { text: newTask, isEditing: false }];
        setTasks(newTasks);
        setNewTask('');
    };

    console.log('Tasks', tasks);
    //function for clearing all tasks
    const clearAll = () => {
        setTasks([]);
    };

    //function for clearing single task on certiain index
    const clearSingleTask = (index: number) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    const handleStartEditing = (index: number) => {
        setEditedTask(tasks[index].text);
        setEditingIndex(index);
        console.log('EDIT', editedTask);
        console.log('Index', editingIndex);
    };

    const handleSaveEditing = (index: number) => {
        const newTasks = [...tasks];
        newTasks[index].text = editedTask;
        setTasks(newTasks);
        setEditingIndex(null);
    };
    const handleCancelEditing = () => {
        setEditingIndex(null);
    };

    return (
        <View style={styles.container}>
            <Button title="Change theme" onPress={() => changeTheme(theme === 'dark' ? 'light' : 'dark')} />
            <Button title="Toggle language" onPress={changeLanguage} />
            {/* HEAD */}
            <View>
                <Text style={styles.title}>{t('addTasks')}</Text>
                <TextInput style={styles.taskInput} placeholder="Add task" value={newTask} onChangeText={setNewTask} />
                <Pressable style={styles.pressableAdd} onPress={addTask} disabled={!newTask}>
                    <Text style={styles.addButton}>{t('add')}</Text>
                </Pressable>
            </View>
            <Text style={styles.title}>{t('listOfTasks')}</Text>

            {/* BODY */}

            <View>
                {tasks.map((task, index) => (
                    <View style={styles.taskItem} key={index}>
                        {editingIndex === index ? (
                            <>
                                <TextInput
                                    style={styles.taskInput2}
                                    placeholder="...."
                                    value={editedTask}
                                    onChangeText={setEditedTask}
                                />
                                <View style={styles.taskItemButtons}>
                                    <TouchableOpacity onPress={() => handleSaveEditing(index)}>
                                        <View style={styles.actionIcon}>
                                            <Text style={styles.actionIconText}>{t('save')}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleCancelEditing}>
                                        <View style={styles.actionIcon}>
                                            <Text style={styles.actionIconText}>{t('cancel')}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            <>
                                <Text style={styles.taskText}>{task.text}</Text>
                                <Divider />

                                <View style={styles.taskItemButtons}>
                                    <TouchableOpacity onPress={() => clearSingleTask(index)}>
                                        <View style={styles.actionIcon}>
                                            <Text style={styles.actionIconText}>{t('del')}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleStartEditing(index)}>
                                        <View style={styles.actionIcon}>
                                            <Text style={styles.actionIconText}>{t('edit')}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                ))}
            </View>
            {/* BOTTOM */}
            <Pressable style={styles.clear} onPress={clearAll}>
                <AntDesign name="delete" size={35} color="black" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    taskInput2: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 10,
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
        marginTop: 'auto',
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
        fontSize: 16,
    },
});
