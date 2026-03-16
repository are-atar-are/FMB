#!/bin/bash

# Firebase Firestore Database Seeding Script
# This script uses Firebase CLI to seed the database

echo "🚗 Seeding FMB Fleet Management Database..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Check if user is logged in
echo "🔑 Checking Firebase login..."
firebase login

# Seed vehicles collection
echo "📦 Seeding vehicles collection..."

# Vehicle 1: Toyota Hilux
firebase firestore:documents:set vehicles/hilux-001 <<EOF
{
  "name": "Toyota Hilux",
  "type": "Bakkie",
  "available": true,
  "registration": "ABC123GP",
  "fuelType": "Diesel",
  "power": "150 KW",
  "topSpeed": "170 km/h",
  "location": "Johannesburg Office",
  "bookingTimeSlots": ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM"],
  "driverName": "Company Fleet",
  "driverRole": "Internal",
  "vehicleImage": "hilux-side"
}
EOF

# Vehicle 2: Ford Ranger
firebase firestore:documents:set vehicles/ranger-001 <<EOF
{
  "name": "Ford Ranger",
  "type": "Bakkie",
  "available": true,
  "registration": "XYZ789GP",
  "fuelType": "Diesel",
  "power": "200 KW",
  "topSpeed": "180 km/h",
  "location": "Cape Town Office",
  "bookingTimeSlots": ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"],
  "driverName": "Company Fleet",
  "driverRole": "Internal",
  "vehicleImage": "hilux-front"
}
EOF

# Vehicle 3: VW Polo
firebase firestore:documents:set vehicles/polo-001 <<EOF
{
  "name": "VW Polo",
  "type": "Hatch",
  "available": true,
  "registration": "DEF456GP",
  "fuelType": "Petrol",
  "power": "85 KW",
  "topSpeed": "190 km/h",
  "location": "Durban Office",
  "bookingTimeSlots": ["8:00 AM", "9:00 AM", "10:00 AM"],
  "driverName": "Company Fleet",
  "driverRole": "Internal",
  "vehicleImage": "sedan-top"
}
EOF

# Vehicle 4: Isuzu D-Max
firebase firestore:documents:set vehicles/isuzu-001 <<EOF
{
  "name": "Isuzu D-Max",
  "type": "Bakkie",
  "available": true,
  "registration": "GHI789GP",
  "fuelType": "Diesel",
  "power": "130 KW",
  "topSpeed": "165 km/h",
  "location": "Johannesburg Office",
  "bookingTimeSlots": ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"],
  "driverName": "Company Fleet",
  "driverRole": "Internal",
  "vehicleImage": "hilux-side"
}
EOF

# Vehicle 5: Toyota Corolla
firebase firestore:documents:set vehicles/corolla-001 <<EOF
{
  "name": "Toyota Corolla",
  "type": "Sedan",
  "available": true,
  "registration": "JKL012GP",
  "fuelType": "Petrol",
  "power": "103 KW",
  "topSpeed": "195 km/h",
  "location": "Cape Town Office",
  "bookingTimeSlots": ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"],
  "driverName": "Company Fleet",
  "driverRole": "Internal",
  "vehicleImage": "sedan-top"
}
EOF

echo "✅ Database seeded successfully!"
echo ""
echo "📊 Summary:"
echo "  - 5 vehicles added"
echo "  - Locations: Johannesburg, Cape Town, Durban"
echo "  - Types: Bakkie, Hatch, Sedan"
echo ""
echo "🚀 You can now run the app and it will use real Firebase data!"