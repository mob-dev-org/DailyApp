import { useTranslation } from 'react-i18next';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import TaskActionButton from '@/components/atoms/TaskActionButton';
import { Text, View } from '@/components/atoms/Themed';
import MainButtons from '@/components/molecules/AppearanceButtons';
import Tasks from '@/components/molecules/ListOfTasks';
import TaskInput from '@/components/molecules/TaskInput';
import alertMessages from '@/helpers/AlertMessage';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearTasks } from '@/store/toDo/slice';

export default function TabThreeScreen() {
    const { editingIndex } = useAppSelector((state) => state.toDo);
    const isEditing = editingIndex !== null;

    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const clearAll = () => dispatch(clearTasks());

    const alertMessage = () =>
        alertMessages({
            title: 'DELETE',
            message: 'Delete all tasks!?',
            onPress: clearAll,
            buttonText: 'DELETE',
            buttonStyle: 'destructive',
        });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <MainButtons />
                        <TaskInput />
                        <View style={styles.rowItems}>
                            <Text style={styles.title}>{t('listOfTasks')}</Text>
                            {!isEditing && <TaskActionButton onPress={alertMessage} text="deleteAll" />}
                        </View>
                        <Tasks />
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    rowItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginBottom: 10,
        textAlign: 'center',
        justifyContent: 'center',
    },
});
