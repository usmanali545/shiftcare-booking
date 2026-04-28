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

const doctor = {
  id: "1",
  name: "Dr Smith",
  schedules: [],
};

export default function DoctorsListScreen({ navigation }: any) {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Doctors</Text>
      <DoctorCard doctor={doctor} onPress={() => {}}></DoctorCard>
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
