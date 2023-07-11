// import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

import Task from '../Task';
import TaskApi from '../TaskApi';

import { useAppSelector } from '@/store/hooks';

type ApiTask = {
    completed: boolean;
    createdAt: string;
    id: string;
    name: string;
    projectId: string | null;
    updatedAt: string;
    userId: string;
};

function Tasks() {
    // const { data, isLoading, isError, error, refetch } = useQuery<ApiTask[]>({
    //     queryKey: ['mykey'],
    //     queryFn: fetchData,
    // });

    // async function fetchData() {
    //     const { data } = await axios.get('https://t3-to-do-nextjs.vercel.app/api/tasks');
    //     return data;
    // }

    // const syncData = () => {
    //     refetch();
    // };

    const { tasks } = useAppSelector((state) => state.toDo);
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

    const syncData = () => fetchData();

    return (
        <View>
            <Button title="SYNC" onPress={syncData} />
            {isLoading ? (
                <Text>Loading..</Text>
            ) : error ? (
                <Text>Error:{error.message}</Text>
            ) : (
                <View>
                    {apiData.map((task, index) => (
                        <TaskApi key={index} index={index} task={task} />
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
//     const { tasks } = useAppSelector((state) => state.toDo);
//     return (
//         <View>
//             {tasks.map((task, index) => (
//                 <Task key={index} index={index} task={task} />
//             ))}
//         </View>
//     );
// }
