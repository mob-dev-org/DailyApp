import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Task = {
    text: string;
    done?: boolean;
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
    name: 'toDo',
    initialState,
    reducers: {
        addNewTask: (state, { payload }: PayloadAction<string>) => {
            state.initialTasks.push({ text: payload });
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
        editTask: (state, action: PayloadAction<{ index: number; editedTask: string }>) => {
            const { index, editedTask } = action.payload;
            state.initialTasks[index].text = editedTask;
        },

        resetTasks: () => initialState,
    },
});

export const { addNewTask, resetTasks, deleteSingleTask, taskIsDone, clearAllTasks } = toDoSlice.actions;

export default toDoSlice.reducer;
