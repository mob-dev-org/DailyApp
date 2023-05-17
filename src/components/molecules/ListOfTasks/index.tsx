import { View } from 'react-native';

import SingleTask from '../Task';

import { useAppSelector } from '@/store/hooks';

export default function Tasks() {
    const { tasks } = useAppSelector((state) => state.toDo);

    return (
        <View>
            {tasks.map((task, index) => (
                <SingleTask key={index} index={index} task={task} />
            ))}
        </View>
    );
}
