import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

// Seeding data
const SEED_VEHICLES = [
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
    vehicleImage: 'sedan-top',
  },
];

interface SeedDatabaseScreenProps {
  onDone: () => void;
}

const SeedDatabaseScreen: React.FC<SeedDatabaseScreenProps> = ({ onDone }) => {
  const [seeding, setSeeding] = React.useState(false);
  const [progress, setProgress] = React.useState('');

  const seedDatabase = async () => {
    setSeeding(true);
    setProgress('Starting...');

    try {
      const batch = firestore().batch();

      for (let i = 0; i < SEED_VEHICLES.length; i++) {
        const vehicle = SEED_VEHICLES[i];
        const docRef = firestore().collection('vehicles').doc(vehicle.id);
        
        batch.set(docRef, {
          ...vehicle,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
        
        setProgress(`Adding ${vehicle.name}... (${i + 1}/${SEED_VEHICLES.length})`);
      }

      await batch.commit();
      
      setProgress('✅ Database seeded successfully!');
      Alert.alert(
        'Success!',
        `Added ${SEED_VEHICLES.length} vehicles to the database.`,
        [{ text: 'OK', onPress: onDone }]
      );
    } catch (error) {
      console.error('Error seeding database:', error);
      setProgress('❌ Error: ' + (error as Error).message);
      Alert.alert('Error', 'Failed to seed database: ' + (error as Error).message);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Seed Database</Text>
      <Text style={styles.subtitle}>
        This will add {SEED_VEHICLES.length} vehicles to Firebase Firestore.
      </Text>

      <View style={styles.vehicleList}>
        {SEED_VEHICLES.map((vehicle) => (
          <View key={vehicle.id} style={styles.vehicleItem}>
            <Text style={styles.vehicleName}>• {vehicle.name}</Text>
            <Text style={styles.vehicleLocation}>  {vehicle.location}</Text>
          </View>
        ))}
      </View>

      {progress ? (
        <Text style={styles.progress}>{progress}</Text>
      ) : null}

      <TouchableOpacity
        style={[styles.button, seeding && styles.buttonDisabled]}
        onPress={seedDatabase}
        disabled={seeding}
      >
        <Text style={styles.buttonText}>
          {seeding ? 'Seeding...' : 'Seed Database'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipButton} onPress={onDone}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  vehicleList: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  vehicleItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  vehicleLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  progress: {
    fontSize: 14,
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
  skipButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

export default SeedDatabaseScreen;