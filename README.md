# ShiftCare Technical Challenge – Appointment Booking App

## 📱 Overview

This is a React Native mobile application built using Expo that allows users to browse available doctors, view their schedules, and book 30-minute appointment slots. The app focuses on clean UI, predictable state management, and handling real-world edge cases such as invalid data and double bookings.

---

## 🚀 Tech Stack

- React Native (Expo)
- TypeScript
- React Navigation (Native Stack)
- Redux Toolkit (State Management)
- AsyncStorage (Local Persistence)
- Jest + React Native Testing Library (Testing)

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js (Recommended: v20.x LTS)
- npm
- Expo Go (latest version installed on mobile device)

### Installation

```bash
git clone https://github.com/usmanali545/shiftcare-booking.git
cd shiftcare-booking
npm install
```

### Start the App

```bash
npx expo start --clear
```

- Scan the QR code using Expo Go (Android/iOS)
- Or run on emulator/simulator

---

## 🧪 Run Tests

```bash
npm test
```

---

## 📖 Usage

### 1. Browse Doctors

- View a list of available doctors on the home screen.
- Only doctors with valid schedule availability are displayed.

### 2. View Availability

- Select a doctor to view available appointment slots.
- Slots are generated dynamically in 30-minute intervals.

### 3. Book Appointment

- Select a slot and confirm booking.
- Bookings are persisted locally.

### 4. Manage Bookings

- View all bookings in "My Bookings"
- Cancel appointments anytime

---

## 🧠 Assumptions & Design Decisions

### Assumptions

- API does not provide unique doctor IDs → generated from doctor name
- Time values are in 12-hour format (e.g., "9:00AM")
- Device local timezone is used (no conversion applied)
- No authentication is required (as per requirements)
- Bookings are stored locally only (no backend)

### Design Decisions

- **Redux Toolkit** used for predictable and scalable state management
- **AsyncStorage** used for persistence since no backend is required
- **Slot generation logic isolated** into utility functions for testability
- **Navigation structure kept simple** using native stack
- **Defensive programming** used to handle malformed API data
- **Duplicate booking prevention** implemented at state level

---

## ⚠️ Known Limitations

- No backend integration (bookings are local only)
- No cross-device synchronization
- No timezone conversion support
- No authentication or user profiles
- Limited UI polish (focus was functionality over design)
- No calendar-style UI for date selection

---

## 🌟 Future Enhancements

- Add backend API for real booking system
- Implement user authentication and profiles
- Add calendar-based UI for better UX
- Introduce timezone-aware scheduling
- Add push notifications for reminders
- Implement offline-first support with queued bookings
- Improve accessibility and animations
- Add pagination or search for doctors

---

## 🧪 Testing Coverage

The project includes automated tests covering:

### Edge Cases

- Invalid or malformed time formats
- Schedule windows shorter than 30 minutes
- End time earlier than start time
- Empty or missing schedule data

### Negative Cases

- Prevent double booking of same doctor/time
- Handle API failure scenarios
- Ensure slot uniqueness and correctness

---

## ⚙️ Environment Notes

- This project is tested with Node.js v20.x

- Avoid using:

  ```bash
  npm audit fix --force
  ```

  as it may break Expo dependency compatibility

- Use:

  ```bash
  npx expo install --fix
  ```

  for safe dependency alignment

---

## 📌 Summary

This project demonstrates:

- Strong understanding of React Native fundamentals
- Clean separation of concerns
- Robust handling of edge cases
- Scalable state management
- Practical real-world engineering decisions

---
