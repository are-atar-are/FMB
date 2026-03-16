import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';

const selectBookingState = (state: RootState) => state.booking;

export const selectHasBooking = createSelector(
  selectBookingState,
  (booking) => booking.hasBooking
);

export const selectSelectedDate = createSelector(
  selectBookingState,
  (booking) => booking.selectedDate
);

export const selectSelectedTime = createSelector(
  selectBookingState,
  (booking) => booking.selectedTime
);

export const selectSelectedVehicle = createSelector(
  selectBookingState,
  (booking) => booking.selectedVehicle
);

export const selectSelectedDays = createSelector(
  selectBookingState,
  (booking) => booking.selectedDays
);

export const selectVehicles = createSelector(
  selectBookingState,
  (booking) => booking.vehicles
);

export const selectShouldNavigateToPayment = createSelector(
  selectBookingState,
  (booking) => booking.shouldNavigateToPayment
);

export const selectShouldShowCarInfoModal = createSelector(
  selectBookingState,
  (booking) => booking.shouldShowCarInfoModal
);

export const selectPlaceInLine = createSelector(
  selectBookingState,
  (booking) => booking.placeInLine
);

export const selectEstimatedWaitMinutes = createSelector(
  selectBookingState,
  (booking) => booking.estimatedWaitMinutes
);

export const selectBookingDetails = createSelector(
  selectSelectedVehicle,
  selectSelectedDate,
  selectSelectedTime,
  selectSelectedDays,
  (vehicle, date, time, days) => ({
    vehicle,
    date,
    time,
    days,
  })
);