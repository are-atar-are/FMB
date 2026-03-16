import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vehicle, BookingState, ArrivalStatus, Booking } from '../types';

const initialState: BookingState = {
  hasBooking: false,
  selectedDate: null,
  selectedTime: null,
  selectedVehicle: null,
  selectedDays: null,
  placeInLine: null,
  estimatedWaitMinutes: null,
  vehicles: [],
  bookings: [],
  currentScreen: 'booking',
  shouldNavigateToPayment: false,
  shouldShowCarInfoModal: false,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
    },
    setSelectedTime: (state, action: PayloadAction<string | null>) => {
      state.selectedTime = action.payload;
    },
    setSelectedVehicle: (state, action: PayloadAction<Vehicle | null>) => {
      state.selectedVehicle = action.payload;
    },
    setSelectedDays: (state, action: PayloadAction<number | null>) => {
      state.selectedDays = action.payload;
    },
    setVehicles: (state, action: PayloadAction<Vehicle[]>) => {
      state.vehicles = action.payload;
    },
    setShowCarInfoModal: (state, action: PayloadAction<boolean>) => {
      state.shouldShowCarInfoModal = action.payload;
    },
    setCurrentScreen: (state, action: PayloadAction<BookingState['currentScreen']>) => {
      state.currentScreen = action.payload;
    },
    requestPaymentNavigation: (state) => {
      state.shouldNavigateToPayment = true;
    },
    clearPaymentNavigation: (state) => {
      state.shouldNavigateToPayment = false;
    },
    confirmBooking: (state) => {
      if (state.selectedVehicle && state.selectedDate && state.selectedTime && state.selectedDays) {
        const newBooking: Booking = {
          id: `FMB-${Date.now()}`,
          vehicle: state.selectedVehicle,
          date: state.selectedDate,
          time: state.selectedTime,
          days: state.selectedDays,
          status: 'confirmed',
          createdAt: new Date().toISOString(),
        };
        state.bookings.push(newBooking);
        state.hasBooking = true;
        state.placeInLine = 1;
        state.estimatedWaitMinutes = 10;
        state.currentScreen = 'confirmation';
      }
    },
    cancelBooking: (state, action: PayloadAction<string>) => {
      const booking = state.bookings.find(b => b.id === action.payload);
      if (booking) {
        booking.status = 'cancelled';
      }
      if (state.bookings.every(b => b.status === 'cancelled' || b.status === 'completed')) {
        state.hasBooking = false;
      }
    },
    clearCurrentSelection: (state) => {
      state.selectedDate = null;
      state.selectedTime = null;
      state.selectedVehicle = null;
      state.selectedDays = null;
    },
    updateArrivalStatus: (state, action: PayloadAction<ArrivalStatus>) => {
      // For future driver status updates
    },
  },
});

export const {
  setSelectedDate,
  setSelectedTime,
  setSelectedVehicle,
  setSelectedDays,
  setVehicles,
  setShowCarInfoModal,
  setCurrentScreen,
  requestPaymentNavigation,
  clearPaymentNavigation,
  confirmBooking,
  cancelBooking,
  clearCurrentSelection,
  updateArrivalStatus,
} = bookingSlice.actions;

export default bookingSlice.reducer;