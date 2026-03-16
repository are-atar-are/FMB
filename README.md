# MY-FNB Fleet Management App

A React Native application for internal company fleet management. Employees can book company vehicles for business use.

## Features

- 🚗 **Vehicle Booking** - Browse and book available company vehicles
- 📅 **Date & Time Selection** - Choose pickup date, time, and duration
- 📋 **Booking Summary** - Review booking details before confirming
- ✅ **Confirmation Screen** - Success feedback with booking reference
- 📖 **My Bookings** - View all bookings with status tracking
- 🔥 **Firebase Integration** - Real-time data with Firestore
- 💾 **Offline Support** - Redux Persist for local state

## Screens

1. **Splash Screen** - Branded app launch animation
2. **Booking Screen** - Select date, duration, vehicle, and time
3. **Booking Summary** - Review booking details (no payment)
4. **Booking Confirmation** - Success screen with booking reference
5. **My Bookings** - List of all bookings with status

## Tech Stack

- React Native 0.73.6
- TypeScript
- Redux Toolkit + Redux Persist
- React Native Firebase (Firestore)
- React Navigation (ready for integration)

## Installation

```bash
# Install dependencies
npm install

# iOS setup
cd ios && pod install && cd ..

# Run on iOS
npx react-native run-ios

# Run on Android
npx react-native run-android
```

## Firebase Setup

The app uses Firebase Firestore for:
- Vehicle data
- Booking records
- Real-time updates

Firebase config files are already in place:
- `android/app/google-services.json`
- `ios/FMB/GoogleService-Info.plist`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorBoundary.tsx
│   ├── LoadingScreen.tsx
│   └── SplashScreen.tsx
├── features/
│   └── booking/
│       ├── components/  # Booking-specific components
│       ├── redux/       # Redux slice & selectors
│       ├── screens/     # Screen components
│       └── types/       # TypeScript types
├── services/            # Firebase services
│   ├── firebase.ts
│   └── firebaseHooks.ts
└── store/               # Redux store configuration
    └── store.ts
```

## Booking Flow

```
Splash → Booking → Summary → Confirmation → My Bookings
                              ↓
                        Book Another
                              ↓
                           Booking
```

## State Management

- **Redux** - Global state management
- **Redux Persist** - Persist state across app restarts
- **Firebase** - Server-side data & real-time sync

## Future Enhancements

- [ ] User authentication
- [ ] Push notifications
- [ ] Admin dashboard
- [ ] Vehicle tracking
- [ ] Trip history
- [ ] Damage reporting
- [ ] Fuel logging

## License

Internal use only.
