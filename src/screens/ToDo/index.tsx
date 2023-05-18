import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { View } from '@/components/atoms/Themed';
import MainButtons from '@/components/molecules/AppearanceButtons';
import ClearList from '@/components/molecules/ClearList';
import Tasks from '@/components/molecules/ListOfTasks';
import TaskInput from '@/components/molecules/TaskInput';

export default function ToDoScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <MainButtons />
                        <TaskInput />
                        <ClearList />
                        <Tasks />
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
});
