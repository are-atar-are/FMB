import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Vehicle, CarType } from '../types';

interface VehicleSelectionProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onSelectDays: (vehicle: Vehicle) => void;
  onSelectTime: (vehicle: Vehicle) => void;
}

const filters: { label: string; value: CarType | 'All' }[] = [
  { label: 'All', value: 'All' },
  { label: 'Bakkie', value: 'Bakkie' },
  { label: 'Hatch', value: 'Hatch' },
];

const VehicleSelection: React.FC<VehicleSelectionProps> = ({
  vehicles,
  selectedVehicle,
  onSelectVehicle,
  onSelectDays,
  onSelectTime,
}) => {
  const [activeFilter, setActiveFilter] = useState<CarType | 'All'>('All');

  const filteredVehicles = activeFilter === 'All'
    ? vehicles
    : vehicles.filter((v) => v.type === activeFilter);

  return (
    <View style={styles.container}>
      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.value}
            style={[
              styles.filterButton,
              activeFilter === filter.value && styles.activeFilterButton,
            ]}
            onPress={() => setActiveFilter(filter.value)}
          >
            <Text style={[
              styles.filterText,
              activeFilter === filter.value && styles.activeFilterText,
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Vehicle List */}
      {filteredVehicles.map((vehicle) => (
        <TouchableOpacity
          key={vehicle.id}
          style={[
            styles.vehicleCard,
            selectedVehicle?.id === vehicle.id && styles.selectedVehicleCard,
          ]}
          onPress={() => onSelectVehicle(vehicle)}
        >
          <View style={styles.vehicleHeader}>
            <View>
              <Text style={styles.vehicleName}>{vehicle.name}</Text>
              <Text style={styles.vehicleType}>{vehicle.type}</Text>
            </View>
            <Text style={styles.vehiclePrice}>{vehicle.pricePerDay}/day</Text>
          </View>

          <View style={styles.vehicleDetails}>
            <Text style={styles.detailText}>📍 {vehicle.location}</Text>
            <Text style={styles.detailText}>⛽ {vehicle.fuelType}</Text>
            <Text style={styles.detailText}>🔋 {vehicle.power}</Text>
          </View>

          {/* Days and Time Selection */}
          <View style={styles.selectionRow}>
            <TouchableOpacity
              style={styles.selectionButton}
              onPress={() => onSelectDays(vehicle)}
            >
              <Text style={styles.selectionLabel}>Days</Text>
              <Text style={styles.selectionValue}>Select</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.selectionButton}
              onPress={() => onSelectTime(vehicle)}
            >
              <Text style={styles.selectionLabel}>Time</Text>
              <Text style={styles.selectionValue}>Select</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  activeFilterText: {
    color: 'white',
    fontWeight: '600',
  },
  vehicleCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedVehicleCard: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  vehicleType: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  vehiclePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  vehicleDetails: {
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  selectionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  selectionButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  selectionLabel: {
    fontSize: 12,
    color: '#666',
  },
  selectionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginTop: 4,
  },
});

export default VehicleSelection;