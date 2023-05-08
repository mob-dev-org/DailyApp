import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Player = {
    name: string;
    goal: number;
    assists: number;
    apear?: number;
    willPlay?: boolean;
};

export type GamePlayer = Player[];

export type Game = {
    resultA?: number;
    resultB?: number;
};

export type teamA = { players: Player[] };

const initialState = {
    //TODO teamAname: 'STRING', add team name
    players: [
        { name: 'Malik', goal: 3, assists: 2, apear: 5, willPlay: true },
        { name: 'Mahir', goal: 7, assists: 3, apear: 5, willPlay: true },
        { name: 'Adi', goal: 1, assists: 2, apear: 4, willPlay: true },
        { name: 'Pepa', goal: 2, assists: 2, apear: 5, willPlay: true },
        { name: 'Mirza', goal: 1, assists: 1, apear: 1, willPlay: true },
        { name: 'Almo', goal: 1, assists: 2, apear: 1, willPlay: true },
    ],
} as teamA;

export const teamASlice = createSlice({
    name: 'teamA',
    initialState,
    reducers: {
        addPlayerA: (state, { payload }: PayloadAction<string>) => {
            state.players.push({ name: payload, goal: 0, assists: 0, apear: 0, willPlay: false });
        },
        deletePlayerA: (state, { payload }: PayloadAction<number>) => {
            state.players.splice(payload, 1);
        },
        updatePlayerA: (state, { payload }: PayloadAction<{ index: number; willPlay: boolean }>) => {
            const { index, willPlay } = payload;
            state.players[index].willPlay = willPlay;
        },
        setTeamA: (state, { payload }: PayloadAction<teamA>) => {
            state.players = payload.players;
        },

        resetTeamA: () => initialState,
    },
});

export const { addPlayerA, resetTeamA, deletePlayerA, updatePlayerA, setTeamA } = teamASlice.actions;

export default teamASlice.reducer;
