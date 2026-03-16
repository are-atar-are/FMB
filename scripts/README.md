# Firebase Database Seeding

This folder contains scripts to seed your Firebase Firestore database with sample data.

## Option 1: Firebase Console (Easiest)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (my-fmb)
3. Go to "Firestore Database"
4. Click "Start collection"
5. Collection ID: `vehicles`
6. Add documents manually using the data from `firebase-seed.json`

## Option 2: Firebase CLI

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Run the seed script
./seedDatabase.sh
```

## Option 3: Node.js Script (Requires Service Account)

```bash
# Download service account key from Firebase Console
# Project Settings → Service Accounts → Generate new private key
# Save as `service-account.json` in this folder

# Run the script
node seedDatabase.js
```

## Vehicle Data Structure

Each vehicle document should have:

```json
{
  "name": "Toyota Hilux",
  "type": "Bakkie",
  "available": true,
  "registration": "ABC123GP",
  "fuelType": "Diesel",
  "power": "150 KW",
  "topSpeed": "170 km/h",
  "location": "Johannesburg Office",
  "bookingTimeSlots": ["9:00 AM", "10:00 AM", "11:00 AM"],
  "driverName": "Company Fleet",
  "driverRole": "Internal",
  "vehicleImage": "hilux-side"
}
```

## Available Vehicle Images

- `hilux-side` - Side view of pickup truck
- `hilux-front` - Front view of pickup truck
- `sedan-top` - Top-down view of sedan

## Locations

- Johannesburg Office
- Cape Town Office
- Durban Office

## Vehicle Types

- Bakkie
- Hatch
- Sedan

## After Seeding

Once you've seeded the database:

1. Reload the app (R in Metro bundler)
2. The app will now fetch real data from Firebase
3. Bookings will be saved to Firebase in real-time
