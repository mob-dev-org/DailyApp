import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';

import alertMessages from '@/components/atoms/AlertMessage';
import Checkbox from '@/components/atoms/Checkbox';
import TaskActionButton from '@/components/atoms/TaskActionButton';
import { Task } from '@/constants/Types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteTask, taskIsDone, toggleEditTask } from '@/store/toDo/slice';

type TaskProps = {
    task: Task;
    index: number;
};

export default function SingleTask({ task, index }: TaskProps) {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const { editingIndex } = useAppSelector((state) => state.toDo);

    const isEditing = editingIndex !== null;
    const clearTask = (index: number) => dispatch(deleteTask(index));
    const toggleTaskDone = (index: number) => dispatch(taskIsDone({ index }));
    const editTask = (index: number) => dispatch(toggleEditTask(index));
    const alertMessage = () =>
        alertMessages({
            title: 'DELETE',
            message: 'Delete all tasks!?',
            onPress: () => clearTask(index),
            buttonText: 'DELETE',
            buttonStyle: 'destructive',
        });

    return (
        <View style={styles.taskItem}>
            {editingIndex === index ? (
                <Text>{t('editingTask')}</Text>
            ) : (
                <>
                    <Checkbox done={task.done} onPress={() => toggleTaskDone(index)} />
                    <Text style={[styles.taskText, task.done && styles.taskDone]}>{task.text}</Text>
                    <Divider />
                    <View style={styles.taskItemButtons}>
                        {!isEditing && <TaskActionButton onPress={alertMessage} text="del" />}
                        {!task.done && <TaskActionButton onPress={() => editTask(index)} text="edit" />}
                    </View>
                </>
            )}
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
