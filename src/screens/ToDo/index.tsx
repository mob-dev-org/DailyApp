import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { View } from '@/components/atoms/Themed';
import MainButtons from '@/components/molecules/AppearanceButtons';
import ClearList from '@/components/molecules/ClearList';
import Tasks from '@/components/molecules/ListOfTasks';
import TaskInput from '@/components/molecules/TaskInput';
import alertMessages from '@/helpers/AlertMessage';

export default function ToDoScreen() {
    const [subjectNames, setSubjectNames] = useState<string[]>(['SUB', 'SUB2']);
    const [newSubjectName, setNewSubjectName] = useState<string>('');
    const { t } = useTranslation();

    const addSubject = () => {
        if (!newSubjectName) {
            alert(t('emptySub'));
            return;
        }
        if (subjectNames.includes(newSubjectName)) {
            alert(t('duplicateSub'));
            return;
        }
        setSubjectNames([...subjectNames, newSubjectName]);
        setNewSubjectName('');
    };

    const removeSubject = (index: number) => {
        const updatedSubjectNames = [...subjectNames];
        updatedSubjectNames.splice(index, 1);
        setSubjectNames(updatedSubjectNames);
    };
    const removeSubjectMessage = (index: number) =>
        alertMessages({
            title: 'DELETE',
            message: t('deleteAllTasks'),
            onPress: () => removeSubject(index),
            buttonText: 'DELETE',
            buttonStyle: 'destructive',
        });

    const removeAllSubject = () => setSubjectNames([]);
    const removeAllSubjectMessage = () =>
        alertMessages({
            title: 'DELETE',
            message: t('deleteAllTasks'),
            onPress: removeAllSubject,
            buttonText: 'DELETE',
            buttonStyle: 'destructive',
        });

    return (
        <SafeAreaView style={styles.container}>
            <MainButtons />
            <Button title="CLEAR ALL SUBJECT " onPress={removeAllSubjectMessage} />
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <View style={styles.addSubjectContainer}>
                            <Button title="Add Subject" onPress={addSubject} />

                            <TextInput
                                style={styles.input}
                                value={newSubjectName}
                                onChangeText={setNewSubjectName}
                                placeholder="Enter subject name"
                            />
                        </View>
                        {subjectNames.map((subjectName, index) => (
                            <View key={index}>
                                <Text style={styles.listName}>{subjectName}</Text>
                                <Button title="DEL" onPress={() => removeSubjectMessage(index)} />
                                <TaskInput />
                                <ClearList />
                                <Tasks />
                            </View>
                        ))}
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
    listName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 10,
    },
    addSubjectContainer: {
        marginBottom: 10,
    },
});
