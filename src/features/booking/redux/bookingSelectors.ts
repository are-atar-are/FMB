import { RootState } from '../../store/store';

export const selectVehicles = (state: RootState) => state.booking.vehicles;

export const selectSelectedDate = (state: RootState) => state.booking.selectedDate;

export const selectSelectedTime = (state: RootState) => state.booking.selectedTime;

export const selectSelectedVehicle = (state: RootState) => state.booking.selectedVehicle;

export const selectSelectedDays = (state: RootState) => state.booking.selectedDays;

export const selectHasBooking = (state: RootState) => state.booking.hasBooking;

export const selectPlaceInLine = (state: RootState) => state.booking.placeInLine;

export const selectEstimatedWaitMinutes = (state: RootState) => state.booking.estimatedWaitMinutes;

export const selectShouldNavigateToPayment = (state: RootState) =>
  state.booking.shouldNavigateToPayment;

export const selectShouldShowCarInfoModal = (state: RootState) =>
  state.booking.shouldShowCarInfoModal;

export const selectCurrentScreen = (state: RootState) => state.booking.currentScreen;

export const selectBookings = (state: RootState) => state.booking.bookings;

export const selectActiveBookings = (state: RootState) =>
  state.booking.bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');

export const selectCanConfirmBooking = (state: RootState) =>
  !!state.booking.selectedDate &&
  !!state.booking.selectedTime &&
  !!state.booking.selectedVehicle &&
  !!state.booking.selectedDays;