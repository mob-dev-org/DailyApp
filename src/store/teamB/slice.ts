import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Player = {
    name: string;
    goal: number;
    assists: number;
    apear: number;
    willPlay: boolean;
};

export type teamB = { result: number; players: Player[] };

const initialState = {
    result: 0,
    players: [
        { name: 'Bajram', goal: 8, assists: 2, apear: 5, willPlay: true },
        { name: 'Ahmet', goal: 3, assists: 1, apear: 5, willPlay: true },
        { name: 'Irfan', goal: 2, assists: 3, apear: 5, willPlay: true },
        { name: 'Keno', goal: 1, assists: 0, apear: 4, willPlay: true },
        { name: 'Harun', goal: 1, assists: 2, apear: 5, willPlay: true },
        { name: 'Ahmed', goal: 0, assists: 0, apear: 1, willPlay: true },
    ],
} as teamB;

export const teamBSlice = createSlice({
    name: 'teamB',
    initialState,
    reducers: {
        addPlayerB: (state, { payload }: PayloadAction<Player>) => {
            state.players.push(payload);
        },
        deletePlayerB: (state, { payload }: PayloadAction<number>) => {
            state.players.splice(payload, 1);
        },
        resetTeamB: () => initialState,
    },
});

export const { resetTeamB, deletePlayerB, addPlayerB } = teamBSlice.actions;

export default teamBSlice.reducer;
