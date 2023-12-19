// MenuInfoPanel.tsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from './UI/Button';
import { cellType, removeFromCell } from '../store/fieldSlice';
import { RootState } from '../store';
import '../utils/field.css';
import { addToHistory } from '../store/historySlice';

const MenuInfoPanel: React.FC = () => {
  const selectedCell = useSelector((state: RootState) => state.field.selectedCell);
  const removeBudget = useSelector((state: RootState) => state.field.selectedCell?.removeCredit);
  const fieldState = useSelector((state: RootState) => state.field);
  const [isAnimating, setIsAnimating] = useState(false);

  const dispatch = useDispatch();

  const handleRemoveCell = () => {
    setIsAnimating(true);
    if (!selectedCell || selectedCell?.type === cellType.grass || selectedCell?.type === cellType.water) return;
    dispatch(removeFromCell(selectedCell))
    dispatch(addToHistory(fieldState))

    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };

  const diabled = selectedCell?.type === cellType.grass || selectedCell?.type === cellType.water;

  return (
    <div className='grid justify-items-center p-3 m-5 bg-orange-50'>
      <h3 className='text-center font-title'>Current tile:</h3>
      <div className={`w-16 h-16 m-2 ${selectedCell?.type || 'bg-white'}`} />
      <div>
        <div>Type: {selectedCell?.type || "Not Selected"}</div>
        <div>{`Position: ${selectedCell ? selectedCell.y + " , " + selectedCell.x : 'Not selected'}`}</div>
      </div>
      <div className='flex flex-row items-center'>
        <label>Action: </label>
        <Button buttonTitle={`Remove (${removeBudget || "No selected cell"})`} disabled={diabled || !removeBudget} styles={`${isAnimating ? 'animate-bounce' : ''}`} onClick={handleRemoveCell} />
      </div>
    </div>
  );
};

export default MenuInfoPanel;
