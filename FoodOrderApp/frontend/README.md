# Saffron Kitchen - Mobile Client (Frontend)

This directory contains the entire mobile application built using [React Native](https://reactnative.dev/) and the [Expo](https://expo.dev/) framework.

## 📦 Tech Stack & Libraries

- **Framework**: Expo SDK 54 / React Native 0.81
- **Navigation**: Expo Router (File-based routing system)
- **State Management**: React Context (`CartContext`)
- **Backend / Database**: Firebase SDK (Firestore)
- **Icons**: `@expo/vector-icons`
- **UI & Animations**: React Native Core Components + `Animated` API

## 📂 Architecture overview

```text
frontend/
├── app/                  # Application screens (Expo Router)
│   ├── (tabs)/           # Bottom navigation tab screens (Home, Profile)
│   ├── _layout.tsx       # Root layout and context providers
│   ├── cart.tsx          # Shopping Cart
│   ├── item-detail.tsx   # Individual Menu Item screen
│   ├── order-summary.tsx # Checkout Flow & Address Edit
│   └── confirmation.tsx  # Animated Success Screen
├── components/           # Reusable functional components (BottomNav)
├── constants/            # Theming files (Colors, Fonts)
└── src/                  
    ├── context/          # Global application state (Cart management)
    ├── hooks/            # Custom React hooks (useMenu, useOrder)
    └── services/         # Firebase abstraction layer
```

## 🚀 Development Setup

1. **Install Dependencies**
   Navigate to the `frontend` directory and install the necessary packages:
   ```bash
   npm install
   ```

2. **Configure Firebase**
   Ensure that `firebase.config.js` exists in the root of this frontend folder and contains your valid Firebase connection parameters:
   ```javascript
   import { initializeApp } from 'firebase/app';
   import { getFirestore } from 'firebase/firestore';

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

   export const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   ```

3. **Start the Development Server**
   Start Expo's Metro Bundler:
   ```bash
   npx expo start
   ```

4. **Testing on Devices**
   - **Physical Device**: Download the *Expo Go* app on iOS/Android and scan the QR code rendered in your terminal.
   - **Simulator/Emulator**: Press `i` for iOS Simulator or `a` for Android Emulator in the terminal once the Metro bundler is running.

## 🧹 Available Scripts

- `npm start`: Starts the Expo Metro bundler.
- `npm run android`: Starts the bundler and attempts to open an Android Emulator.
- `npm run ios`: Starts the bundler and attempts to open an iOS Simulator.
- `npm run lint`: Runs ESLint to check for code quality and syntax errors.
