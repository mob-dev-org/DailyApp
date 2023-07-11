import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';

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
    index: number;
};

export default function TaskApi({ task }: TaskProps) {
    const deleteApiTask = async (id) => {
        try {
            await axios.delete(`https://t3-to-do-nextjs.vercel.app/api/tasks/${id}`);
            alertMessages({ title: 'Success', message: 'Task deleted from API ' });
        } catch (error) {
            alertMessages({ title: 'Ups..', message: `Error: ${error}` });
        }
    };

    return (
        <View style={styles.taskItem}>
            <>
                <Text style={[styles.taskText, task.completed && styles.taskDone]}>{task.name}</Text>
                <Divider />
                <View style={styles.taskItemButtons}>
                    <TaskActionButton onPress={() => deleteApiTask(task.id)} text="del" />
                    <TaskActionButton onPress={() => null} text="edit" />
                </View>
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
