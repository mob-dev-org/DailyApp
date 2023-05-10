import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Task = {
    text: string;
    isEditing?: boolean;
    done: boolean;
};

export type toDo = { initialTasks: Task[] };

const initialState = {
    initialTasks: [
        { text: 'one', done: false },
        { text: '2', done: false },
        { text: '3', done: false },
        { text: '3', done: false },
    ],
} as toDo;

export const toDoSlice = createSlice({
    name: 'toDO',
    initialState,
    reducers: {
        addNewTask: (state, { payload }: PayloadAction<Task>) => {
            state.initialTasks.push(payload);
        },
        deleteSingleTask: (state, { payload }: PayloadAction<number>) => {
            state.initialTasks.splice(payload, 1);
        },
        taskIsDone: (state, { payload }: PayloadAction<{ index: number; done: boolean }>) => {
            const { index, done } = payload;
            state.initialTasks[index].done = done;
        },
        clearAllTasks: (state) => {
            state.initialTasks = [];
        },

        resetTasks: () => initialState,
    },
});

export const { addNewTask, resetTasks, deleteSingleTask, taskIsDone, clearAllTasks } = toDoSlice.actions;

export default toDoSlice.reducer;
