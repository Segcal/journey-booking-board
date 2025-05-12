
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getUserBookingsWithRouteDetails } from "@/services/localStorageService";
import { Booking } from "@/types";
import BookingCard from "@/components/booking/BookingCard";
import { Button } from "@/components/ui/button";

const MyBookingsPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const userBookings = getUserBookingsWithRouteDetails(user.id);
      setBookings(userBookings);
    }
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-md">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-bold mb-4">Login Required</h2>
          <p className="mb-6 text-gray-600">
            You need to login to view your bookings. Please login to continue.
          </p>
          <div className="space-x-4">
            <Button onClick={() => navigate("/login")} className="bg-purple-600 hover:bg-purple-700">
              Login
            </Button>
            <Button variant="outline" onClick={() => navigate("/")} className="border-gray-300">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <Button onClick={() => navigate("/")} className="bg-purple-600 hover:bg-purple-700">
          Book New Ticket
        </Button>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">No Bookings Found</h2>
          <p className="text-gray-600 mb-6">
            You don't have any bookings yet. Start by booking a train ticket.
          </p>
          <Button onClick={() => navigate("/")} className="bg-purple-600 hover:bg-purple-700">
            Book Now
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
