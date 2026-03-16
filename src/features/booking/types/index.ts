export type CarType = 'Bakkie' | 'Hatch' | 'Sedan';

export interface Vehicle {
  id: string;
  name: string;
  type: CarType;
  available: boolean;
  registration: string;
  fuelType: string;
  power: string;
  topSpeed: string;
  location: string;
  bookingTimeSlots: string[];
  driverName: string;
  driverRole: string;
  pricePerDay: string;
  vehicleImage?: string;
}

export interface Booking {
  id: string;
  vehicle: Vehicle;
  date: string;
  time: string;
  days: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface BookingState {
  hasBooking: boolean;
  selectedDate: string | null;
  selectedTime: string | null;
  selectedVehicle: Vehicle | null;
  selectedDays: number | null;
  placeInLine: number | null;
  estimatedWaitMinutes: number | null;
  vehicles: Vehicle[];
  bookings: Booking[];
  currentScreen: 'booking' | 'summary' | 'confirmation' | 'myBookings';
  shouldNavigateToPayment: boolean;
  shouldShowCarInfoModal: boolean;
}

export type ArrivalStatus = 'arrived' | 'late' | 'onMyWay';

export interface Trip {
  id: string;
  customerName: string;
  customerPhone: string;
  pickupLocation: string;
  deliveryLocation: string;
  progress: number;
}