import { User, Route, Booking } from "@/types";

const isBrowser = typeof window !== "undefined";

// Initial data
const initialRoutes: Route[] = [
  {
    id: "route1",
    from: "Offa",
    to: "Lagos",
    departureTime: "08:00 AM",
    arrivalTime: "11:30 AM",
    price: 14000
  },
  {
    id: "route2",
    from: "Offa",
    to: "Ilorin",
    departureTime: "09:15 AM",
    arrivalTime: "11:45 AM",
    price: 6000
  },
  {
    id: "route3",
    from: "Offa",
    to: "Ibadan",
    departureTime: "10:30 AM",
    arrivalTime: "03:15 PM",
    price: 12000
  },
  {
    id: "route4",
    from: "Offa",
    to: "Abuja",
    departureTime: "12:00 PM",
    arrivalTime: "01:45 PM",
    price: 20000
  },
  {
    id: "route5",
    from: "Offa",
    to: "Kaduna",
    departureTime: "12:00 PM",
    arrivalTime: "01:45 PM",
    price: 25000
  },
  {
    id: "route6",
    from: "Offa",
    to: "Kano",
    departureTime: "12:00 PM",
    arrivalTime: "01:45 PM",
    price: 25000
  },
  {
    id: "route7",
    from: "Offa",
    to: "Warri",
    departureTime: "12:00 PM",
    arrivalTime: "01:45 PM",
    price: 30000
  },
];

const initialUsers: User[] = [
  {
    id: "admin1",
    username: "admin",
    password: "admin123",
    isAdmin: true
  }
];

// Initialize local storage with default data
export const initializeStorage = (): void => {
  if (!isBrowser) return;

  if (!localStorage.getItem("routes")) {
    localStorage.setItem("routes", JSON.stringify(initialRoutes));
  }
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(initialUsers));
  }
  if (!localStorage.getItem("bookings")) {
    localStorage.setItem("bookings", JSON.stringify([]));
  }
  if (!localStorage.getItem("currentUser")) {
    localStorage.setItem("currentUser", JSON.stringify(null));
  }
};

// User methods
export const getUsers = (): User[] => {
  if (!isBrowser) return [];
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: User): void => {
  if (!isBrowser) return;
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

export const getCurrentUser = (): User | null => {
  if (!isBrowser) return null;
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: User | null): void => {
  if (!isBrowser) return;
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const authenticateUser = (username: string, password: string): User | null => {
  const users = getUsers();
  return users.find(u => u.username === username && u.password === password) || null;
};

// Route methods
export const getRoutes = (): Route[] => {
  if (!isBrowser) return [];
  const routes = localStorage.getItem("routes");
  return routes ? JSON.parse(routes) : [];
};

export const getRoute = (id: string): Route | undefined => {
  const routes = getRoutes();
  return routes.find(route => route.id === id);
};

// Booking methods
export const getBookings = (): Booking[] => {
  if (!isBrowser) return [];
  const bookings = localStorage.getItem("bookings");
  return bookings ? JSON.parse(bookings) : [];
};

export const saveBooking = (booking: Booking): void => {
  if (!isBrowser) return;
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));
};

export const getUserBookings = (userId: string): Booking[] => {
  const bookings = getBookings();
  return bookings.filter(booking => booking.userId === userId);
};

export const updateBookingStatus = (bookingId: string, status: 'approved' | 'rejected'): void => {
  if (!isBrowser) return;
  const bookings = getBookings();
  const updated = bookings.map(booking =>
    booking.id === bookingId ? { ...booking, status } : booking
  );
  localStorage.setItem("bookings", JSON.stringify(updated));
};

export const getAllBookingsWithRouteDetails = (): Booking[] => {
  const bookings = getBookings();
  const routes = getRoutes();
  return bookings.map(booking => ({
    ...booking,
    route: routes.find(route => route.id === booking.routeId)
  }));
};

export const getUserBookingsWithRouteDetails = (userId: string): Booking[] => {
  const bookings = getUserBookings(userId);
  const routes = getRoutes();
  return bookings.map(booking => ({
    ...booking,
    route: routes.find(route => route.id === booking.routeId)
  }));
};
