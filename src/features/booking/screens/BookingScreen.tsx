import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import {
  setSelectedDate,
  setSelectedVehicle,
  setSelectedDays,
  setSelectedTime,
  setVehicles,
} from '../redux/bookingSlice';
import {
  selectVehicles,
  selectSelectedDate,
  selectSelectedVehicle,
  selectSelectedDays,
  selectSelectedTime,
} from '../redux/bookingSelectors';
import { Vehicle } from '../types';

// Vehicle images
const vehicleImages: { [key: string]: any } = {
  'hilux-side': require('../../../assets/images/vehicles/hilux-side.jpg'),
  'hilux-front': require('../../../assets/images/vehicles/hilux-front.jpg'),
  'sedan-top': require('../../../assets/images/vehicles/sedan-top.jpg'),
};

const BookingScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const vehicles = useSelector(selectVehicles);
  const selectedDate = useSelector(selectSelectedDate);
  const selectedVehicle = useSelector(selectSelectedVehicle);
  const selectedDays = useSelector(selectSelectedDays);
  const selectedTime = useSelector(selectSelectedTime);

  useEffect(() => {
    // Load company fleet vehicles
    const fleetVehicles: Vehicle[] = [
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
    dispatch(setVehicles(fleetVehicles));
  }, [dispatch]);

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      dates.push({
        dateString: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        monthName: date.toLocaleDateString('en-US', { month: 'short' }),
      });
    }
    
    return dates;
  };

  const dates = generateDates();

  const handleSelectDate = (date: string) => {
    dispatch(setSelectedDate(date));
  };

  const handleSelectVehicle = (vehicle: Vehicle) => {
    dispatch(setSelectedVehicle(vehicle));
  };

  const handleSelectDays = (days: number) => {
    dispatch(setSelectedDays(days));
  };

  const handleSelectTime = (time: string) => {
    dispatch(setSelectedTime(time));
  };

  const canConfirm = selectedDate && selectedVehicle && selectedDays && selectedTime;

  const getVehicleImage = (imageName: string | undefined) => {
    if (imageName && vehicleImages[imageName]) {
      return vehicleImages[imageName];
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Book Company Vehicle</Text>
        
        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dates.map((date) => (
              <TouchableOpacity
                key={date.dateString}
                style={[
                  styles.dateCard,
                  selectedDate === date.dateString && styles.selectedCard,
                ]}
                onPress={() => handleSelectDate(date.dateString)}
              >
                <Text style={styles.dayName}>{date.dayName}</Text>
                <Text style={[
                  styles.dayNumber,
                  selectedDate === date.dateString && styles.selectedText,
                ]}>
                  {date.dayNumber}
                </Text>
                <Text style={styles.monthName}>{date.monthName}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Duration Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Duration</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3, 4, 5, 6, 7, 14].map((days) => (
              <TouchableOpacity
                key={days}
                style={[
                  styles.durationCard,
                  selectedDays === days && styles.selectedCard,
                ]}
                onPress={() => handleSelectDays(days)}
              >
                <Text style={[
                  styles.durationText,
                  selectedDays === days && styles.selectedText,
                ]}>
                  {days} {days === 1 ? 'Day' : 'Days'}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Vehicle Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Vehicles</Text>
          {vehicles.map((vehicle) => {
            const isSelected = selectedVehicle?.id === vehicle.id;
            const vehicleImage = getVehicleImage(vehicle.vehicleImage);
            
            return (
              <TouchableOpacity
                key={vehicle.id}
                style={[
                  styles.vehicleCard,
                  isSelected && styles.selectedVehicleCard,
                  !vehicle.available && styles.unavailableCard,
                ]}
                onPress={() => vehicle.available && handleSelectVehicle(vehicle)}
                disabled={!vehicle.available}
              >
                <View style={styles.vehicleRow}>
                  {/* Vehicle Image */}
                  <View style={styles.imageContainer}>
                    {vehicleImage ? (
                      <Image source={vehicleImage} style={styles.vehicleImage} resizeMode="contain" />
                    ) : (
                      <View style={styles.placeholderImage}>
                        <Text style={styles.placeholderText}>🚗</Text>
                      </View>
                    )}
                  </View>

                  {/* Vehicle Info */}
                  <View style={styles.vehicleInfo}>
                    <View style={styles.vehicleHeader}>
                      <Text style={styles.vehicleName}>{vehicle.name}</Text>
                      <View style={[
                        styles.statusBadge,
                        vehicle.available ? styles.availableBadge : styles.unavailableBadge,
                      ]}>
                        <Text style={styles.statusText}>
                          {vehicle.available ? 'Available' : 'In Use'}
                        </Text>
                      </View>
                    </View>
                    
                    <Text style={styles.vehicleType}>{vehicle.type}</Text>
                    <Text style={styles.vehicleLocation}>📍 {vehicle.location}</Text>
                    <Text style={styles.vehicleReg}>Reg: {vehicle.registration}</Text>
                  </View>
                </View>

                {/* Time Slots - Only show when selected */}
                {isSelected && vehicle.available && (
                  <View style={styles.timeSlotsContainer}>
                    <Text style={styles.timeSlotTitle}>Select Pickup Time</Text>
                    <View style={styles.timeSlotGrid}>
                      {vehicle.bookingTimeSlots.map((time) => (
                        <TouchableOpacity
                          key={time}
                          style={[
                            styles.timeSlot,
                            selectedTime === time && styles.selectedTimeSlot,
                          ]}
                          onPress={() => handleSelectTime(time)}
                        >
                          <Text style={[
                            styles.timeSlotText,
                            selectedTime === time && styles.selectedTimeText,
                          ]}>
                            {time}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            !canConfirm && styles.disabledButton,
          ]}
          disabled={!canConfirm}
          onPress={() => {
            console.log('Booking confirmed:', {
              date: selectedDate,
              vehicle: selectedVehicle?.name,
              days: selectedDays,
              time: selectedTime,
            });
          }}
        >
          <Text style={styles.confirmButtonText}>
            {canConfirm ? 'Confirm Booking' : 'Select All Options'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'white',
    color: '#1a1a1a',
  },
  section: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  dateCard: {
    width: 72,
    height: 90,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    marginRight: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  durationCard: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  dayName: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  dayNumber: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#1a1a1a',
  },
  monthName: {
    fontSize: 12,
    color: '#666',
  },
  durationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  selectedText: {
    color: 'white',
  },
  vehicleCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e8e8e8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedVehicleCard: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f7ff',
  },
  unavailableCard: {
    opacity: 0.6,
    backgroundColor: '#f5f5f5',
  },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 80,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleImage: {
    width: 100,
    height: 80,
    borderRadius: 12,
  },
  placeholderImage: {
    width: 80,
    height: 60,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 32,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availableBadge: {
    backgroundColor: '#34C759',
  },
  unavailableBadge: {
    backgroundColor: '#FF3B30',
  },
  statusText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
  },
  vehicleType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  vehicleLocation: {
    fontSize: 13,
    color: '#444',
    marginBottom: 2,
  },
  vehicleReg: {
    fontSize: 12,
    color: '#999',
  },
  timeSlotsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
  },
  timeSlotTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    color: '#007AFF',
  },
  timeSlotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedTimeSlot: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  timeSlotText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  selectedTimeText: {
    color: 'white',
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
});

export default BookingScreen;