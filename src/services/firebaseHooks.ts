import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { setVehicles, confirmBooking as confirmBookingAction, setBookings } from '../features/booking/redux/bookingSlice';
import { selectSelectedVehicle, selectSelectedDate, selectSelectedTime, selectSelectedDays, selectBookings } from '../features/booking/redux/bookingSelectors';
import { Vehicle, Booking } from '../features/booking/types';
import firestore from '@react-native-firebase/firestore';

// Placeholder user ID - replace with actual auth
const CURRENT_USER_ID = 'user-001';

// Mock vehicles data as fallback
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
    // Subscribe to real-time vehicle updates from Firebase
    const unsubscribe = firestore()
      .collection('vehicles')
      .onSnapshot(
        snapshot => {
          if (snapshot.empty) {
            // If no vehicles in Firebase, use mock data
            console.log('No vehicles in Firebase, using mock data');
            dispatch(setVehicles(MOCK_VEHICLES));
          } else {
            const vehicles = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            } as Vehicle));
            dispatch(setVehicles(vehicles));
          }
        },
        error => {
          console.error('Error fetching vehicles from Firebase:', error);
          // Fallback to mock data on error
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
        status: 'confirmed',
        userId: CURRENT_USER_ID,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      // Save to Firebase
      await firestore().collection('bookings').add(bookingData);
      
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
      await firestore()
        .collection('bookings')
        .doc(bookingId)
        .update({ status: 'cancelled' });
      return true;
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      return false;
    }
  }, []);

  return { cancelBooking };
};

export const useUserBookings = (userId: string) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('bookings')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        snapshot => {
          const bookings = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          } as Booking));
          dispatch(setBookings(bookings));
        },
        error => {
          console.error('Error fetching bookings:', error);
        }
      );

    return () => unsubscribe();
  }, [dispatch, userId]);
};

// Helper function to seed vehicles to Firebase
export const seedVehiclesToFirebase = async (): Promise<void> => {
  try {
    const batch = firestore().batch();
    
    for (const vehicle of MOCK_VEHICLES) {
      const docRef = firestore().collection('vehicles').doc(vehicle.id);
      batch.set(docRef, {
        ...vehicle,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    }
    
    await batch.commit();
    console.log('✅ Vehicles seeded to Firebase successfully!');
  } catch (error) {
    console.error('Error seeding vehicles:', error);
    throw error;
  }
};