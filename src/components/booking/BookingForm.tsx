
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Route, Passenger, Booking } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { saveBooking } from "@/services/localStorageService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

interface BookingFormProps {
  route: Route;
}

const BookingForm: React.FC<BookingFormProps> = ({ route }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [passengerName, setPassengerName] = useState("");
  const [passengerAge, setPassengerAge] = useState("");
  const [passengers, setPassengers] = useState<Passenger[]>([]);

  const handleAddPassenger = () => {
    if (!passengerName || !passengerAge) {
      toast({
        title: "Error",
        description: "Please enter both name and age for the passenger",
        variant: "destructive"
      });
      return;
    }

    const newPassenger: Passenger = {
      name: passengerName,
      age: parseInt(passengerAge)
    };

    setPassengers([...passengers, newPassenger]);
    setPassengerName("");
    setPassengerAge("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to book a ticket",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }

    if (passengers.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one passenger",
        variant: "destructive"
      });
      return;
    }

    const newBooking: Booking = {
      id: Date.now().toString(),
      userId: user.id,
      routeId: route.id,
      passengers,
      status: "pending",
      bookingDate: new Date().toISOString(),
    };

    saveBooking(newBooking);
    
    toast({
      title: "Booking Successful",
      description: "Your booking has been submitted and is pending approval",
    });
    
    navigate("/my-bookings");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Complete Your Booking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Route Details</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">From</p>
              <p className="font-medium">{route.from}</p>
              <p className="text-sm text-gray-600">{route.departureTime}</p>
            </div>
            <ArrowRight className="text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">To</p>
              <p className="font-medium">{route.to}</p>
              <p className="text-sm text-gray-600">{route.arrivalTime}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-bold text-purple-600">${route.price.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-semibold mb-4">Passenger Information</h3>
          
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="passengerName">Passenger Name</Label>
                <Input
                  id="passengerName"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  placeholder="Enter passenger name"
                />
              </div>
              <div>
                <Label htmlFor="passengerAge">Age</Label>
                <Input
                  id="passengerAge"
                  type="number"
                  value={passengerAge}
                  onChange={(e) => setPassengerAge(e.target.value)}
                  placeholder="Enter passenger age"
                  min="0"
                />
              </div>
            </div>
            <Button 
              type="button" 
              onClick={handleAddPassenger}
              variant="outline" 
              className="w-full md:w-auto"
            >
              Add Passenger
            </Button>
          </div>

          {passengers.length > 0 && (
            <div className="mb-6">
              <h4 className="text-md font-medium mb-2">Added Passengers:</h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                {passengers.map((passenger, index) => (
                  <div key={index} className="flex justify-between items-center p-2 border-b last:border-b-0">
                    <div>
                      <p className="font-medium">{passenger.name}</p>
                      <p className="text-sm text-gray-600">Age: {passenger.age}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const updatedPassengers = [...passengers];
                        updatedPassengers.splice(index, 1);
                        setPassengers(updatedPassengers);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t pt-4 mt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium">Total Amount:</span>
              <span className="text-xl font-bold text-purple-600">
                ${(route.price * Math.max(1, passengers.length)).toFixed(2)}
              </span>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4 bg-gray-50">
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Confirm Booking
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingForm;
