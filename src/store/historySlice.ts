// historySlice.ts

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FieldState } from './fieldSlice';

interface HistoryState {
  past: FieldState[];
  present: FieldState;
  future: FieldState[];
}

const initialFieldState: FieldState = {
  selectedMenuCell: null,
  selectedCell: null,
  field: [],
  budget: 100,
  noBudget: false,
  erroMessage: ''
};

const initialState: HistoryState = {
  past: [],
  present: initialFieldState,
  future: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<FieldState>) => {
      state.present = action.payload;
      // Add the current state to the past array
      state.past = [...state.past, action.payload];
      // Clear the future array
      state.future = [];
    },
    undo: (state) => {
      if (state.past.length > 0) {
        // Move the last state from past to present
        const previousState = state.past[state.past.length - 1];
        state.present = previousState;
        state.past = state.past.slice(0, -1);
        state.future = [state.present, ...state.future];
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        // Move the first state from future to present
        const nextState = state.future[0];
        state.present = nextState;
        state.past = [...state.past, state.present];
        state.future = state.future.slice(1);

      }
    },
    goToSpecificState: (state, action: PayloadAction<FieldState>) => {
      state.present = action.payload;
      const index = JSON.parse(JSON.stringify(state.past)).findIndex((state: FieldState) => {
        //because budget changes for every history, we can compare the budget to find the index, 
        //of course to check the equality of two objects, we can also use loadash isEqual method: _.isEqual(state, action.payload)
        return state.budget === action.payload.budget
      });

      state.past = state.past.slice(0, index);
      state.future = [];
    }
  },
});

export const { addToHistory, undo, redo, goToSpecificState } = historySlice.actions;

export default historySlice.reducer;
