import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import bookingReducer from '../features/booking/redux/bookingSlice';

// Migration to add bookings array to existing state
const migrations = {
  0: (state: any) => {
    return {
      ...state,
      booking: {
        ...state.booking,
        bookings: state.booking?.bookings || [],
        currentScreen: state.booking?.currentScreen || 'booking',
      },
    };
  },
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['booking'],
  version: 0,
  migrate: createMigrate(migrations, { debug: false }),
};

const rootReducer = combineReducers({
  booking: bookingReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;