import { View } from 'react-native';

import Task from '../Task';

import { useAppSelector } from '@/store/hooks';

export default function Tasks() {
    const { tasks } = useAppSelector((state) => state.toDo);

    return (
        <View>
            {tasks.map((task, index) => (
                <Task key={index} index={index} task={task} />
            ))}
        </View>
    );
}
