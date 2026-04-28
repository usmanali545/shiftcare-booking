// src/types/index.ts

export type Doctor = {
  id: string;
  name: string;
  active?: boolean;
  schedules?: ScheduleWindow[];
};

export type ScheduleWindow = {
  day: string;
  start: string;
  end: string;
};

export type AppointmentSlot = {
  doctorId: string;
  doctorName: string;
  day: string;
  start: string;
  end: string;
};

export type Booking = AppointmentSlot & {
  id: string;
  createdAt: string;
};
