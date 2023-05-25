import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export type Project = {
    id: string;
    name: string;
};
const initialState: Project[] = [
    {
        id: uuidv4(),
        name: 'Project 1',
    },
    {
        id: uuidv4(),
        name: 'Project 2',
    },
];
const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state, action: PayloadAction<string>) => {
            state.push({ id: uuidv4(), name: action.payload });
        },
        deleteProject: (state, action: PayloadAction<string>) => {
            return state.filter((project) => project.id !== action.payload);
        },
        resetProjectState: () => initialState,
    },
});
export const { addProject, deleteProject, resetProjectState } = projectSlice.actions;
export default projectSlice.reducer;
