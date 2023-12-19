// store.ts

import { configureStore } from '@reduxjs/toolkit';
import fieldReducer from './fieldSlice';
import historyReducer from './historySlice';

//const undoableFieldReducer = undoable(fieldReducer, { limit: 10 });

const store = configureStore({
    reducer: {
        field: fieldReducer,
        history: historyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
