import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

function MyComponent() {
    const [data, setData] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
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

            {loading ? (
                <Text>Loading...</Text>
            ) : error ? (
                <Text>Error: {error.message}</Text>
            ) : (
                <View>
                    {data.map((item) => (
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
