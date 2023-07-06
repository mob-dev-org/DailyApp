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
            const response = await fetch('https://t3-to-do-nextjs.vercel.app/api/tasks');
            const data: Task[] = await response.json();
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
