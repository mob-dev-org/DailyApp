import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { View } from '@/components/atoms/Themed';
import MainButtons from '@/components/molecules/AppearanceButtons';
import ClearList from '@/components/molecules/ClearList';
import Tasks from '@/components/molecules/ListOfTasks';
import TaskInput from '@/components/molecules/TaskInput';
import alertMessages from '@/helpers/AlertMessage';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    addProject,
    cancelEditing,
    deleteProject,
    deleteProjects,
    saveEditedTask,
    setEditedText,
    toggleEditTask,
} from '@/store/toDoProjects/slice';

export default function ToDoScreen() {
    const { newText, projectEditingIndex, projects } = useAppSelector((state) => state.projects);
    const [newSubjectName, setNewSubjectName] = useState<string>('');
    const [showTasks, setShowTasks] = useState<boolean>(false);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const addSubject = () => {
        if (!newSubjectName) {
            alert(t('emptySub'));
            return;
        }
        if (projects.find((project) => project.name === newSubjectName)) {
            alert(t('duplicateSub'));
            return;
        }
        dispatch(addProject(newSubjectName));
        setNewSubjectName('');
    };

    const removeSubject = (projectId: string) => {
        dispatch(deleteProject(projectId));
    };
    const removeSubjectMessage = (projectId: string) =>
        alertMessages({
            title: 'DELETE',
            message: t('deleteAllTasks'),
            onPress: () => removeSubject(projectId),
            buttonText: 'DELETE',
            buttonStyle: 'destructive',
        });

    const removeAllSubject = () => dispatch(deleteProjects());
    const removeAllSubjectMessage = () =>
        alertMessages({
            title: 'DELETE',
            message: t('deleteAllTasks'),
            onPress: removeAllSubject,
            buttonText: 'DELETE',
            buttonStyle: 'destructive',
        });

    const startEditingProject = (index: number) => {
        dispatch(toggleEditTask(index));
    };

    const cancelEditingProject = () => {
        dispatch(cancelEditing());
    };

    const saveEditedProject = (index: number, projectName: string) => {
        if (!newText) {
            Alert.alert(t('error'), t('emptyTask') || '');
            return;
        }
        dispatch(saveEditedTask(projectName));
    };
    const updateEditProject = (text: string) => dispatch(setEditedText(text));

    const toggleShowTasks = () => {
        setShowTasks((showTasks) => !showTasks);
    };

    return (
        <SafeAreaView style={styles.container}>
            <MainButtons />
            <Button title="CLEAR ALL SUBJECT" onPress={removeAllSubjectMessage} />
            <View style={styles.addSubjectContainer}>
                <TextInput
                    style={styles.input}
                    value={newSubjectName}
                    onChangeText={setNewSubjectName}
                    placeholder="Enter subject name"
                />
                <Button title="Add Subject" onPress={addSubject} />
            </View>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        {projects.map((project, index) => (
                            <View key={project.id}>
                                {projectEditingIndex === index ? (
                                    <View>
                                        <TextInput
                                            style={styles.input}
                                            value={newText}
                                            onChangeText={updateEditProject}
                                        />
                                        <Button title="Save" onPress={() => saveEditedProject(index, newText)} />
                                        <Button title="Cancel" onPress={cancelEditingProject} />
                                    </View>
                                ) : (
                                    <View>
                                        <View style={styles.projectHeader}>
                                            <Text style={styles.listName}>{project.name}</Text>
                                            <Button
                                                title={showTasks ? 'Hide Tasks' : 'Show Tasks'}
                                                onPress={toggleShowTasks}
                                            />
                                            <Button title="DEL" onPress={() => removeSubjectMessage(project.id)} />
                                            <Button title="Edit" onPress={() => startEditingProject(index)} />
                                        </View>
                                        {showTasks && (
                                            <>
                                                <TaskInput />
                                                <ClearList />
                                                <Tasks />
                                            </>
                                        )}
                                    </View>
                                )}
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
    },
    addSubjectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        marginRight: 10,
        padding: 10,
    },
    projectHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    listName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
});
