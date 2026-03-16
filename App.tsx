import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';
import BookingScreen from './src/features/booking/screens/BookingScreen';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BookingScreen />
      </PersistGate>
    </Provider>
  );
};

export default App;