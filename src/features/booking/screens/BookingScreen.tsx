import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import {
  setSelectedDate,
  setSelectedVehicle,
  setShowCarInfoModal,
  setVehicles,
} from '../redux/bookingSlice';
import {
  selectVehicles,
  selectSelectedDate,
  selectSelectedVehicle,
} from '../redux/bookingSelectors';
import { Vehicle } from '../types';
import Calendar from '../components/Calendar';
import VehicleSelection from '../components/VehicleSelection';

const BookingScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const vehicles = useSelector(selectVehicles);
  const selectedDate = useSelector(selectSelectedDate);
  const selectedVehicle = useSelector(selectSelectedVehicle);

  useEffect(() => {
    // Load vehicles (in real app, this would come from Firestore)
    const mockVehicles: Vehicle[] = [
      {
        id: '1',
        name: 'Ford Ranger',
        type: 'Bakkie',
        available: true,
        registration: 'ABC123GP',
        fuelType: 'Diesel',
        power: '200 KW',
        topSpeed: '180 km/h',
        location: 'Johannesburg',
        bookingTimeSlots: ['9 AM', '10 AM', '11 AM', '12 PM'],
        driverName: 'John Doe',
        driverRole: 'Driver',
        pricePerDay: 'R500',
        vehicleImage: 'ford-ranger',
      },
      {
        id: '2',
        name: 'Toyota Hilux',
        type: 'Bakkie',
        available: true,
        registration: 'XYZ789GP',
        fuelType: 'Diesel',
        power: '150 KW',
        topSpeed: '170 km/h',
        location: 'Cape Town',
        bookingTimeSlots: ['9 AM', '10 AM', '2 PM', '3 PM'],
        driverName: 'Jane Smith',
        driverRole: 'Driver',
        pricePerDay: 'R450',
        vehicleImage: 'toyota-hilux',
      },
      {
        id: '3',
        name: 'VW Golf',
        type: 'Hatch',
        available: true,
        registration: 'DEF456GP',
        fuelType: 'Petrol',
        power: '110 KW',
        topSpeed: '200 km/h',
        location: 'Durban',
        bookingTimeSlots: ['8 AM', '9 AM', '10 AM'],
        driverName: 'Mike Johnson',
        driverRole: 'Driver',
        pricePerDay: 'R350',
        vehicleImage: 'vw-golf',
      },
    ];
    dispatch(setVehicles(mockVehicles));
  }, [dispatch]);

  const handleSelectDate = (date: string) => {
    dispatch(setSelectedDate(date));
  };

  const handleSelectVehicle = (vehicle: Vehicle) => {
    dispatch(setSelectedVehicle(vehicle));
    dispatch(setShowCarInfoModal(true));
  };

  const handleSelectDays = (vehicle: Vehicle) => {
    // TODO: Open days bottom sheet
    console.log('Select days for:', vehicle.name);
  };

  const handleSelectTime = (vehicle: Vehicle) => {
    // TODO: Open time bottom sheet
    console.log('Select time for:', vehicle.name);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Book a Vehicle</Text>
      
      {/* Calendar */}
      <Calendar
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
      />
      
      {/* Vehicle Selection */}
      <VehicleSelection
        vehicles={vehicles}
        selectedVehicle={selectedVehicle}
        onSelectVehicle={handleSelectVehicle}
        onSelectDays={handleSelectDays}
        onSelectTime={handleSelectTime}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: 'white',
  },
});

export default BookingScreen;