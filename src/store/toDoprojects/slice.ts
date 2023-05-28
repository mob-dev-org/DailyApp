import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export type Project = {
    id: string;
    name: string;
};

export type Projects = {
    projects: Project[];
    projectEditingIndex: number | null;
    newText: string;
};

const initialState: Projects = {
    projects: [
        {
            id: uuidv4(),
            name: 'Project 1',
        },
        {
            id: uuidv4(),
            name: 'Project 2',
        },
    ],
    projectEditingIndex: null,
    newText: '',
};

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state, action: PayloadAction<string>) => {
            state.projects.push({ id: uuidv4(), name: action.payload });
        },
        deleteProject: (state, action: PayloadAction<string>) => {
            state.projects = state.projects.filter((project) => project.id !== action.payload);
        },
        deleteProjects: (state) => {
            state.projects = [];
        },
        saveEditedTask: (state, { payload }: PayloadAction<string>) => {
            const index = state.projectEditingIndex;
            const newText = payload;
            if (index !== null) {
                state.projects[index].name = newText;
                state.projectEditingIndex = null;
            }
        },
        toggleEditTask: (state, { payload }: PayloadAction<number>) => {
            const index = payload;
            state.projectEditingIndex = index;
            state.newText = state.projects[index].name;
        },
        cancelEditing: (state) => {
            state.projectEditingIndex = null;
            state.newText = '';
        },
        setEditedText: (state, { payload }: PayloadAction<string>) => {
            state.newText = payload;
        },

        resetProjectState: () => initialState,
    },
});

export const {
    addProject,
    saveEditedTask,
    deleteProject,
    setEditedText,
    cancelEditing,
    resetProjectState,
    deleteProjects,
    toggleEditTask,
} = projectSlice.actions;
export default projectSlice.reducer;
