import { Cell, cellType } from '../store/fieldSlice';


export const getPlaceBudget = (cell: Cell): number => {
    switch (cell.type) {
        case cellType.house:
            return 10;
        case cellType.rock:
        case cellType.water:
            return 3;
        default:
            return 0; // Default cost for grass
    }
};

export const getRemoveBudget = (cell: Cell): number => {
    switch (cell.type) {
        case cellType.rock:
            return 3;
        default:
            return 0; // No refund for water or default grass
    }
};
