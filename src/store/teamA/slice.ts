import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Player = {
    name: string;
    goal: number;
    assists: number;
    apear: number;
};

export type teamA = { players: Player[] };

const initialState = {
    players: [
        { name: 'Malik', goal: 3, assists: 2, apear: 5 },
        { name: 'Mahir', goal: 7, assists: 3, apear: 5 },
        { name: 'Adi', goal: 1, assists: 2, apear: 4 },
        { name: 'Pepa', goal: 2, assists: 2, apear: 5 },
        { name: 'Mirza', goal: 1, assists: 1, apear: 1 },
        { name: 'Almo', goal: 1, assists: 2, apear: 1 },
    ],
} as teamA;

export const teamASlice = createSlice({
    name: 'teamA',
    initialState,
    reducers: {
        resetTeamA: () => initialState,
    },
});

export const { resetTeamA } = teamASlice.actions;

export default teamASlice.reducer;
