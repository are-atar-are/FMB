import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';
import DashboardScreen from './src/features/dashboard/DashboardScreen';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DashboardScreen />
      </PersistGate>
    </Provider>
  );
};

export default App;