import React from "react";
import { Booking } from "@/types";
import { updateBookingStatus } from "@/services/localStorageService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Check, X, ArrowRight } from "lucide-react";

interface BookingManagementProps {
  bookings: Booking[];
  onBookingUpdated: () => void;
}

const BookingManagement: React.FC<BookingManagementProps> = ({ bookings, onBookingUpdated }) => {
  const { toast } = useToast();

  const handleUpdateStatus = async (bookingId: string, status: "approved" | "rejected") => {
    try {
      await updateBookingStatus(bookingId, status);

      toast({
        title: `Booking ${status}`,
        description: `The booking has been ${status} successfully.`,
      });

      onBookingUpdated(); 
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking status.",
        variant: "destructive",
      });
    }
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border border-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 border border-red-300";
      default:
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
    }
  };

  const pendingBookings = bookings.filter((booking) => booking.status === "pending");
  const processedBookings = bookings.filter((booking) => booking.status !== "pending");

  return (
    <div className="space-y-6">
      {/* Pending Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingBookings.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No pending bookings to approve</p>
          ) : (
            <div className="space-y-4">
              {pendingBookings.map((booking) => (
                <div key={booking.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Booking ID</p>
                      <p className="font-medium">{booking.id.substring(0, 8)}</p>
                      <p className="text-sm text-gray-600">
                        Booked on {new Date(booking.bookingDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={`${getBadgeVariant(booking.status)} capitalize`}>
                      {booking.status}
                    </Badge>
                  </div>

                  {booking.route && (
                    <div className="flex justify-between items-center mb-4 py-2 border-t border-b">
                      <div>
                        <p className="text-sm text-gray-500">From</p>
                        <p className="font-medium">{booking.route.from}</p>
                      </div>
                      <ArrowRight className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">To</p>
                        <p className="font-medium">{booking.route.to}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="font-medium">${booking.route.price.toFixed(2)}</p>
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Passengers</p>
                    <div className="space-y-1">
                      {booking.passengers.map((passenger, index) => (
                        <div key={index} className="text-sm">
                          {passenger.name} (Age: {passenger.age})
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button
                      onClick={() => handleUpdateStatus(booking.id, "rejected")}
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <X className="mr-1 h-4 w-4" />
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleUpdateStatus(booking.id, "approved")}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check className="mr-1 h-4 w-4" />
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Processed Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Processed Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {processedBookings.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No processed bookings yet</p>
          ) : (
            <div className="space-y-4">
              {processedBookings.map((booking) => (
                <div key={booking.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Booking ID</p>
                      <p className="font-medium">{booking.id.substring(0, 8)}</p>
                      <p className="text-sm text-gray-600">
                        Booked on {new Date(booking.bookingDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={`${getBadgeVariant(booking.status)} capitalize`}>
                      {booking.status}
                    </Badge>
                  </div>

                  {booking.route && (
                    <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                      <span>{booking.route.from}</span>
                      <ArrowRight className="h-3 w-3" />
                      <span>{booking.route.to}</span>
                      <span>{booking.passengers.length} passenger(s)</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingManagement;
