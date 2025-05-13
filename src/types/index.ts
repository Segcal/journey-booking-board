
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
  classType: string;
  bookingDate: string;
  date: string;
  route?: Route;
}

export interface Passenger {
  name: string;
  age: number;
  seatNumber?: string;
}

export interface BookingFormProps {
  route: Route;
  user: User | null;
  onSubmit: (booking: Booking) => void;
}


