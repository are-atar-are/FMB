import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { setVehicles, confirmBooking as confirmBookingAction } from '../features/booking/redux/bookingSlice';
import { selectSelectedVehicle, selectSelectedDate, selectSelectedTime, selectSelectedDays } from '../features/booking/redux/bookingSelectors';
import { Vehicle, Booking } from '../features/booking/types';
import firestore from '@react-native-firebase/firestore';

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

// Check if Firebase is available
const isFirebaseAvailable = () => {
  try {
    firestore().collection('test');
    return true;
  } catch {
    return false;
  }
};

export const useFirebaseVehicles = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!isFirebaseAvailable()) {
      console.log('Firebase not available, using mock data');
      dispatch(setVehicles(MOCK_VEHICLES));
      return;
    }

    // Subscribe to real-time vehicle updates
    const unsubscribe = firestore()
      .collection('vehicles')
      .onSnapshot(
        snapshot => {
          const vehicles = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          } as Vehicle));
          dispatch(setVehicles(vehicles));
        },
        error => {
          console.error('Error fetching vehicles:', error);
          dispatch(setVehicles(MOCK_VEHICLES));
        }
      );

    return () => unsubscribe();
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
      const bookingData = {
        vehicle: selectedVehicle,
        date: selectedDate,
        time: selectedTime,
        days: selectedDays,
        status: 'confirmed' as const,
        userId: CURRENT_USER_ID,
        createdAt: new Date().toISOString(),
      };

      // Save to Firebase if available
      if (isFirebaseAvailable()) {
        await firestore().collection('bookings').add(bookingData);
      }

      // Update Redux
      dispatch(confirmBookingAction());
      
      return true;
    } catch (error) {
      console.error('Failed to create booking:', error);
      // Still update Redux even if Firebase fails
      dispatch(confirmBookingAction());
      return true;
    }
  }, [dispatch, selectedVehicle, selectedDate, selectedTime, selectedDays]);

  return { createNewBooking };
};

export const useCancelBooking = () => {
  const cancelBooking = useCallback(async (bookingId: string): Promise<boolean> => {
    try {
      if (isFirebaseAvailable()) {
        await firestore()
          .collection('bookings')
          .doc(bookingId)
          .update({ status: 'cancelled' });
      }
      return true;
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      return false;
    }
  }, []);

  return { cancelBooking };
};

export const useUserBookings = (userId: string) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseAvailable()) {
      setLoading(false);
      return;
    }

    const unsubscribe = firestore()
      .collection('bookings')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        snapshot => {
          const userBookings = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          } as Booking));
          setBookings(userBookings);
          setLoading(false);
        },
        error => {
          console.error('Error fetching user bookings:', error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, [userId]);

  return { bookings, loading };
};