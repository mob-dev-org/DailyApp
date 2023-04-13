import { createSlice } from '@reduxjs/toolkit';

export type Player = {
    name: string;
    goal: number;
    assists: number;
    apear: number;
};

export type teamB = { players: Player[] };

const initialState = {
    players: [
        { name: 'Bajram', goal: 7, assists: 0, apear: 5 },
        { name: 'Ahmet', goal: 3, assists: 1, apear: 5 },
        { name: 'Irfan', goal: 2, assists: 3, apear: 5 },
        { name: 'Keno', goal: 1, assists: 0, apear: 4 },
        { name: 'Harun', goal: 1, assists: 2, apear: 5 },
        { name: 'Ahmed', goal: 0, assists: 0, apear: 1 },
    ],
} as teamB;

export const teamBSlice = createSlice({
    name: 'timB',
    initialState,
    reducers: {
        resetTeamB: () => initialState,
    },
});

export const { resetTeamB } = teamBSlice.actions;

export default teamBSlice.reducer;
