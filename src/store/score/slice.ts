import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Game = {
    resultA?: number;
    resultB?: number;
    date?: Date;
};

export type score = { teamScoreB: number; teamScoreA: number; games: Game[] };

const initialState = {
    teamScoreA: 0,
    teamScoreB: 0,
    games: [{ resultA: 0, resultB: 0 }],
} as score;

export const scoreSlice = createSlice({
    name: 'Score',
    initialState,
    reducers: {
        updateTeamAResult: (state, { payload }: PayloadAction<number>) => {
            state.teamScoreA = payload;
        },
        updateTeamBResult: (state, { payload }: PayloadAction<number>) => {
            state.teamScoreB = payload;
        },
        addGame: (state, { payload }: PayloadAction<Game>) => {
            state.games.push(payload);
        },

        resetScore: () => initialState,
    },
});

export const { resetScore, updateTeamAResult, updateTeamBResult, addGame } = scoreSlice.actions;

export default scoreSlice.reducer;
