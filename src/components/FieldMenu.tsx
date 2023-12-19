// FieldMenu.tsx

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem, { MenuNames } from './UI/MenuItem';
import { RootState } from '../store';
import { cellType, selectMenuCell } from '../store/fieldSlice';

const FieldMenu: React.FC = () => {
    const selectedMenuCell = useSelector((state: RootState) => state.field.selectedMenuCell)
    const { budget, noBudget, erroMessage } = useSelector((state: RootState) => state.field);

    const dispatch = useDispatch();

    const handleCellMenuSelect = useCallback((cellType: cellType) => {
        const cell = { type: cellType }
        dispatch(selectMenuCell(cell));
    }, [])

    const animateStyle = 'border-yellow-400 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110'

    return (
        <div className="m-5 text-center p-3 bg-orange-50">
            <h1 className='text-4xl font-semibold font-title m-4'>Terrain Builder</h1>
            <h3 className='mb-2 text-xl font-title'>Credit: {budget}</h3>
            <h3 className='mb-2 text-red-600 h-6'>{noBudget ? "You don't have enough credit" : ''}</h3>
            <h3 className='h-6 text-red-600'>{erroMessage}</h3>
            <div className='flex flex-row justify-center gap-2'>
                <MenuItem menuName={MenuNames.Rock} onClick={() => handleCellMenuSelect(cellType.rock)}
                    selectedClass={`${selectedMenuCell?.type === cellType.rock ? animateStyle : ""}`} />
                <MenuItem menuName={MenuNames.Water} onClick={() => handleCellMenuSelect(cellType.water)}
                    selectedClass={`${selectedMenuCell?.type === cellType.water ? animateStyle : ""}`} />
                <MenuItem menuName={MenuNames.House} onClick={() => handleCellMenuSelect(cellType.house)}
                    selectedClass={`${selectedMenuCell?.type === cellType.house ? animateStyle : ""}`} />
            </div>
        </div>
    );
};

export default FieldMenu;
