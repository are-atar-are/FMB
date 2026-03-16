import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { setVehicles, confirmBooking as confirmBookingAction } from '../features/booking/redux/bookingSlice';
import { selectSelectedVehicle, selectSelectedDate, selectSelectedTime, selectSelectedDays } from '../features/booking/redux/bookingSelectors';
import {
  fetchVehicles,
  createBooking,
  fetchUserBookings,
  cancelBooking as cancelBookingFirebase,
  subscribeToVehicles,
  subscribeToUserBookings,
} from './firebase';
import { Vehicle, Booking } from '../features/booking/types';

// Placeholder user ID - replace with actual auth
const CURRENT_USER_ID = 'user-001';

export const useFirebaseVehicles = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Initial fetch
    const loadVehicles = async () => {
      try {
        const vehicles = await fetchVehicles();
        dispatch(setVehicles(vehicles));
      } catch (error) {
        console.error('Failed to load vehicles:', error);
      }
    };

    loadVehicles();

    // Real-time subscription
    const unsubscribe = subscribeToVehicles((vehicles) => {
      dispatch(setVehicles(vehicles));
    });

    return () => unsubscribe();
  }, [dispatch]);
};

export const useFirebaseBookings = () => {
  const dispatch = useDispatch<AppDispatch>();

  const loadUserBookings = useCallback(async () => {
    try {
      const bookings = await fetchUserBookings(CURRENT_USER_ID);
      // Dispatch to Redux if needed
      return bookings;
    } catch (error) {
      console.error('Failed to load bookings:', error);
      return [];
    }
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToUserBookings(CURRENT_USER_ID, (bookings) => {
      // Dispatch to Redux if needed
    });

    return () => unsubscribe();
  }, []);

  return { loadUserBookings };
};

export const useCreateBooking = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedVehicle = useSelector(selectSelectedVehicle);
  const selectedDate = useSelector(selectSelectedDate);
  const selectedTime = useSelector(selectSelectedTime);
  const selectedDays = useSelector(selectSelectedDays);

  const createNewBooking = useCallback(async (): Promise<boolean> => {
    if (!selectedVehicle || !selectedDate || !selectedTime || !selectedDays) {
      return false;
    }

    try {
      const bookingData = {
        vehicle: selectedVehicle,
        date: selectedDate,
        time: selectedTime,
        days: selectedDays,
        status: 'confirmed' as const,
        userId: CURRENT_USER_ID,
        createdAt: new Date().toISOString(),
      };

      // Save to Firebase
      const bookingId = await createBooking(bookingData);
      
      // Update Redux
      dispatch(confirmBookingAction());
      
      return true;
    } catch (error) {
      console.error('Failed to create booking:', error);
      return false;
    }
  }, [dispatch, selectedVehicle, selectedDate, selectedTime, selectedDays]);

  return { createNewBooking };
};

export const useCancelBooking = () => {
  const cancelBooking = useCallback(async (bookingId: string): Promise<boolean> => {
    try {
      await cancelBookingFirebase(bookingId);
      return true;
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      return false;
    }
  }, []);

  return { cancelBooking };
};