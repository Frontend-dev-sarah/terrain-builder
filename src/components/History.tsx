//History.tsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from './UI/Button';
import { RootState } from '../store';
import { redo, goToSpecificState, undo } from '../store/historySlice';
import { FieldState, updateField } from '../store/fieldSlice';

const History: React.FC = () => {
    const histories = useSelector((state: RootState) => state.history.past);
    const presentAction = useSelector((state: RootState) => state.history.present);

    const dispatch = useDispatch();

    const handlePreviousClick = () => {
        dispatch(undo());
        presentAction && dispatch(updateField(presentAction))
    }

    const handleRedoClick = () => {
        dispatch(redo());
        presentAction && dispatch(updateField(presentAction))
    }

    const handleActionHistoryClick = (action: FieldState) => {
        dispatch(goToSpecificState(action));
        dispatch(updateField(action))
    };

    return (
        <div className='h-full w-45 bg-orange-50 mr-2 p-1 col-span-1'>
            <Button buttonTitle='Previous' onClick={
                () => handlePreviousClick()} />
            <Button buttonTitle='Next' onClick={() => handleRedoClick()} />
            <h5 className='text-center font-title'>History:</h5>
            <ul>
                {histories.map((action, index) => (
                    <div key={index.toString()} className='flex flex-row items-center m-2'>
                        <li className='m-1' key={index} onClick={() => handleActionHistoryClick(action)}>
                            {`${action.actionType}: ${action.selectedCell?.type} on ${action.selectedCell?.y}, ${action.selectedCell?.x}`}
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default History;
