import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';

import Checkbox from '@/components/atoms/Checkbox';
import TaskActionButton from '@/components/atoms/TaskActionButton';
import alertMessages from '@/helpers/AlertMessage';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteTask, taskIsDone, toggleEditTask } from '@/store/toDo/slice';

interface ApiTask {
    completed: boolean;
    createdAt: string;
    id: string;
    name: string;
    projectId: string | null;
    updatedAt: string;
    userId: string;
}

type TaskProps = {
    task: ApiTask;
    index: number;
};

export default function TaskApi({ task }: TaskProps) {
    return (
        <View style={styles.taskItem}>
            <>
                <Text style={[styles.taskText, task.completed && styles.taskDone]}>{task.name}</Text>
                <Divider />
                <View style={styles.taskItemButtons}>
                    <TaskActionButton onPress={() => null} text="del" />
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
