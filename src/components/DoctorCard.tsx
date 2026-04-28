import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Doctor } from "../types";

type Props = {
  doctor: Doctor;
  onPress: () => void;
};

export default function DoctorCard({ doctor, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.specialty}>General Practitioner</Text>
      </View>

      <Text style={styles.arrow}>View</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  specialty: {
    marginTop: 4,
    fontSize: 14,
    color: "#6b7280",
  },
  arrow: {
    fontSize: 14,
    color: "#2563eb",
    fontWeight: "600",
  },
});
