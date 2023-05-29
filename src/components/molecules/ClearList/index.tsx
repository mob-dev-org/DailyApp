import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import TaskActionButton from '@/components/atoms/TaskActionButton';
import { Text, View } from '@/components/atoms/Themed';
import alertMessages from '@/helpers/AlertMessage';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearTasks } from '@/store/toDo/slice';

export default function ClearList() {
    const { editingIndex } = useAppSelector((state) => state.toDo);
    const isEditing = editingIndex !== null;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const clearAll = () => dispatch(clearTasks());
    const alertMessage = () =>
        alertMessages({
            title: 'DELETE',
            message: t('deleteAllTasks'),
            onPress: clearAll,
            buttonText: 'DELETE',
            buttonStyle: 'destructive',
        });
    return (
        <View style={styles.rowItems}>
            <Text style={styles.title}>{t('listOfTasks')}</Text>
            {!isEditing && <TaskActionButton onPress={alertMessage} text="deleteAll" />}
        </View>
    );
}
const styles = StyleSheet.create({
    rowItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
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
