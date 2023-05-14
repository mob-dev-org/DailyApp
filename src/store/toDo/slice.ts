import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Task } from '@/constants/Types';

export type toDo = { tasks: Task[]; editingIndex: number | null; editedTask: string };

const initialState = {
    tasks: [
        { text: 'one', done: false },
        { text: '2', done: false },
        { text: '3', done: false },
        { text: '3', done: false },
    ],
    editingIndex: null,
    editedTask: '',
} as toDo;

export const toDoSlice = createSlice({
    name: 'toDo',
    initialState,
    reducers: {
        addNewTask: (state, { payload }: PayloadAction<string>) => {
            state.tasks.push({ text: payload });
        },
        deleteTask: (state, { payload }: PayloadAction<number>) => {
            state.tasks.splice(payload, 1);
        },
        taskIsDone: (state, { payload }: PayloadAction<{ index: number }>) => {
            const { index } = payload;
            state.tasks[index].done = !state.tasks[index].done;
        },
        clearTasks: (state) => {
            state.tasks = [];
        },
        saveEditedTask: (state, { payload }: PayloadAction<{ index: number; editedTask: string }>) => {
            const { index, editedTask } = payload;
            state.tasks[index].text = editedTask;
            state.editingIndex = null;
        },
        editTask: (state, { payload }: PayloadAction<number>) => {
            const index = payload;
            state.editingIndex = index;
            state.editedTask = state.tasks[index].text;
        },
        cancelEdit: (state) => {
            state.editingIndex = null;
            state.editedTask = '';
        },
        setEditedText: (state, { payload }: PayloadAction<string>) => {
            state.editedTask = payload;
        },

        resetTasks: () => initialState,
    },
});

export const {
    addNewTask,
    resetTasks,
    deleteTask,
    taskIsDone,
    setEditedText,
    clearTasks,
    saveEditedTask,
    cancelEdit,
    editTask,
} = toDoSlice.actions;

export default toDoSlice.reducer;
