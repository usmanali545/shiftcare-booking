import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import SlotButton from "../components/SlotButton";
import { generateDoctorSlots, isSlotBooked } from "../utils/slots";
import { RootState } from "../store/store";

export default function DoctorDetailScreen({ route, navigation }: any) {
  const { doctor } = route.params;
  const bookings = useSelector((state: RootState) => state.bookings.items);

  const slots = generateDoctorSlots(doctor);

  const groupedSlots = slots.reduce<Record<string, typeof slots>>(
    (acc, slot) => {
      if (!acc[slot.day]) acc[slot.day] = [];
      acc[slot.day].push(slot);
      return acc;
    },
    {},
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{doctor.name}</Text>
      <Text style={styles.subtitle}>
        {doctor.specialty || "General Practitioner"}
      </Text>

      {Object.keys(groupedSlots).length === 0 && (
        <Text style={styles.helper}>No appointment slots available.</Text>
      )}

      {Object.entries(groupedSlots).map(([day, daySlots], index) => (
        <View key={`${day}-${index}`} style={styles.daySection}>
          <Text style={styles.dayTitle}>{day}</Text>
          <View style={styles.slotWrap}>
            {daySlots.map((slot) => {
              const booked = isSlotBooked(slot, bookings);
              return (
                <SlotButton
                  key={`${slot.doctorId}-${slot.day}-${slot.start}`}
                  slot={slot}
                  disabled={booked}
                  onPress={() =>
                    navigation.navigate("ConfirmBooking", {
                      slot,
                    })
                  }
                />
              );
            })}
          </View>
        </View>
      ))}
    </ScrollView>
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
    color: "#111827",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 16,
    color: "#6b7280",
  },
  daySection: {
    marginTop: 24,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  slotWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  helper: {
    marginTop: 20,
    color: "#6b7280",
  },
});
