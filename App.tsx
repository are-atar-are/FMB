import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentScreen,
  selectHasBooking,
  selectBookings,
} from './src/features/booking/redux/bookingSelectors';
import {
  setCurrentScreen,
  confirmBooking,
  cancelBooking,
  clearCurrentSelection,
} from './src/features/booking/redux/bookingSlice';
import BookingScreen from './src/features/booking/screens/BookingScreen';
import BookingSummaryScreen from './src/features/booking/screens/BookingSummaryScreen';
import BookingConfirmationScreen from './src/features/booking/screens/BookingConfirmationScreen';
import MyBookingsScreen from './src/features/booking/screens/MyBookingsScreen';
import SplashScreen from './src/components/SplashScreen';
import ErrorBoundary from './src/components/ErrorBoundary';
import { useFirebaseVehicles } from './src/services/firebaseHooks';

const AppContent: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const dispatch = useDispatch();
  const currentScreen = useSelector(selectCurrentScreen);
  const hasBooking = useSelector(selectHasBooking);
  const bookings = useSelector(selectBookings);

  // Initialize Firebase data
  useFirebaseVehicles();

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleGoToSummary = () => {
    dispatch(setCurrentScreen('summary'));
  };

  const handleConfirmBooking = () => {
    dispatch(confirmBooking());
  };

  const handleCancelBooking = () => {
    dispatch(setCurrentScreen('booking'));
  };

  const handleViewBookings = () => {
    dispatch(setCurrentScreen('myBookings'));
  };

  const handleBookAnother = () => {
    dispatch(clearCurrentSelection());
    dispatch(setCurrentScreen('booking'));
  };

  const handleCancelExistingBooking = (bookingId: string) => {
    dispatch(cancelBooking(bookingId));
  };

  const handleBookNew = () => {
    dispatch(clearCurrentSelection());
    dispatch(setCurrentScreen('booking'));
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  // Show My Bookings if user has bookings and is on that screen
  if (currentScreen === 'myBookings') {
    return (
      <MyBookingsScreen
        onBookNew={handleBookNew}
        onCancelBooking={handleCancelExistingBooking}
      />
    );
  }

  // Show confirmation screen after booking
  if (currentScreen === 'confirmation') {
    return (
      <BookingConfirmationScreen
        onViewBookings={handleViewBookings}
        onBookAnother={handleBookAnother}
      />
    );
  }

  // Show summary before confirming
  if (currentScreen === 'summary') {
    return (
      <BookingSummaryScreen
        onConfirm={handleConfirmBooking}
        onCancel={handleCancelBooking}
      />
    );
  }

  // Default: Booking screen
  return <BookingScreen onGoToSummary={handleGoToSummary} />;
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContent />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;