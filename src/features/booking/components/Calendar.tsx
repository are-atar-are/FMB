import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

interface CalendarProps {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onSelectDate }) => {
  // Generate next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dateString = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNumber = date.getDate();
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      
      dates.push({
        dateString,
        dayName,
        dayNumber,
        monthName,
      });
    }
    
    return dates;
  };

  const dates = generateDates();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Date</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {dates.map((date) => (
          <TouchableOpacity
            key={date.dateString}
            style={[
              styles.dateCard,
              selectedDate === date.dateString && styles.selectedDateCard,
            ]}
            onPress={() => onSelectDate(date.dateString)}
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
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  dateCard: {
    width: 70,
    height: 90,
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedDateCard: {
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
  selectedText: {
    color: 'white',
  },
  monthName: {
    fontSize: 12,
    color: '#666',
  },
});

export default Calendar;