
import React from "react";
import { Booking } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  // Format the booking date
  const formattedDate = new Date(booking.bookingDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  // Define badge color based on status
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-gray-500">Booking ID</p>
            <p className="font-medium">{booking.id.substring(0, 8)}</p>
          </div>
          <Badge className={`${getBadgeVariant(booking.status)} capitalize`}>
            {booking.status}
          </Badge>
        </div>

        {booking.route && (
          <div className="flex justify-between items-center mb-4 mt-4 border-t border-b py-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">From</p>
              <p className="font-medium">{booking.route.from}</p>
              <p className="text-sm text-gray-600">{booking.route.departureTime}</p>
            </div>
            <ArrowRight className="text-gray-400" />
            <div className="space-y-1 text-right">
              <p className="text-sm text-gray-500">To</p>
              <p className="font-medium">{booking.route.to}</p>
              <p className="text-sm text-gray-600">{booking.route.arrivalTime}</p>
            </div>
          </div>
        )}

        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Passengers</p>
          <div className="space-y-2">
            {booking.passengers.map((passenger, index) => (
              <div key={index} className="bg-gray-50 p-2 rounded-md">
                <p className="font-medium">{passenger.name}</p>
                <p className="text-sm text-gray-600">Age: {passenger.age}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4 text-sm text-gray-600">
        Booked on {formattedDate}
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
