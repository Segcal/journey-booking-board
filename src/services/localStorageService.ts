
import { User, Route, Booking } from "@/types";

// Initial data
const initialRoutes: Route[] = [
  {
    id: "route1",
    from: "New York",
    to: "Washington DC",
    departureTime: "08:00 AM",
    arrivalTime: "11:30 AM",
    price: 89.99
  },
  {
    id: "route2",
    from: "Boston",
    to: "New York",
    departureTime: "09:15 AM",
    arrivalTime: "11:45 AM",
    price: 64.99
  },
  {
    id: "route3",
    from: "Philadelphia",
    to: "Boston",
    departureTime: "10:30 AM",
    arrivalTime: "03:15 PM",
    price: 95.99
  },
  {
    id: "route4",
    from: "Washington DC",
    to: "Philadelphia",
    departureTime: "12:00 PM",
    arrivalTime: "01:45 PM",
    price: 59.99
  }
];

const initialUsers: User[] = [
  {
    id: "admin1",
    username: "admin",
    password: "admin123",
    isAdmin: true
  }
];

// Initialize local storage with data
export const initializeStorage = (): void => {
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

// User related methods
export const getUsers = (): User[] => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: User | null): void => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const authenticateUser = (username: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  return user || null;
};

// Route related methods
export const getRoutes = (): Route[] => {
  const routes = localStorage.getItem("routes");
  return routes ? JSON.parse(routes) : [];
};

export const getRoute = (id: string): Route | undefined => {
  const routes = getRoutes();
  return routes.find(route => route.id === id);
};

// Booking related methods
export const getBookings = (): Booking[] => {
  const bookings = localStorage.getItem("bookings");
  return bookings ? JSON.parse(bookings) : [];
};

export const saveBooking = (booking: Booking): void => {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));
};

export const getUserBookings = (userId: string): Booking[] => {
  const bookings = getBookings();
  return bookings.filter(booking => booking.userId === userId);
};

export const updateBookingStatus = (bookingId: string, status: 'approved' | 'rejected'): void => {
  const bookings = getBookings();
  const updatedBookings = bookings.map(booking => 
    booking.id === bookingId ? { ...booking, status } : booking
  );
  localStorage.setItem("bookings", JSON.stringify(updatedBookings));
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
