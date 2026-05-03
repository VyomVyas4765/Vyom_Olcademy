# 🌶️ Saffron Kitchen - Food Ordering App

![Saffron Kitchen Banner](https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3)

A modern food ordering mobile application built with **React Native (Expo)** and **Firebase**. Saffron Kitchen offers an intuitive and fluid user experience designed for seamless browsing, cart management, and order placement.

---

## 📱 Features

- **Modern UI/UX**: Clean, responsive, and beautiful design with smooth micro-animations.
- **Dynamic Menu**: Real-time menu rendering synced from the database.
- **Cart Management**: Add, remove, and update item quantities with a globally managed state using React Context.
- **Custom Checkout Flow**: Smooth transition from Cart ➔ Order Summary ➔ Confirmation.
- **Editable Delivery Info**: Users can update their delivery address dynamically before checkout.
- **Firebase Integration**: Orders are pushed directly to a Firestore database securely and instantly.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React Native](https://reactnative.dev/) / [Expo](https://expo.dev/) (v54)
- **Routing**: Expo Router (File-based routing)
- **State Management**: React Context API (`CartContext`)
- **Icons**: `@expo/vector-icons` (MaterialIcons)
- **Animations**: React Native `Animated` API

### Backend / Database
- **Database**: [Firebase Firestore](https://firebase.google.com/) (Serverless Architecture)
- **Future Infrastructure**: A `/backend` directory is scaffolded and reserved for future Node.js/Express microservices, webhooks, and payment gateway integrations.

---

## 📂 Project Structure

```text
FoodOrderApp/
├── frontend/                 ← Expo React Native app
│   ├── app/                  ← Expo Router pages (Screens)
│   │   ├── (tabs)/           ← Bottom Tab Navigator (Home)
│   │   ├── cart.tsx          ← Cart Screen
│   │   ├── item-detail.tsx   ← Product Details Screen
│   │   ├── order-summary.tsx ← Checkout & Summary
│   │   └── confirmation.tsx  ← Success Screen (Animated)
│   ├── components/           ← Reusable UI Components
│   ├── constants/            ← Theme Colors & Typography
│   └── src/                  
│       ├── context/          ← Global State (CartContext)
│       ├── hooks/            ← Custom Hooks (useOrder, useMenu)
│       └── services/         ← Firebase API logic
├── backend/                  ← Reserved for future backend services
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/client) app installed on your physical device, OR an iOS Simulator / Android Emulator.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/FoodOrderApp.git
   cd FoodOrderApp/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase:**
   Open `frontend/firebase.config.js` and ensure your Firebase configuration keys are correctly set up. 

4. **Start the Expo server:**
   ```bash
   npx expo start
   ```

5. **Run the App:**
   - Press `a` to open on an Android emulator.
   - Press `i` to open on an iOS simulator.
   - Scan the QR code with your phone's camera (iOS) or Expo Go app (Android) to test on a physical device.

---

## 🔮 Roadmap

- [ ] **Authentication**: Add Firebase Auth for user login and order history.
- [ ] **Payment Gateway**: Integrate Stripe or Razorpay for seamless checkouts.
- [ ] **Order Tracking**: Real-time driver tracking and status updates.
- [ ] **Backend Microservices**: Utilize the `/backend` folder to move sensitive logic (like payment verification) to a secure Node environment.

---

Made with ❤️ and ☕
