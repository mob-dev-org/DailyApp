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
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import Task from '../Task';

import { useAppSelector } from '@/store/hooks';

interface Task {
    completed: boolean;
    createdAt: string;
    id: string;
    name: string;
    projectId: string | null;
    updatedAt: string;
    userId: string;
}

function Tasks() {
    const { tasks } = useAppSelector((state) => state.toDo);
    const [fetchedTasks, setFetchedTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://t3-to-do-nextjs.vercel.app/api/tasks');
                const data = await response.json();
                setFetchedTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <View>
            {tasks.map((task, index) => (
                <Task key={index} index={index} task={task} />
            ))}
            {fetchedTasks.map((task, index) => (
                <Task key={index} index={index} task={task.name} />
            ))}
        </View>
    );
}

export default Tasks;
