import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Button, Text, View } from 'react-native';

interface Task {
    completed: boolean;
    createdAt: string;
    id: string;
    name: string;
    projectId: string | null;
    updatedAt: string;
    userId: string;
}

async function fetchData() {
    const { data } = await axios.get('https://t3-to-do-nextjs.vercel.app/api/tasks');
    return data;
}

function MyComponent() {
    const { data, isLoading, isError, error, refetch } = useQuery<Task[]>({
        queryKey: ['mykey'],
        queryFn: fetchData,
    });

    const sync = () => {
        refetch();
    };

    return (
        <View>
            <Button title="SYNC" onPress={sync} />

            {isLoading ? (
                <Text>Loading...</Text>
            ) : isError ? (
                <Text>Error: {error?.message} </Text>
            ) : (
                <View>
                    {data?.map((item) => (
                        <Text key={item.id}>{item.name}</Text>
                    ))}
                </View>
            )}
        </View>
    );
}

export default MyComponent;

// import React, { useEffect, useState } from 'react';
// import { Text, View } from 'react-native';

// interface Task {
//     completed: boolean;
//     createdAt: string;
//     id: string;
//     name: string;
//     projectId: string | null;
//     updatedAt: string;
//     userId: string;
// }

// function MyComponent() {
//     const [data, setData] = useState<Task[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<Error | null>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('https://t3-to-do-nextjs.vercel.app/api/tasks');
//                 const jsonData: Task[] = await response.json();
//                 setData(jsonData);
//                 setLoading(false);
//             } catch (error) {
//                 setError(error);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <View>
//             {loading ? (
//                 <Text>Loading...</Text>
//             ) : error ? (
//                 <Text>Error: {error.message}</Text>
//             ) : (
//                 <View>
//                     {data.map((item) => (
//                         <Text key={item.id}>{item.name}</Text>
//                     ))}
//                 </View>
//             )}
//         </View>
//     );
// }

// export default MyComponent;
