import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Player = {
    name: string;
    goal: number;
    assists: number;
    apear: number;
};

export type teamA = { result: number; players: Player[] };

const initialState = {
    result: 0,
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
        addPlayerA: (state, { payload }: PayloadAction<Player>) => {
            state.players.push(payload);
        },
        deletePlayerA: (state, { payload }: PayloadAction<number>) => {
            state.players.splice(payload, 1);
        },
        resetTeamA: () => initialState,
    },
});

export const { addPlayerA, resetTeamA, deletePlayerA } = teamASlice.actions;

export default teamASlice.reducer;
