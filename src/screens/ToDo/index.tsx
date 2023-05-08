import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/atoms/Themed';

export default function TabThreeScreen() {
    type Task = {
        text: string;
    };
    //useState hook for array of tasks
    const [tasks, setTasks] = useState<Task[]>([{ text: 'one' }, { text: 'two' }, { text: 'three' }]);
    //useState hook for adding task
    const [newTask, setNewTask] = useState<string>('');

    //function for adding task in the list
    const addTask = () => {
        if (newTask === '') {
            alert('No task to add');
        } else {
            const newTasks = [...tasks, { text: newTask }];
            setTasks(newTasks);

            setNewTask('');
        }
    };

    return (
        <View style={styles.container}>
            {/* HEAD */}
            <View>
                <Text style={styles.title}>Add Tasks</Text>
                <TextInput
                    style={{ textAlign: 'center', fontSize: 16, borderBottomWidth: 1 }}
                    placeholder="Add task"
                    value={newTask}
                    onChangeText={setNewTask}
                />
                <Pressable disabled={!tasks} style={{ width: 100, alignSelf: 'center' }} onPress={addTask}>
                    <Text style={styles.addButton}>ADD</Text>
                </Pressable>
            </View>
            <Text style={styles.title}>Task List</Text>

            {/* BODY */}
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            <View>
                {tasks.map((task, index) => (
                    <View style={styles.taskItem} key={index}>
                        <Text style={styles.taskText}>{task.text}</Text>
                        <View style={styles.taskItemButtons}>
                            <TouchableOpacity>
                                <View style={styles.actionIcon}>
                                    <Text style={styles.actionIconText}>DEL</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.actionIcon}>
                                    <Text style={styles.actionIconText}>EDIT</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
            {/* BOTTOM */}
            <Pressable style={styles.clear}>
                <Text>
                    <AntDesign name="delete" size={35} color="black" />
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
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
        height: 24,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccfc',
        marginLeft: 5,
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
    addTask: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    taskInput: {
        flex: 1,
        marginRight: 10,
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        fontSize: 16,
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
    separator: {
        marginVertical: 8,
        height: 1,
        width: '80%',
    },
});
