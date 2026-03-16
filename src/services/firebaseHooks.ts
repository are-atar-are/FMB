import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { setVehicles, confirmBooking as confirmBookingAction } from '../features/booking/redux/bookingSlice';
import { selectSelectedVehicle, selectSelectedDate, selectSelectedTime, selectSelectedDays } from '../features/booking/redux/bookingSelectors';
import { Vehicle } from '../features/booking/types';

// Placeholder user ID - replace with actual auth
const CURRENT_USER_ID = 'user-001';

// Mock vehicles data for when Firebase is not connected
const MOCK_VEHICLES: Vehicle[] = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
    name: 'VW Polo',
    type: 'Hatch',
    available: false,
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
];

export const useFirebaseVehicles = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // For now, use mock data since Firebase isn't fully set up
    // TODO: Replace with actual Firebase integration
    dispatch(setVehicles(MOCK_VEHICLES));

    // When Firebase is ready, use this:
    /*
    const loadVehicles = async () => {
      try {
        const vehicles = await fetchVehicles();
        dispatch(setVehicles(vehicles));
      } catch (error) {
        console.error('Failed to load vehicles:', error);
        // Fallback to mock data
        dispatch(setVehicles(MOCK_VEHICLES));
      }
    };

    loadVehicles();

    // Real-time subscription
    const unsubscribe = subscribeToVehicles((vehicles) => {
      dispatch(setVehicles(vehicles));
    });

    return () => unsubscribe();
    */
  }, [dispatch]);
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
      // For now, just update Redux without Firebase
      // TODO: Save to Firebase when ready
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
      // TODO: Cancel in Firebase when ready
      console.log('Cancelling booking:', bookingId);
      return true;
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      return false;
    }
  }, []);

  return { cancelBooking };
};