import { combineReducers } from '@reduxjs/toolkit';

import appSettings from './appSettings/slice';
import score from './score/slice';
import teamA from './teamA/slice';
import teamB from './teamB/slice';
import toDo from './toDo/slice';
import apiToDo from './toDoApi/slice';

const rootReducer = combineReducers({
    appSettings,
    teamA,
    teamB,
    score,
    toDo,
    apiToDo,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
