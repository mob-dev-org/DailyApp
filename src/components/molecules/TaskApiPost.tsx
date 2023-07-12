import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, TextInput } from 'react-native';

import { ApiTask } from './TaskApi';

import TaskActionButton from '@/components/atoms/TaskActionButton';
import { Text, View } from '@/components/atoms/Themed';
import alertMessages from '@/helpers/AlertMessage';

export default function TaskApiInput() {
    const { t } = useTranslation();
    const [apiTask, setApiTask] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiData, setData] = useState<ApiTask[]>([]);

    const addApiTask = async () => {
        if (!apiTask) {
            Alert.alert(t('error'), t('emptyTask') || '');
            return;
        }
        setIsLoading(true);
        try {
            await axios.post('https://t3-to-do-nextjs.vercel.app/api/tasks', { name: apiTask });
            alertMessages({ title: 'Success', message: 'Task added to API' });
            setApiTask('');
            // fetchData();
            setIsLoading(false);
        } catch (error) {
            console.log(`Error: ${error}`);
            alertMessages({ title: 'Ups..', message: `Error: ${error}` });
            setIsLoading(false);
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get('https://t3-to-do-nextjs.vercel.app/api/tasks');
            setData(data);
            setIsLoading(false);
        } catch (error) {
            console.log('Error', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData;
    }, [isLoading]);

    return (
        <View>
            <Text style={styles.title}>{'Add task to API'}</Text>
            <TextInput
                style={styles.taskInput}
                placeholder={t('addTaskPlaceholder') || ''}
                value={apiTask}
                onChangeText={setApiTask}
            />

            {isLoading ? (
                <TaskActionButton onPress={() => null} text="Adding..." />
            ) : (
                <TaskActionButton onPress={addApiTask} text="Add" />
            )}
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

// const fetchData = async () => {
//     setIsLoading(true);
//     try {
//         const { data } = await axios.get('https://t3-to-do-nextjs.vercel.app/api/tasks');
//         setData(data);
//         setIsLoading(false);
//     } catch (error) {
//         console.log('Error', error);
//         setIsLoading(false);
//     }
// };

// useEffect(() => {
//     fetchData;
// }, [isLoading]);
