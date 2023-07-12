import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ApiTask } from '@/components/molecules/TaskApi';
import { deletePlayerA } from '@/store/teamA/slice';

export type ApiToDo = {
    tasks: any;
    isLoading: boolean;
    refresh: boolean;
    error: null;
};

const initialState = {
    tasks: [{ name: 'harun', completed: false }],
    isLoading: true,
    refresh: true,
} as ApiToDo;

export const apiToDoslice = createSlice({
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
        deleteTask: (state, action: PayloadAction<string>) => {
            const taskId = action.payload;
            state.tasks = state.tasks.filter((task) => task.id !== taskId);
        },
    },
});

export const { resetToDoState, apiData, deleteTask } = apiToDoslice.actions;

export default apiToDoslice.reducer;
