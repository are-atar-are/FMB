import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { setVehicles, confirmBooking as confirmBookingAction, setBookings } from '../features/booking/redux/bookingSlice';
import { selectSelectedVehicle, selectSelectedDate, selectSelectedTime, selectSelectedDays, selectBookings } from '../features/booking/redux/bookingSelectors';
import { Vehicle, Booking } from '../features/booking/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Placeholder user ID - replace with actual auth
const CURRENT_USER_ID = 'user-001';
const BOOKINGS_STORAGE_KEY = '@fmb_bookings';

// Mock vehicles data
const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'hilux-001',
    name: 'Toyota Hilux',
    type: 'Bakkie',
    available: true,
    registration: 'ABC123GP',
    fuelType: 'Diesel',
    power: '150 KW',
    topSpeed: '170 km/h',
    location: 'Johannesburg Office',
    bookingTimeSlots: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM'],
    driverName: 'Company Fleet',
    driverRole: 'Internal',
    pricePerDay: '',
    vehicleImage: 'hilux-side',
  },
  {
    id: 'ranger-001',
    name: 'Ford Ranger',
    type: 'Bakkie',
    available: true,
    registration: 'XYZ789GP',
    fuelType: 'Diesel',
    power: '200 KW',
    topSpeed: '180 km/h',
    location: 'Cape Town Office',
    bookingTimeSlots: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'],
    driverName: 'Company Fleet',
    driverRole: 'Internal',
    pricePerDay: '',
    vehicleImage: 'hilux-front',
  },
  {
    id: 'polo-001',
    name: 'VW Polo',
    type: 'Hatch',
    available: true,
    registration: 'DEF456GP',
    fuelType: 'Petrol',
    power: '85 KW',
    topSpeed: '190 km/h',
    location: 'Durban Office',
    bookingTimeSlots: ['8:00 AM', '9:00 AM', '10:00 AM'],
    driverName: 'Company Fleet',
    driverRole: 'Internal',
    pricePerDay: '',
    vehicleImage: 'sedan-top',
  },
  {
    id: 'isuzu-001',
    name: 'Isuzu D-Max',
    type: 'Bakkie',
    available: true,
    registration: 'GHI789GP',
    fuelType: 'Diesel',
    power: '130 KW',
    topSpeed: '165 km/h',
    location: 'Johannesburg Office',
    bookingTimeSlots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'],
    driverName: 'Company Fleet',
    driverRole: 'Internal',
    pricePerDay: '',
    vehicleImage: 'hilux-side',
  },
  {
    id: 'corolla-001',
    name: 'Toyota Corolla',
    type: 'Sedan',
    available: true,
    registration: 'JKL012GP',
    fuelType: 'Petrol',
    power: '103 KW',
    topSpeed: '195 km/h',
    location: 'Cape Town Office',
    bookingTimeSlots: ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM'],
    driverName: 'Company Fleet',
    driverRole: 'Internal',
    pricePerDay: '',
    vehicleImage: 'sedan-top',
  },
];

export const useFirebaseVehicles = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Use mock data for now
    dispatch(setVehicles(MOCK_VEHICLES));
  }, [dispatch]);
};

export const useCreateBooking = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedVehicle = useSelector(selectSelectedVehicle);
  const selectedDate = useSelector(selectSelectedDate);
  const selectedTime = useSelector(selectSelectedTime);
  const selectedDays = useSelector(selectSelectedDays);
  const existingBookings = useSelector(selectBookings);

  const createNewBooking = useCallback(async (): Promise<boolean> => {
    if (!selectedVehicle || !selectedDate || !selectedTime || !selectedDays) {
      return false;
    }

    try {
      const newBooking: Booking = {
        id: `FMB-${Date.now()}`,
        vehicle: selectedVehicle,
        date: selectedDate,
        time: selectedTime,
        days: selectedDays,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      // Save to AsyncStorage
      const updatedBookings = [...existingBookings, newBooking];
      await AsyncStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updatedBookings));
      
      // Update Redux
      dispatch(setBookings(updatedBookings));
      dispatch(confirmBookingAction());
      
      return true;
    } catch (error) {
      console.error('Failed to create booking:', error);
      return false;
    }
  }, [dispatch, selectedVehicle, selectedDate, selectedTime, selectedDays, existingBookings]);

  return { createNewBooking };
};

export const useCancelBooking = () => {
  const dispatch = useDispatch<AppDispatch>();
  const existingBookings = useSelector(selectBookings);

  const cancelBooking = useCallback(async (bookingId: string): Promise<boolean> => {
    try {
      const updatedBookings = existingBookings.map(b => 
        b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
      );
      
      await AsyncStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updatedBookings));
      dispatch(setBookings(updatedBookings));
      
      return true;
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      return false;
    }
  }, [dispatch, existingBookings]);

  return { cancelBooking };
};

export const loadBookingsFromStorage = async (): Promise<Booking[]> => {
  try {
    const stored = await AsyncStorage.getItem(BOOKINGS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load bookings:', error);
    return [];
  }
};