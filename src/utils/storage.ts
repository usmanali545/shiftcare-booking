// src/utils/storage.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Booking } from "../types";

const BOOKINGS_KEY = "SHIFTCARE_BOOKINGS";

export async function saveBookings(bookings: Booking[]) {
  await AsyncStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

export async function loadBookings(): Promise<Booking[]> {
  const value = await AsyncStorage.getItem(BOOKINGS_KEY);
  return value ? JSON.parse(value) : [];
}
