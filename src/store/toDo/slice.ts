import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Task } from '@/constants/Types';

export type toDo = { tasks: Task[] };

const initialState = {
    tasks: [
        { text: 'one', done: false },
        { text: 'two', done: false },
        { text: 'three', done: false },
    ],
} as toDo;

export const teamASlice = createSlice({
    name: 'teamA',
    initialState,
    reducers: {
        addTask: (state, { payload }: PayloadAction<Task>) => {
            state.tasks.push(payload);
        },
        deleteSingleTask: (state, { payload }: PayloadAction<number>) => {
            state.tasks.splice(payload, 1);
        },
        taskIsDone: (state, { payload }: PayloadAction<{ index: number; done: boolean }>) => {
            const { index, done } = payload;
            state.tasks[index].done = done;
        },

        resetTasks: () => initialState,
    },
});

export const { addTask, resetTasks, deleteSingleTask, taskIsDone } = teamASlice.actions;

export default teamASlice.reducer;
