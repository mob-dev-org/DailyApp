import { combineReducers } from '@reduxjs/toolkit';

import appSettings from './appSettings/slice';
import teamA from './teamA/slice';
import teamB from './teamB/slice';

const rootReducer = combineReducers({
    appSettings,
    teamA,
    teamB,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
