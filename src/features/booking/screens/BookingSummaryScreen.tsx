import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import {
  selectSelectedVehicle,
  selectSelectedDate,
  selectSelectedDays,
  selectSelectedTime,
} from '../redux/bookingSelectors';

const vehicleImages: { [key: string]: any } = {
  'hilux-side': require('../../../assets/images/vehicles/hilux-side.jpg'),
  'hilux-front': require('../../../assets/images/vehicles/hilux-front.jpg'),
  'sedan-top': require('../../../assets/images/vehicles/sedan-top.jpg'),
};

interface BookingSummaryScreenProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const BookingSummaryScreen: React.FC<BookingSummaryScreenProps> = ({
  onConfirm,
  onCancel,
}) => {
  const vehicle = useSelector(selectSelectedVehicle);
  const date = useSelector(selectSelectedDate);
  const days = useSelector(selectSelectedDays);
  const time = useSelector(selectSelectedTime);

  if (!vehicle || !date || !days || !time) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Missing booking information</Text>
        <TouchableOpacity style={styles.button} onPress={onCancel}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getVehicleImage = () => {
    if (vehicle.vehicleImage && vehicleImages[vehicle.vehicleImage]) {
      return vehicleImages[vehicle.vehicleImage];
    }
    return null;
  };

  const vehicleImage = getVehicleImage();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Booking Summary</Text>
        <Text style={styles.subheader}>Review your vehicle booking</Text>

        {/* Vehicle Card */}
        <View style={styles.vehicleCard}>
          {vehicleImage && (
            <Image source={vehicleImage} style={styles.vehicleImage} resizeMode="contain" />
          )}
          <Text style={styles.vehicleName}>{vehicle.name}</Text>
          <Text style={styles.vehicleType}>{vehicle.type}</Text>
          <View style={styles.locationBadge}>
            <Text style={styles.locationText}>📍 {vehicle.location}</Text>
          </View>
        </View>

        {/* Booking Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Booking Details</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Pickup Date</Text>
            <Text style={styles.detailValue}>{formatDate(date)}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Pickup Time</Text>
            <Text style={styles.detailValue}>{time}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>{days} {days === 1 ? 'Day' : 'Days'}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Vehicle Reg</Text>
            <Text style={styles.detailValue}>{vehicle.registration}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Fuel Type</Text>
            <Text style={styles.detailValue}>{vehicle.fuelType}</Text>
          </View>
        </View>

        {/* Important Notes */}
        <View style={styles.notesCard}>
          <Text style={styles.notesTitle}>📋 Important Notes</Text>
          <Text style={styles.notesText}>
            • Please arrive 10 minutes before pickup time{'\n'}
            • Bring your driver's license{'\n'}
            • Vehicle must be returned with same fuel level{'\n'}
            • Report any damages immediately
          </Text>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
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
  subheader: {
    fontSize: 16,
    color: '#666',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  vehicleCard: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  vehicleImage: {
    width: 200,
    height: 120,
    marginBottom: 16,
  },
  vehicleName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  vehicleType: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  locationBadge: {
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  locationText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  detailsCard: {
    backgroundColor: 'white',
    margin: 20,
    marginTop: 0,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 15,
    color: '#666',
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  notesCard: {
    backgroundColor: '#fffbeb',
    margin: 20,
    marginTop: 0,
    borderRadius: 20,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 12,
  },
  notesText: {
    fontSize: 14,
    color: '#92400e',
    lineHeight: 22,
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
    marginBottom: 12,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
  cancelButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 100,
  },
  button: {
    backgroundColor: '#007AFF',
    margin: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BookingSummaryScreen;