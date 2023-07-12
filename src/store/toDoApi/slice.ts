import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { deletePlayerA } from '@/store/teamA/slice';

type ApiTask = {
    completed: boolean;
    createdAt: string;
    id: string;
    name: string;
    projectId: string | null;
    updatedAt: string;
    userId: string;
};

export type ApiToDo = {
    tasks: ApiTask[];
    editingIndex: number | null;
    newText: string;
    isLoading: boolean;
    refresh: boolean;
};

const initialState = {
    tasks: [],
    editingIndex: null,
    newText: '',
    error: null,
    isLoading: false,
    refresh: false,
} as ApiToDo;

export const apiToDo = createSlice({
    name: 'toDoApi',
    initialState,
    reducers: {
        resetToDoState: () => initialState,

        apiData: (state) => {
            axios.get('https://t3-to-do-nextjs.vercel.app/api/tasks').then((res) => {
                console.log('slice data', res.data);
                state.tasks = res.data;
            });
        },
    },
});

export const { resetToDoState, apiData } = apiToDo.actions;

export default apiToDo.reducer;
