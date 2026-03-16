import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {
  setSelectedDate,
  setSelectedVehicle,
  setShowCarInfoModal,
  setVehicles,
} from '../redux/bookingSlice';
import { Vehicle } from '../types';

const BookingScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { vehicles, selectedDate, selectedVehicle } = useSelector(
    (state: RootState) => state.booking
  );

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
    ];
    dispatch(setVehicles(mockVehicles));
  }, [dispatch]);

  const handleSelectVehicle = (vehicle: Vehicle) => {
    dispatch(setSelectedVehicle(vehicle));
    dispatch(setShowCarInfoModal(true));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Book a Vehicle</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Vehicles</Text>
        {vehicles.map((vehicle) => (
          <TouchableOpacity
            key={vehicle.id}
            style={styles.vehicleCard}
            onPress={() => handleSelectVehicle(vehicle)}
          >
            <Text style={styles.vehicleName}>{vehicle.name}</Text>
            <Text style={styles.vehicleType}>{vehicle.type}</Text>
            <Text style={styles.vehiclePrice}>{vehicle.pricePerDay}/day</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: 'white',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  vehicleCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: '600',
  },
  vehicleType: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  vehiclePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginTop: 8,
  },
});

export default BookingScreen;