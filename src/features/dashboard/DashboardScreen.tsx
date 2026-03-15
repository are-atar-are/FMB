import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
} from './dashboardSlice';

const DashboardScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  const fetchData = async () => {
    dispatch(fetchDataStart());
    try {
      // Simulate API call
      setTimeout(() => {
        dispatch(
          fetchDataSuccess([
            { id: 1, title: 'Item 1', value: 100 },
            { id: 2, title: 'Item 2', value: 200 },
            { id: 3, title: 'Item 3', value: 300 },
          ])
        );
      }, 1000);
    } catch (err) {
      dispatch(fetchDataFailure('Failed to fetch data'));
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.value}>Value: {item.value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchData} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>No data available</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  empty: {
    alignItems: 'center',
    marginTop: 32,
  },
});

export default DashboardScreen;