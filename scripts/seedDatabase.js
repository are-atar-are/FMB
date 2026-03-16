const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Sample vehicles data
const vehicles = [
  {
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
    pricePerDay: '',
    vehicleImage: 'sedan-top',
  },
  {
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
    pricePerDay: '',
    vehicleImage: 'hilux-side',
  },
  {
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
    pricePerDay: '',
    vehicleImage: 'sedan-top',
  },
];

async function seedVehicles() {
  console.log('Seeding vehicles...');
  
  const batch = db.batch();
  
  for (const vehicle of vehicles) {
    const docRef = db.collection('vehicles').doc();
    batch.set(docRef, {
      ...vehicle,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log(`Added: ${vehicle.name}`);
  }
  
  await batch.commit();
  console.log(`✅ Successfully seeded ${vehicles.length} vehicles!`);
}

async function clearVehicles() {
  console.log('Clearing existing vehicles...');
  
  const snapshot = await db.collection('vehicles').get();
  const batch = db.batch();
  
  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });
  
  await batch.commit();
  console.log(`✅ Cleared ${snapshot.size} vehicles`);
}

// Run the seed
async function main() {
  try {
    // Uncomment to clear existing data first
    // await clearVehicles();
    
    await seedVehicles();
    console.log('Done!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

main();