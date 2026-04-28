import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { AppointmentSlot } from "../types";

type Props = {
  slot: AppointmentSlot;
  disabled?: boolean;
  onPress: () => void;
};

export default function SlotButton({ slot, disabled, onPress }: Props) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, disabled && styles.disabled]}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>
        {slot.start} - {slot.end}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#2563eb",
    marginRight: 8,
    marginBottom: 8,
  },
  disabled: {
    backgroundColor: "#d1d5db",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
  },
  disabledText: {
    color: "#6b7280",
  },
});
