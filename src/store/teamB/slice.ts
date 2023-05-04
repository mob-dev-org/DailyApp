import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Player = {
    name: string;
    goal?: number;
    assists?: number;
    apear?: number;
    willPlay?: boolean;
};

export type teamB = {
    players: Player[];
};

const initialState = {
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
        addPlayerB: (state, { payload }: PayloadAction<string>) => {
            state.players.push({ name: payload, goal: 0, assists: 0, apear: 0, willPlay: false });
        },
        deletePlayerB: (state, { payload }: PayloadAction<number>) => {
            state.players.splice(payload, 1);
        },
        updatePlayerB: (state, { payload }: PayloadAction<{ index: number; willPlay: boolean }>) => {
            const { index, willPlay } = payload;
            state.players[index].willPlay = willPlay;
        },

        resetTeamB: () => initialState,
    },
});

export const { resetTeamB, deletePlayerB, addPlayerB, updatePlayerB } = teamBSlice.actions;

export default teamBSlice.reducer;
