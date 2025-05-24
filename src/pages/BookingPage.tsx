
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRoute } from "@/services/localStorageService";
import { Route } from "@/types";
import BookingForm from "@/components/booking/BookingForm";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const BookingPage = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const [route, setRoute] = useState<Route | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (routeId) {
      const selectedRoute = getRoute(routeId);
      if (selectedRoute) {
        setRoute(selectedRoute);
      } else {
        navigate("/");
      }
    }
  }, [routeId, navigate]);

  if (!route) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p>Loading route information...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-md">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-bold mb-4">Login Required</h2>
          <p className="mb-6 text-gray-600">
            You need to login to book a ticket. Please login to continue.
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
      <h1 className="text-2xl font-bold mb-6 text-center">Complete Your Booking</h1>
      <BookingForm route={route} />
      {/* <div className="absolute top-20 left-8 rotate-12 transition-all ease-in duration-150  hover:rotate-0  pointer-events-none">
        <img src="https://res.cloudinary.com/dtrqikle5/image/upload/v1747188510/9035678_pculck.jpg" className="w-96 bg-gray-100 p-4 rounded-lg"  alt="" />
      </div> */}
    </div>
  );
};

export default BookingPage;
