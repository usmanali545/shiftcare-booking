import { AppointmentSlot, Doctor, ScheduleWindow, Booking } from "../types";

function timeToMinutes(time: string): number {
  const cleaned = time.trim().toUpperCase();
  const match = cleaned.match(/^(\d{1,2}):(\d{2})(AM|PM)$/);

  if (!match) {
    return NaN;
  }

  let hour = Number(match[1]);
  const minute = Number(match[2]);
  const period = match[3];

  if (period === "PM" && hour !== 12) {
    hour += 12;
  }

  if (period === "AM" && hour === 12) {
    hour = 0;
  }

  return hour * 60 + minute;
}

function minutesToTime(minutes: number): string {
  const hour24 = Math.floor(minutes / 60);
  const minute = minutes % 60;

  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

  return `${hour12}:${String(minute).padStart(2, "0")}${period}`;
}

export function generateSlotsForWindow(
  doctor: Doctor,
  window: ScheduleWindow,
): AppointmentSlot[] {
  const slots: AppointmentSlot[] = [];

  const start = timeToMinutes(window.start);
  const end = timeToMinutes(window.end);

  for (let current = start; current + 30 <= end; current += 30) {
    slots.push({
      doctorId: doctor.id,
      doctorName: doctor.name,
      day: window.day,
      start: minutesToTime(current),
      end: minutesToTime(current + 30),
    });
  }

  return slots;
}

export function generateDoctorSlots(doctor: Doctor): AppointmentSlot[] {
  return (
    doctor.schedules?.flatMap((window) =>
      generateSlotsForWindow(doctor, window),
    ) ?? []
  );
}

export function isSlotBooked(
  slot: AppointmentSlot,
  bookings: Booking[],
): boolean {
  return bookings.some(
    (booking) =>
      booking.doctorId === slot.doctorId &&
      booking.day === slot.day &&
      booking.start === slot.start,
  );
}
