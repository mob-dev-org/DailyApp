import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { Task as TaskType } from '@/constants/Types';

export type ToDo = { tasks: TaskType[]; editingIndex: number | null; newText: string; name: string };
const initialState = {
    tasks: [
        { text: 'test1', done: false, id: uuidv4() },
        { text: 'test2', done: false, id: uuidv4() },
    ],
    editingIndex: null,
    newText: '',
} as ToDo;

export const toDoSlice = createSlice({
    name: 'toDo',
    initialState,
    reducers: {
        addNewTask: (state, { payload }: PayloadAction<string>) => {
            state.tasks.push({ id: uuidv4(), text: payload });
        },
        deleteTask: (state, { payload }: PayloadAction<number>) => {
            state.tasks.splice(payload, 1);
        },
        taskIsDone: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            state.tasks[index].done = !state.tasks[index].done;
        },
        clearTasks: (state) => {
            state.tasks = [];
        },

        saveEditedTask: (state, { payload }: PayloadAction<string>) => {
            const index = state.editingIndex;
            const newText = payload;
            if (index !== null) {
                state.tasks[index].text = newText;
                state.editingIndex = null;
            }
        },
        toggleEditTask: (state, { payload }: PayloadAction<number>) => {
            const index = payload;
            state.editingIndex = index;
            state.newText = state.tasks[index].text;
        },
        cancelEditing: (state) => {
            state.editingIndex = null;
            state.newText = '';
        },
        setEditedText: (state, { payload }: PayloadAction<string>) => {
            state.newText = payload;
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
    cancelEditing,
    toggleEditTask,
} = toDoSlice.actions;

export default toDoSlice.reducer;
