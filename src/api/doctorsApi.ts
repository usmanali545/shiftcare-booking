// src/api/doctorsApi.ts

import { Doctor } from "../types";

const API_URL =
  "https://raw.githubusercontent.com/suyogshiftcare/jsontest/main/available.json";

export async function fetchDoctors(): Promise<Doctor[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load doctors");
  }

  const data = await response.json();

  return Array.isArray(data) ? data : (data.doctors ?? []);
}
