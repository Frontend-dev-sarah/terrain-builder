// FieldCell.tsx

// FieldCell.tsx

import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import '../../src/utils/field.css';
import { SelectedCell, placeOnCell, selectMenuCell, selectCell, slowClearSelectedMenu } from '../store/fieldSlice';
import { addToHistory } from '../store/historySlice';

const FieldCell: React.FC = () => {
    const dispatch = useDispatch();
    const fieldState = useSelector((state: RootState) => state.field);
    const field = useSelector((state: RootState) => state.field.field);
    const noBudget = useSelector((state: RootState) => state.field.noBudget);
    const selectedMenuCell = useSelector((state: RootState) => state.field.selectedMenuCell)
    const selectedCell = useSelector((state: RootState) => state.field.selectedCell)


    useEffect(() => {
        if (selectedMenuCell && !noBudget && fieldState.previousType === 'grass') dispatch(addToHistory(fieldState))
    }, [fieldState.selectedCell])


    const handleCellClick = useCallback((selection: SelectedCell) => {
        if (selectedMenuCell) {
            dispatch(selectMenuCell(selectedMenuCell))
            dispatch(placeOnCell(selection))
            dispatch(slowClearSelectedMenu())
            return;
        }
        dispatch(selectCell(selection))
    }, [selectedMenuCell])

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
                                    className={`w-16 h-16 border-2 text-center ${type} ${selectedCell?.x === x && selectedCell?.y === y ? "border-yellow-500 border-4 animate-pulse" : ""}`}
                                    onClick={() => handleCellClick({
                                        type, x, y,
                                    })}>
                                    {`${y}, ${x}`}
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
