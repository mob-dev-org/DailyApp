import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Task } from '@/constants/Types';

export type toDo = { tasks: Task[] };

const initialState = {
    tasks: [
        { text: 'one', done: false },
        { text: '2', done: false },
        { text: '3', done: false },
        { text: '3', done: false },
    ],
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

        resetTasks: () => initialState,
    },
});

export const { addNewTask, resetTasks, deleteTask, taskIsDone, clearTasks } = toDoSlice.actions;

export default toDoSlice.reducer;
