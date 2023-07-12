import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

import TaskApi, { ApiTask } from '../TaskApi';

import { useAppSelector } from '@/store/hooks';

function Tasks() {
    const { tasks } = useAppSelector((state) => state.apiToDo);
    const [apiData, setData] = useState<ApiTask[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('https://t3-to-do-nextjs.vercel.app/api/tasks');
            setData(data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const syncData = () => {
        fetchData();
        console.log('Test slice', tasks);
    };

    const deleteApiTaskLocally = (id: string) => {
        setData((prevData) => prevData.filter((task) => task.id !== id));
    };

    return (
        <View>
            <Button title="SYNC" onPress={syncData} />
            {isLoading ? (
                <Text>Loading..</Text>
            ) : error ? (
                <Text>Error:{error.message}</Text>
            ) : (
                <View>
                    {apiData.map((task: ApiTask, index: number) => (
                        <TaskApi key={task.id} task={task} onDelete={deleteApiTaskLocally} />
                    ))}
                </View>
            )}
        </View>
    );
}
export default Tasks;
// import { View } from 'react-native';

// import Task from '../Task';

// import { useAppSelector } from '@/store/hooks';

// export default function Tasks() {
//     const { tasks } = useAppSelector((state) => state.apiToDo);

//     return (
//         <View>
//             {tasks.map((task, index) => (
//                 <Task key={index} index={index} task={task} />
//             ))}
//         </View>
//     );
// }
