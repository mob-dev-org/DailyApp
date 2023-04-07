import { combineReducers } from '@reduxjs/toolkit';

import appSettings from './appSettings/slice';

const rootReducer = combineReducers({
    appSettings,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
