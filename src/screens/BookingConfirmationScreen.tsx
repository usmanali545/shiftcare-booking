import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { addBooking } from "../store/bookingsSlice";
import { RootState } from "../store/store";
import { isSlotBooked } from "../utils/slots";

export default function BookingConfirmationScreen({ route, navigation }: any) {
  const { slot } = route.params;
  const dispatch = useDispatch();
  const bookings = useSelector((state: RootState) => state.bookings.items);

  const alreadyBooked = isSlotBooked(slot, bookings);

  function handleConfirm() {
    if (alreadyBooked) {
      Alert.alert(
        "Already booked",
        "This appointment slot is no longer available.",
      );
      navigation.goBack();
      return;
    }

    dispatch(addBooking(slot));

    // TODO: persist updated bookings to AsyncStorage.
    // Best option: use a store subscription or useEffect in App.tsx.

    Alert.alert("Booking confirmed", "Your appointment has been booked.");
    navigation.navigate("MyBookings");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Appointment</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Doctor</Text>
        <Text style={styles.value}>{slot.doctorName}</Text>

        <Text style={styles.label}>Day</Text>
        <Text style={styles.value}>{slot.day}</Text>

        <Text style={styles.label}>Time</Text>
        <Text style={styles.value}>
          {slot.start} - {slot.end}
        </Text>
      </View>

      <Pressable
        style={[styles.button, alreadyBooked && styles.disabled]}
        disabled={alreadyBooked}
        onPress={handleConfirm}
      >
        <Text style={styles.buttonText}>
          {alreadyBooked ? "Unavailable" : "Confirm Booking"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  label: {
    marginTop: 12,
    color: "#6b7280",
    fontSize: 14,
  },
  value: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  button: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#2563eb",
    borderRadius: 12,
    alignItems: "center",
  },
  disabled: {
    backgroundColor: "#9ca3af",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
