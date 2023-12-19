//History.tsx

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from './UI/Button';
import { RootState } from '../store';
import { redo, goToSpecificState, undo } from '../store/historySlice';
import { FieldState, updateField } from '../store/fieldSlice';

const History: React.FC = () => {
    const histories = useSelector((state: RootState) => state.history.past);
    const presentAction = useSelector((state: RootState) => state.history.present);

    const dispatch = useDispatch();

    const handlePreviousClick = useCallback(() => {
        dispatch(undo());
        presentAction && dispatch(updateField(presentAction))
    }, [])

    const handleRedoClick = useCallback(() => {
        dispatch(redo());
        presentAction && dispatch(updateField(presentAction))
    }, [])

    const handleActionHistoryClick = useCallback((action: FieldState) => {
        dispatch(goToSpecificState(action));
        dispatch(updateField(action))
    }, [])

    return (
        <div className='h-full w-45 bg-orange-50 mr-2 col-span-1 ml-5 p-5 '>
            <Button buttonTitle='Previous' onClick={
                () => handlePreviousClick()} />
            <Button buttonTitle='Next' onClick={() => handleRedoClick()} />
            <h5 className='text-center font-title font-bold'>History:</h5>
            <ul className='h-96 overscroll-contain overflow-y-scroll '>
                {histories.map((action, index) => (
                    <div key={index.toString()} className='flex flex-row  m-2'>
                        <li className='m-1 cursor-pointer' key={index} onClick={() => handleActionHistoryClick(action)}>
                            {`${action.actionType}: ${action.selectedCell?.type} on ${action.selectedCell?.y}, ${action.selectedCell?.x}`}
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default History;
