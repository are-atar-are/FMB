import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vehicle, BookingState, ArrivalStatus } from '../types';

const initialState: BookingState = {
  hasBooking: false,
  selectedDate: null,
  selectedTime: null,
  selectedVehicle: null,
  selectedDays: null,
  placeInLine: null,
  estimatedWaitMinutes: null,
  vehicles: [],
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
    requestPaymentNavigation: (state) => {
      state.shouldNavigateToPayment = true;
    },
    clearPaymentNavigation: (state) => {
      state.shouldNavigateToPayment = false;
    },
    confirmBooking: (state, action: PayloadAction<{ placeInLine: number; estimatedWaitMinutes: number }>) => {
      state.hasBooking = true;
      state.placeInLine = action.payload.placeInLine;
      state.estimatedWaitMinutes = action.payload.estimatedWaitMinutes;
    },
    cancelBooking: (state) => {
      return initialState;
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
  requestPaymentNavigation,
  clearPaymentNavigation,
  confirmBooking,
  cancelBooking,
  updateArrivalStatus,
} = bookingSlice.actions;

export default bookingSlice.reducer;