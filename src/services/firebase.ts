import firestore from '@react-native-firebase/firestore';
import { Vehicle, Booking } from '../features/booking/types';

// Collection references
const VEHICLES_COLLECTION = 'vehicles';
const BOOKINGS_COLLECTION = 'bookings';

/**
 * Fetch all available vehicles from Firestore
 */
export const fetchVehicles = async (): Promise<Vehicle[]> => {
  try {
    const snapshot = await firestore()
      .collection(VEHICLES_COLLECTION)
      .where('available', '==', true)
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Vehicle));
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
};

/**
 * Create a new booking in Firestore
 */
export const createBooking = async (booking: Omit<Booking, 'id'>): Promise<string> => {
  try {
    const docRef = await firestore()
      .collection(BOOKINGS_COLLECTION)
      .add({
        ...booking,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    return docRef.id;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

/**
 * Fetch all bookings for a user
 */
export const fetchUserBookings = async (userId: string): Promise<Booking[]> => {
  try {
    const snapshot = await firestore()
      .collection(BOOKINGS_COLLECTION)
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Booking));
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

/**
 * Update booking status
 */
export const updateBookingStatus = async (
  bookingId: string,
  status: Booking['status']
): Promise<void> => {
  try {
    await firestore()
      .collection(BOOKINGS_COLLECTION)
      .doc(bookingId)
      .update({
        status,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
};

/**
 * Cancel a booking
 */
export const cancelBooking = async (bookingId: string): Promise<void> => {
  return updateBookingStatus(bookingId, 'cancelled');
};

/**
 * Subscribe to real-time vehicle updates
 */
export const subscribeToVehicles = (
  callback: (vehicles: Vehicle[]) => void
) => {
  return firestore()
    .collection(VEHICLES_COLLECTION)
    .onSnapshot(
      snapshot => {
        const vehicles = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as Vehicle));
        callback(vehicles);
      },
      error => {
        console.error('Error subscribing to vehicles:', error);
      }
    );
};

/**
 * Subscribe to real-time booking updates for a user
 */
export const subscribeToUserBookings = (
  userId: string,
  callback: (bookings: Booking[]) => void
) => {
  return firestore()
    .collection(BOOKINGS_COLLECTION)
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .onSnapshot(
      snapshot => {
        const bookings = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as Booking));
        callback(bookings);
      },
      error => {
        console.error('Error subscribing to bookings:', error);
      }
    );
};