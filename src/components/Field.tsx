// Field.tsx

import React from 'react';
import FieldMenu from './FieldMenu';
import FieldCell from './FieldCell';
import MenuInfoPanel from './MenuInfoPanel';
import History from './History';

const Field: React.FC = () => {

    return (
        <>
            <FieldMenu />
            <div className="grid grid-cols-5">
                <History />
                <FieldCell />
            </div>
            <MenuInfoPanel />
        </>
    );
};

export default Field;
