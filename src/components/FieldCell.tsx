// FieldCell.tsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import '../../src/utils/field.css';
import { Cell, SelectedCell, placeOnCell, selectMenuCell, selectCell } from '../store/fieldSlice';
import { addToHistory } from '../store/historySlice';

const FieldCell: React.FC = () => {
    const dispatch = useDispatch();
    const fieldState = useSelector((state: RootState) => state.field);
    const field = useSelector((state: RootState) => state.field.field);
    const noBudget = useSelector((state: RootState) => state.field.noBudget);
    const selectedMenuCell = useSelector((state: RootState) => state.field.selectedMenuCell)

    const handleCellClick = (selection: SelectedCell) => {

        if (selectedMenuCell) {
            place(selection, selectedMenuCell)
            return;
        }

        dispatch(selectCell(selection))
    };

    const place = (selection: SelectedCell, selectedMenuCell: Cell) => {
        dispatch(selectMenuCell(selectedMenuCell))
        dispatch(placeOnCell(selection))

        if (!noBudget && fieldState.previousType === 'grass') dispatch(addToHistory(fieldState))
    }

    return (
        <div className='grid justify-items-center col-span-3'>
            <div className='grid grid-cols-10 grid-rows-10'>
                {field.map((row, y) => (
                    <div key={y} >
                        {row.map((cell, x) => {
                            const { type } = cell
                            return (
                                <div
                                    key={x}
                                    className={`w-16 h-16 border-2 ${type}`}
                                    onClick={() => handleCellClick({
                                        type, x, y,
                                    })}>
                                    {type}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FieldCell;
