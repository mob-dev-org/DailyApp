import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Divider, TextInput } from 'react-native-paper';

import TaskActionButton from '@/components/atoms/TaskActionButton';
import alertMessages from '@/helpers/AlertMessage';

export type ApiTask = {
    completed: boolean;
    createdAt: string;
    id: string;
    name: string;
    projectId: string | null;
    updatedAt: string;
    userId: string;
};

type TaskProps = {
    task: ApiTask;
};

export default function TaskApi({ task }: TaskProps) {
    const { t } = useTranslation();
    const [apiTaskName, setApiTaskName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState(false);

    const startEditing = () => {
        setApiTaskName(task.name);
        setIsEditing(true);
    };
    const cancelEditing = () => {
        setApiTaskName('');
        setIsEditing(false);
    };

    const deleteApiTask = async (id) => {
        try {
            await axios.delete(`https://t3-to-do-nextjs.vercel.app/api/tasks/${id}`);
            alertMessages({ title: 'Success', message: 'Task deleted from API ' });
        } catch (error) {
            alertMessages({ title: 'Ups..', message: `Error: ${error}` });
        }
    };

    const saveApiTask = async () => {
        if (!apiTaskName) {
            alertMessages({ title: 'Empty', message: 'Cant save empty task' });
            return;
        }
        try {
            await axios.put(`https://t3-to-do-nextjs.vercel.app/api/tasks/${task.id}`, { name: apiTaskName });
            alertMessages({ title: 'Success', message: 'Task changed' });
        } catch (error) {
            alertMessages({ title: 'Ups..', message: `Error: ${error}` });
        }
    };

    const fetchData = async () => {
        try {
            const { data } = await axios.get('https://t3-to-do-nextjs.vercel.app/api/tasks');
            console.log(data);
        } catch (error) {
            alertMessages({ title: 'Ups..', message: `Error: ${error}` });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.taskItem}>
            <>
                {!isEditing ? (
                    <Text style={[styles.taskText, task.completed && styles.taskDone]}>{task.name}</Text>
                ) : (
                    <TextInput onChangeText={setApiTaskName} defaultValue={task.name} />
                )}
                <Divider />
                {!isEditing ? (
                    <View style={styles.taskItemButtons}>
                        <TaskActionButton onPress={() => deleteApiTask(task.id)} text="del" />
                        <TaskActionButton onPress={startEditing} text="edit" />
                    </View>
                ) : (
                    <View style={styles.taskItemButtons}>
                        <TaskActionButton onPress={saveApiTask} text="save" />
                        <TaskActionButton onPress={cancelEditing} text="cancel" />
                    </View>
                )}
            </>
        </View>
    );
}

const styles = StyleSheet.create({
    taskItemButtons: {
        flexDirection: 'row',
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
    taskDone: {
        textDecorationLine: 'line-through',
    },
});
