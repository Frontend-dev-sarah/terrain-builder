// fieldSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPlaceBudget, getRemoveBudget } from '../utils/helpers';

export enum cellType {
    grass = 'grass',
    rock = 'rock',
    house = 'house',
    water = 'water'
}

export interface Cell {
    type: cellType,
}

export interface SelectedCell {
    type: cellType, x: number; y: number, removeCredit?: string
}

export interface FieldState {
    selectedMenuCell: Cell | null;
    selectedCell: SelectedCell | null;
    field: Cell[][];
    budget: number;
    noBudget: boolean;
    erroMessage: string;
    actionType?: string;
    previousType?: string;
}

const generateField = (): Cell[][] => {
    const field: Cell[][] = [];

    for (let i = 0; i < 10; i++) {
        const row: Cell[] = [];

        for (let j = 0; j < 10; j++) {
            // Set default type to grass
            let type: cellType = cellType.grass;
            // Randomly select some cells as rocks
            if (Math.random() < 0.1) {
                type = cellType.rock;
            }
            row.push({ type });
        }
        field.push(row);
    }
    return field;
};

const initialState: FieldState = {
    selectedMenuCell: null,
    selectedCell: null,
    field: generateField(),
    budget: 100,
    noBudget: false,
    erroMessage: '',
    actionType: 'remove',
    previousType: '',
};

const fieldSlice = createSlice({
    name: 'field',
    initialState,
    reducers: {
        selectMenuCell: (state, action: PayloadAction<Cell>) => {
            state.selectedMenuCell = action.payload;
            state.erroMessage = '';
        },
        selectCell: (state, action: PayloadAction<SelectedCell>) => {
            state.selectedCell = action.payload;
            state.selectedCell.removeCredit = action.payload.type === cellType.house ? '+5 credits' : action.payload.type === cellType.rock ? '-3 credits' : "Selected cell is not allowed";
            state.selectedMenuCell = null;
            state.erroMessage = '';
        },
        placeOnCell: (state, action: PayloadAction<SelectedCell>) => {

            if (!state.selectedMenuCell) return;

            const selectedCell = action.payload;
            const { type, x, y } = selectedCell;
            const costToPlace = getPlaceBudget(state.selectedMenuCell);

            if (state.budget < costToPlace) {
                state.noBudget = true;
                state.actionType = ''
                return;
            }
            state.budget -= costToPlace;

            if (type !== cellType.grass) {
                state.actionType = ''
                state.erroMessage = 'Selected cell is not allowed to place !';
                return;
            }

            // Change to the selected cell type
            state.field[y][x].type = state.selectedMenuCell.type;
            state.previousType = type;
            state.selectedCell = {
                type: state.selectedMenuCell.type,
                x,
                y
            };
            //change action type
            state.actionType = 'place';
        },
        removeFromCell: (state, action: PayloadAction<SelectedCell>) => {
            const { type, x, y } = action.payload;
            const cell = state.field[y][x];
            const costToRemove = getRemoveBudget(cell);

            if (type === cellType.rock) {
                if (state.budget < costToRemove) {
                    state.noBudget = true;
                    state.actionType = ''
                    return;
                }
                state.budget -= costToRemove;
                state.field[y][x].type = cellType.grass; // Change to default grass
            } else if (type === cellType.house) {
                state.budget += 5;
                state.field[y][x].type = cellType.grass; // Change to default grass
                state.selectedCell!.type = cellType.grass;
            }
            //change action type
            state.actionType = 'remove';
            state.previousType = '';
        },
        updateField: (state, action: PayloadAction<FieldState>) => {
            // state.field = action.payload.field;
            state.budget = action.payload.budget;
            for (let i = 0; i < state.field.length; i++) {
                for (let j = 0; j < state.field[i].length; j++) {
                    state.field[i][j].type = action.payload.field[i][j].type;
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(slowClearSelectedMenu.fulfilled, (state) => {
            state.selectedMenuCell = null;
        });
    }
});

export const slowClearSelectedMenu = createAsyncThunk('placeOnCell', async () => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 500);
    });
});


export const {
    selectMenuCell,
    selectCell,
    placeOnCell,
    removeFromCell,
    updateField
} = fieldSlice.actions;

export const fieldInitalState = (state: { field: FieldState }) => state;

export default fieldSlice.reducer;
