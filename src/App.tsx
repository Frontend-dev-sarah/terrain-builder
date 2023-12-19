// src/App.tsx
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store';
import Field from './components/Field';

const App: React.FC = () => {

  return (
    <ReduxProvider store={store}>
      <Field />
    </ReduxProvider>
  );
};

export default App;
