import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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
        name: 'Ford Ranger',
        type: 'Bakkie',
        available: true,
        registration: 'ABC123GP',
        fuelType: 'Diesel',
        power: '200 KW',
        topSpeed: '180 km/h',
        location: 'Johannesburg Office',
        bookingTimeSlots: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM'],
        driverName: 'Company Fleet',
        driverRole: 'Internal',
        pricePerDay: '',
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
        location: 'Cape Town Office',
        bookingTimeSlots: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'],
        driverName: 'Company Fleet',
        driverRole: 'Internal',
        pricePerDay: '',
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
        location: 'Durban Office',
        bookingTimeSlots: ['8:00 AM', '9:00 AM', '10:00 AM'],
        driverName: 'Company Fleet',
        driverRole: 'Internal',
        pricePerDay: '',
        vehicleImage: 'vw-golf',
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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
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
          <Text style={styles.sectionTitle}>Duration (Days)</Text>
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
          {vehicles.map((vehicle) => (
            <TouchableOpacity
              key={vehicle.id}
              style={[
                styles.vehicleCard,
                selectedVehicle?.id === vehicle.id && styles.selectedCard,
              ]}
              onPress={() => handleSelectVehicle(vehicle)}
            >
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
              
              {selectedVehicle?.id === vehicle.id && (
                <View style={styles.timeSlots}>
                  <Text style={styles.timeSlotTitle}>Select Time:</Text>
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
          ))}
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
            // Handle booking confirmation
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
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: 'white',
  },
  section: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  dateCard: {
    width: 70,
    height: 90,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginRight: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  durationCard: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedCard: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  dayName: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
  },
  dayNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#333',
  },
  monthName: {
    fontSize: 12,
    color: '#666',
  },
  durationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  selectedText: {
    color: 'white',
  },
  vehicleCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  availableBadge: {
    backgroundColor: '#4CAF50',
  },
  unavailableBadge: {
    backgroundColor: '#FF5722',
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  vehicleType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  vehicleLocation: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  vehicleReg: {
    fontSize: 12,
    color: '#999',
  },
  timeSlots: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  timeSlotTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#007AFF',
  },
  timeSlotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedTimeSlot: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  timeSlotText: {
    fontSize: 12,
    color: '#333',
  },
  selectedTimeText: {
    color: 'white',
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BookingScreen;