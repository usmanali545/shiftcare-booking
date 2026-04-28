// src/store/bookingsSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Booking, AppointmentSlot } from "../types";

type BookingsState = {
  items: Booking[];
};

const initialState: BookingsState = {
  items: [],
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookings(state, action: PayloadAction<Booking[]>) {
      state.items = action.payload;
    },
    addBooking(state, action: PayloadAction<AppointmentSlot>) {
      const exists = state.items.some(
        (booking) =>
          booking.doctorId === action.payload.doctorId &&
          booking.day === action.payload.day &&
          booking.start === action.payload.start
      );

      if (!exists) {
        state.items.push({
          ...action.payload,
          id: `${action.payload.doctorId}-${action.payload.day}-${action.payload.start}`,
          createdAt: new Date().toISOString(),
        });
      }
    },
    cancelBooking(state, action: PayloadAction<string>) {
      state.items = state.items.filter((booking) => booking.id !== action.payload);
    },
  },
});

export const { setBookings, addBooking, cancelBooking } = bookingsSlice.actions;
export default bookingsSlice.reducer;
