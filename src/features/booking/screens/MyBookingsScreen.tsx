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
import { selectBookings } from '../redux/bookingSelectors';

const vehicleImages: { [key: string]: any } = {
  'hilux-side': require('../../../assets/images/vehicles/hilux-side.jpg'),
  'hilux-front': require('../../../assets/images/vehicles/hilux-front.jpg'),
  'sedan-top': require('../../../assets/images/vehicles/sedan-top.jpg'),
};

interface MyBookingsScreenProps {
  onBookNew: () => void;
  onCancelBooking: (bookingId: string) => void;
}

const MyBookingsScreen: React.FC<MyBookingsScreenProps> = ({
  onBookNew,
  onCancelBooking,
}) => {
  const bookings = useSelector(selectBookings);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#34C759';
      case 'pending':
        return '#FF9500';
      case 'completed':
        return '#007AFF';
      case 'cancelled':
        return '#FF3B30';
      default:
        return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getVehicleImage = (imageName: string | undefined) => {
    if (imageName && vehicleImages[imageName]) {
      return vehicleImages[imageName];
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <TouchableOpacity style={styles.newBookingButton} onPress={onBookNew}>
          <Text style={styles.newBookingText}>+ New Booking</Text>
        </TouchableOpacity>
      </View>

      {bookings.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🚗</Text>
          <Text style={styles.emptyTitle}>No Bookings Yet</Text>
          <Text style={styles.emptyText}>
            You haven't made any vehicle bookings. Start by booking a company vehicle.
          </Text>
          <TouchableOpacity style={styles.emptyButton} onPress={onBookNew}>
            <Text style={styles.emptyButtonText}>Book a Vehicle</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {bookings.map((booking) => {
            const vehicleImage = getVehicleImage(booking.vehicle.vehicleImage);
            const statusColor = getStatusColor(booking.status);

            return (
              <View key={booking.id} style={styles.bookingCard}>
                {/* Status Badge */}
                <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
                  <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                  <Text style={[styles.statusText, { color: statusColor }]}>
                    {getStatusText(booking.status)}
                  </Text>
                </View>

                <View style={styles.bookingContent}>
                  {/* Vehicle Image */}
                  {vehicleImage && (
                    <Image source={vehicleImage} style={styles.vehicleImage} resizeMode="contain" />
                  )}

                  {/* Booking Info */}
                  <View style={styles.bookingInfo}>
                    <Text style={styles.vehicleName}>{booking.vehicle.name}</Text>
                    <Text style={styles.vehicleType}>{booking.vehicle.type}</Text>
                    
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>📅</Text>
                      <Text style={styles.detailValue}>{formatDate(booking.date)}</Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>🕐</Text>
                      <Text style={styles.detailValue}>{booking.time}</Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>📍</Text>
                      <Text style={styles.detailValue}>{booking.vehicle.location}</Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>⏱️</Text>
                      <Text style={styles.detailValue}>
                        {booking.days} {booking.days === 1 ? 'Day' : 'Days'}
                      </Text>
                    </View>

                    <Text style={styles.bookingRef}>Ref: {booking.id}</Text>
                  </View>
                </View>

                {/* Actions */}
                {booking.status === 'confirmed' && (
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => onCancelBooking(booking.id)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel Booking</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  newBookingButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  newBookingText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  emptyButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
  },
  emptyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  bookingCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  bookingContent: {
    flexDirection: 'row',
  },
  vehicleImage: {
    width: 100,
    height: 80,
    marginRight: 16,
  },
  bookingInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  vehicleType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    marginRight: 8,
  },
  detailValue: {
    fontSize: 14,
    color: '#444',
  },
  bookingRef: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  cancelButton: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#fff5f5',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffcccc',
  },
  cancelButtonText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default MyBookingsScreen;