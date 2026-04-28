import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";

import DoctorCard from "../components/DoctorCard";
import { fetchDoctors } from "../api/doctorsApi";
import { Doctor } from "../types";

export default function DoctorsListScreen({ navigation }: any) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDoctors() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchDoctors();
        const doctorsMap = new Map();
        data.forEach((item: any) => {
          const id = item.name.toLowerCase().replace(/\s+/g, "");
          if (!doctorsMap.has(id)) {
            doctorsMap.set(id, {
              id,
              name: item.name,
              timezone: item.timezone,
              schedules: [],
            });
          }
          doctorsMap.get(id).schedules.push({
            day: item.day_of_week,
            start: item.available_at.trim(),
            end: item.available_until.trim(),
          });
        });
        const availableDoctors = Array.from(doctorsMap.values()).filter(
          (doctor) => doctor.schedules.length > 0,
        );
        setDoctors(availableDoctors);
      } catch {
        setError("Unable to load doctors. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    loadDoctors();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.helper}>Loading doctors...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Available Doctors</Text>

        <Pressable
          style={styles.myBookingsButton}
          onPress={() => navigation.navigate("MyBookings")}
        >
          <Text style={styles.myBookingsText}>My Bookings</Text>
        </Pressable>
      </View>

      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DoctorCard
            doctor={item}
            onPress={() =>
              navigation.navigate("DoctorDetail", {
                doctor: item,
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.helper}>No active doctors available.</Text>
        }
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 16,
    color: "#111827",
  },
  helper: {
    marginTop: 8,
    color: "#6b7280",
  },
  error: {
    color: "#dc2626",
    fontSize: 16,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  myBookingsButton: {
    backgroundColor: "#10b981",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  myBookingsText: {
    color: "#fff",
    fontWeight: "700",
  },
});
