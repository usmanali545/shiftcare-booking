import {
  generateSlotsForWindow,
  generateDoctorSlots,
  isSlotBooked,
} from "../src/utils/slots";

const doctor = {
  id: "dr-smith",
  name: "Dr Smith",
  schedules: [],
};

describe("slot generation", () => {
  test("creates 30-minute slots from a valid schedule window", () => {
    const slots = generateSlotsForWindow(doctor, {
      day: "Monday",
      start: "9:00AM",
      end: "10:00AM",
    });

    expect(slots).toHaveLength(2);
    expect(slots[0]).toMatchObject({
      doctorId: "dr-smith",
      doctorName: "Dr Smith",
      day: "Monday",
      start: "9:00AM",
      end: "9:30AM",
    });
    expect(slots[1].start).toBe("9:30AM");
    expect(slots[1].end).toBe("10:00AM");
  });

  test("handles whitespace from API time values", () => {
    const slots = generateSlotsForWindow(doctor, {
      day: "Tuesday",
      start: " 9:00AM",
      end: " 10:00AM",
    });

    expect(slots).toHaveLength(2);
  });

  test("handles lowercase am/pm values", () => {
    const slots = generateSlotsForWindow(doctor, {
      day: "Tuesday",
      start: "9:00am",
      end: "10:00am",
    });

    expect(slots).toHaveLength(2);
  });

  test("creates one slot for exact 30-minute window", () => {
    const slots = generateSlotsForWindow(doctor, {
      day: "Wednesday",
      start: "9:00AM",
      end: "9:30AM",
    });

    expect(slots).toHaveLength(1);
  });

  test("does not create partial slot shorter than 30 minutes", () => {
    const slots = generateSlotsForWindow(doctor, {
      day: "Thursday",
      start: "9:00AM",
      end: "9:20AM",
    });

    expect(slots).toHaveLength(0);
  });

  test("returns empty array when end time is before start time", () => {
    const slots = generateSlotsForWindow(doctor, {
      day: "Friday",
      start: "10:00AM",
      end: "9:00AM",
    });

    expect(slots).toHaveLength(0);
  });

  test("returns empty array for invalid start time", () => {
    const slots = generateSlotsForWindow(doctor, {
      day: "Saturday",
      start: "invalid-time",
      end: "10:00AM",
    });

    expect(slots).toHaveLength(0);
  });

  test("returns empty array for invalid end time", () => {
    const slots = generateSlotsForWindow(doctor, {
      day: "Saturday",
      start: "9:00AM",
      end: "invalid-time",
    });

    expect(slots).toHaveLength(0);
  });

  test("generates slots from multiple schedule windows", () => {
    const doctorWithSchedules = {
      id: "dr-smith",
      name: "Dr Smith",
      schedules: [
        {
          day: "Monday",
          start: "9:00AM",
          end: "10:00AM",
        },
        {
          day: "Tuesday",
          start: "1:00PM",
          end: "2:00PM",
        },
      ],
    };

    const slots = generateDoctorSlots(doctorWithSchedules);

    expect(slots).toHaveLength(4);
    expect(slots[0].day).toBe("Monday");
    expect(slots[2].day).toBe("Tuesday");
  });

  test("returns empty array when doctor has no schedules", () => {
    const slots = generateDoctorSlots({
      id: "dr-empty",
      name: "Dr Empty",
      schedules: [],
    });

    expect(slots).toEqual([]);
  });
});

describe("booking availability", () => {
  test("detects already booked slot", () => {
    const slot = {
      doctorId: "dr-smith",
      doctorName: "Dr Smith",
      day: "Monday",
      start: "9:00AM",
      end: "9:30AM",
    };

    const bookings = [
      {
        ...slot,
        id: "booking-1",
        createdAt: "2026-04-27T00:00:00.000Z",
      },
    ];

    expect(isSlotBooked(slot, bookings)).toBe(true);
  });

  test("does not mark different doctor at same time as booked", () => {
    const slot = {
      doctorId: "dr-smith",
      doctorName: "Dr Smith",
      day: "Monday",
      start: "9:00AM",
      end: "9:30AM",
    };

    const bookings = [
      {
        doctorId: "dr-jones",
        doctorName: "Dr Jones",
        day: "Monday",
        start: "9:00AM",
        end: "9:30AM",
        id: "booking-2",
        createdAt: "2026-04-27T00:00:00.000Z",
      },
    ];

    expect(isSlotBooked(slot, bookings)).toBe(false);
  });

  test("does not mark same doctor on different day as booked", () => {
    const slot = {
      doctorId: "dr-smith",
      doctorName: "Dr Smith",
      day: "Monday",
      start: "9:00AM",
      end: "9:30AM",
    };

    const bookings = [
      {
        doctorId: "dr-smith",
        doctorName: "Dr Smith",
        day: "Tuesday",
        start: "9:00AM",
        end: "9:30AM",
        id: "booking-3",
        createdAt: "2026-04-27T00:00:00.000Z",
      },
    ];

    expect(isSlotBooked(slot, bookings)).toBe(false);
  });
});
