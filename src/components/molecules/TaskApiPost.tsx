import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, TextInput } from 'react-native';

import TaskActionButton from '@/components/atoms/TaskActionButton';
import { Text, View } from '@/components/atoms/Themed';
import alertMessages from '@/helpers/AlertMessage';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addNewTask, cancelEditing, saveEditedTask, setEditedText } from '@/store/toDo/slice';

type ApiTask = {
    completed: boolean;
    createdAt: string;
    id: string;
    name: string;
    projectId: string | null;
    updatedAt: string;
    userId: string;
};

export default function TaskApiInput() {
    const { t } = useTranslation();
    const [apiTask, setApiTask] = useState<string>('');
    const [apiData, setData] = useState<ApiTask[]>([]);

    const addApiTask = async () => {
        if (!apiTask) {
            Alert.alert(t('error'), t('emptyTask') || '');
            return;
        }
        try {
            await axios.post('https://t3-to-do-nextjs.vercel.app/api/tasks', { name: apiTask });
            alertMessages({ title: 'Success', message: 'Task added to API' });
            setApiTask('');
            fetchData();
        } catch (error) {
            console.log(`Error: ${error}`);
            alertMessages({ title: 'Ups..', message: `Error: ${error}` });
        }
    };

    const fetchData = async () => {
        try {
            const { data } = await axios.get('https://t3-to-do-nextjs.vercel.app/api/tasks');
            setData(data);
            console.log('Dobavi api', data);
        } catch (error) {
            alertMessages({ title: 'Ups..', message: `Error: ${error}` });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View>
            <Text style={styles.title}>{'Add task to API'}</Text>
            <TextInput
                style={styles.taskInput}
                placeholder={t('addTaskPlaceholder') || ''}
                value={apiTask}
                onChangeText={setApiTask}
            />
            <TaskActionButton onPress={addApiTask} text="add" />
        </View>
    );
}

const styles = StyleSheet.create({
    rowItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    taskInput: {
        textAlign: 'center',
        fontSize: 16,
        borderBottomWidth: 1,
    },
    taskItemButtons: {
        flexDirection: 'row',
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
