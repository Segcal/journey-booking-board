
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getAllBookingsWithRouteDetails } from "@/services/localStorageService";
import { Booking } from "@/types";
import BookingManagement from "@/components/admin/BookingManagement";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const navigate = useNavigate();

  const fetchBookings = () => {
    const allBookings = getAllBookingsWithRouteDetails();
    setBookings(allBookings);
  };

  useEffect(() => {
    if (isAdmin) {
      fetchBookings();
    }
  }, [isAdmin]);

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-md">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-bold mb-4">Unauthorized Access</h2>
          <p className="mb-6 text-gray-600">
            You need admin privileges to access this page.
          </p>
          <Button onClick={() => navigate("/")} className="bg-purple-600 hover:bg-purple-700">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="text-sm text-gray-600">
          Logged in as: <span className="font-medium">{user?.username}</span> (Admin)
        </div>
      </div>

      <BookingManagement bookings={bookings} onBookingUpdated={fetchBookings} />
    </div>
  );
};

export default AdminDashboard;
