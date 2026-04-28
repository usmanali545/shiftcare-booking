import bookingsReducer, {
  addBooking,
  cancelBooking,
  setBookings,
} from "../src/store/bookingsSlice";

describe("bookings reducer", () => {
  const slot = {
    doctorId: "dr-smith",
    doctorName: "Dr Smith",
    day: "Monday",
    start: "9:00AM",
    end: "9:30AM",
  };

  test("returns initial state", () => {
    const state = bookingsReducer(undefined, { type: "unknown" });

    expect(state.items).toEqual([]);
  });

  test("adds a booking", () => {
    const state = bookingsReducer(undefined, addBooking(slot));

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toMatchObject(slot);
    expect(state.items[0].id).toBe("dr-smith-Monday-9:00AM");
    expect(state.items[0].createdAt).toBeDefined();
  });

  test("prevents double booking for same doctor, day, and time", () => {
    let state = bookingsReducer(undefined, addBooking(slot));
    state = bookingsReducer(state, addBooking(slot));

    expect(state.items).toHaveLength(1);
  });

  test("allows same time for different doctors", () => {
    const secondSlot = {
      doctorId: "dr-jones",
      doctorName: "Dr Jones",
      day: "Monday",
      start: "9:00AM",
      end: "9:30AM",
    };

    let state = bookingsReducer(undefined, addBooking(slot));
    state = bookingsReducer(state, addBooking(secondSlot));

    expect(state.items).toHaveLength(2);
  });

  test("allows same doctor and time on different day", () => {
    const secondSlot = {
      doctorId: "dr-smith",
      doctorName: "Dr Smith",
      day: "Tuesday",
      start: "9:00AM",
      end: "9:30AM",
    };

    let state = bookingsReducer(undefined, addBooking(slot));
    state = bookingsReducer(state, addBooking(secondSlot));

    expect(state.items).toHaveLength(2);
  });

  test("cancels a booking by id", () => {
    let state = bookingsReducer(undefined, addBooking(slot));
    const bookingId = state.items[0].id;

    state = bookingsReducer(state, cancelBooking(bookingId));

    expect(state.items).toHaveLength(0);
  });

  test("does nothing when cancelling unknown booking id", () => {
    let state = bookingsReducer(undefined, addBooking(slot));

    state = bookingsReducer(state, cancelBooking("unknown-id"));

    expect(state.items).toHaveLength(1);
  });

  test("sets bookings from persisted storage", () => {
    const persistedBookings = [
      {
        id: "booking-1",
        doctorId: "dr-smith",
        doctorName: "Dr Smith",
        day: "Monday",
        start: "9:00AM",
        end: "9:30AM",
        createdAt: "2026-04-27T00:00:00.000Z",
      },
    ];

    const state = bookingsReducer(undefined, setBookings(persistedBookings));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe("booking-1");
  });
});
