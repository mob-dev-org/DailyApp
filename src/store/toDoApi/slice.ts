import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

type ApiTask = {
    completed: boolean;
    createdAt: string;
    id: string;
    name: string;
    projectId: string | null;
    updatedAt: string;
    userId: string;
};

export type ApiToDo = { tasks: ApiTask[]; editingIndex: number | null; newText: string };

const initialState = {
    tasks: [],
    editingIndex: null,
    newText: '',
    isLoading: false,
    error: null,
} as ApiToDo;

export const toDoSlice = createSlice({
    name: 'toDoApi',
    initialState,
    reducers: {
        resetToDoState: () => initialState,
    },
});

export const { resetToDoState } = toDoSlice.actions;

export default toDoSlice.reducer;
