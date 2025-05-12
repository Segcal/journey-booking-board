
export interface User {
  id: string;
  username: string;
  password: string;
  isAdmin: boolean;
}

export interface Route {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
}

export interface Booking {
  id: string;
  userId: string;
  routeId: string;
  passengers: Passenger[];
  status: 'pending' | 'approved' | 'rejected';
  bookingDate: string;
  route?: Route;
}

export interface Passenger {
  name: string;
  age: number;
  seatNumber?: string;
}
