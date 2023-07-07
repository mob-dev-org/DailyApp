import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { View } from '@/components/atoms/Themed';
import MainButtons from '@/components/molecules/AppearanceButtons';
import ClearList from '@/components/molecules/ClearList';
import Tasks from '@/components/molecules/ListOfTasks';
import TaskInput from '@/components/molecules/TaskInput';
import TestComponent from '@/components/molecules/TestApi';

export default function ToDoScreen() {
    const queryClient = new QueryClient();

    return (
        <SafeAreaView style={styles.container}>
            <QueryClientProvider client={queryClient}>
                <ScrollView>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>
                            <MainButtons />
                            <TaskInput />
                            <ClearList />
                            {/* <TestComponent /> */}
                            <Tasks />
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </QueryClientProvider>
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
