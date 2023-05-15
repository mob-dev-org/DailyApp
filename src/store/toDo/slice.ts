import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Task } from '@/constants/Types';

export type toDo = { tasks: Task[]; editingIndex: number | null; editingTask: string };

const initialState = {
    tasks: [
        { text: 'test1', done: false },
        { text: 'test2', done: false },
        { text: 'test3', done: false },
        { text: 'test4', done: false },
    ],
    editingIndex: null,
    editingTask: '',
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
        saveEditedTask: (state, { payload }: PayloadAction<{ index: number; editingTask: string }>) => {
            const { index, editingTask } = payload;
            state.tasks[index].text = editingTask;
            state.editingIndex = null;
        },
        editTask: (state, { payload }: PayloadAction<number>) => {
            const index = payload;
            state.editingIndex = index;
            state.editingTask = state.tasks[index].text;
        },
        cancelEdit: (state) => {
            state.editingIndex = null;
            state.editingTask = '';
        },
        setEditedText: (state, { payload }: PayloadAction<string>) => {
            state.editingTask = payload;
        },

        resetToDoState: () => initialState,
    },
});

export const {
    addNewTask,
    resetToDoState,
    deleteTask,
    taskIsDone,
    setEditedText,
    clearTasks,
    saveEditedTask,
    cancelEdit,
    editTask,
} = toDoSlice.actions;

export default toDoSlice.reducer;
