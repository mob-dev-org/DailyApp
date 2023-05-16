import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';

import alertMessage from '@/components/atoms/AlertMessage';
import Checkbox from '@/components/atoms/Checkbox';
import TaskActionButton from '@/components/atoms/TaskActionButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteTask, taskIsDone, toggleEditTask } from '@/store/toDo/slice';

export default function Tasks() {
    const { tasks, editingIndex } = useAppSelector((state) => state.toDo);

    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isEditing = editingIndex === null;
    const toggleTaskDone = (index: number) => dispatch(taskIsDone({ index }));
    const clearTask = (index: number) => dispatch(deleteTask(index));
    const editTask = (index: number) => dispatch(toggleEditTask(index));

    return (
        <>
            <View>
                {tasks.map((task, index) => (
                    <View style={styles.taskItem} key={index}>
                        {editingIndex === index ? (
                            <Text>{t('editingTask')}</Text>
                        ) : (
                            <>
                                <Checkbox done={task.done} onPress={() => toggleTaskDone(index)} />
                                <Text style={[styles.taskText, task.done && styles.taskDone]}>{task.text}</Text>
                                <Divider />
                                <View style={styles.taskItemButtons}>
                                    {isEditing && (
                                        <TaskActionButton
                                            onPress={() =>
                                                alertMessage({
                                                    title: 'DELETE',
                                                    message: 'Delete all tasks!?',
                                                    onPress: () => clearTask(index),
                                                    buttonText: 'DELETE',
                                                    buttonStyle: 'destructive',
                                                })
                                            }
                                            text="del"
                                        />
                                    )}
                                    {!task.done && <TaskActionButton onPress={() => editTask(index)} text="edit" />}
                                </View>
                            </>
                        )}
                    </View>
                ))}
            </View>
        </>
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
