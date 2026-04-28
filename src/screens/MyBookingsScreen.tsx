import React from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { cancelBooking } from "../store/bookingsSlice";
import { RootState } from "../store/store";

export default function MyBookingsScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const bookings = useSelector((state: RootState) => state.bookings.items);

  function handleCancel(id: string) {
    Alert.alert(
      "Cancel booking",
      "Are you sure you want to cancel this appointment?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, cancel",
          style: "destructive",
          onPress: () => {
            dispatch(cancelBooking(id));

            // TODO: persist updated bookings to AsyncStorage.
          },
        },
      ],
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>

        <Pressable
          style={styles.availableButton}
          onPress={() => navigation.navigate("Doctors")}
        >
          <Text style={styles.availableText}>Available Doctors</Text>
        </Pressable>
      </View>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.helper}>You have no booked appointments.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.doctor}>{item.doctorName}</Text>
            <Text style={styles.detail}>{item.day}</Text>
            <Text style={styles.detail}>
              {item.start} - {item.end}
            </Text>

            <Pressable
              style={styles.cancelButton}
              onPress={() => handleCancel(item.id)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        )}
      />
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
    marginBottom: 16,
  },
  helper: {
    color: "#6b7280",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 12,
  },
  doctor: {
    fontSize: 18,
    fontWeight: "700",
  },
  detail: {
    marginTop: 4,
    color: "#4b5563",
  },
  cancelButton: {
    marginTop: 14,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dc2626",
    alignItems: "center",
  },
  cancelText: {
    color: "#dc2626",
    fontWeight: "700",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  availableButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  availableText: {
    color: "#fff",
    fontWeight: "700",
  },
});
