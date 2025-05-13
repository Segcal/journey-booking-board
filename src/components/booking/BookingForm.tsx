import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Route, Passenger, Booking } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { saveBooking } from "@/services/localStorageService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BookingFormProps {
  route: Route;
}

const BookingForm: React.FC<BookingFormProps> = ({ route }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [classType, setClassType] = useState<"first" | "second" | "third">("second");
  const [passengerName, setPassengerName] = useState("");
  const [passengerAge, setPassengerAge] = useState("");
  const [passengers, setPassengers] = useState<Passenger[]>([]);

  const handleAddPassenger = () => {
    if (!passengerName || !passengerAge) {
      toast({
        title: "Error",
        description: "Please enter both name and age for the passenger",
        variant: "destructive",
      });
      return;
    }

    setPassengers([...passengers, { name: passengerName, age: parseInt(passengerAge) }]);
    setPassengerName("");
    setPassengerAge("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to book a ticket",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!date) {
      toast({
        title: "Date is required",
        description: "Please select a travel date",
        variant: "destructive",
      });
      return;
    }

    if (passengers.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one passenger",
        variant: "destructive",
      });
      return;
    }

    if (classType !== "first" && classType !== "second" && classType !== "third") {
      toast({
        title: "Error",
        description: "Please select a valid class type",
        variant: "destructive",
      });
      return;
    }

    const newBooking: Booking = {
      id: Date.now().toString(),
      userId: user.id,
      routeId: route.id,
      passengers,
      classType ,
      date: date.toISOString().split("T")[0],
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
              <p className="font-bold text-purple-600">#{route.price.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Travel Date */}
          <div className="mb-4">
            <Label htmlFor="date">Date of Journey</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(day) => day < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Class Type */}
          <div className="mb-6">
            <Label htmlFor="classType">Class Type</Label>
            <Select value={classType} onValueChange={(value) => setClassType(value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="first">First Class</SelectItem>
                <SelectItem value="second">Second Class</SelectItem>
                <SelectItem value="third">Third Class</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Passenger Details */}
          <h3 className="text-lg font-semibold mb-4">Passenger Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="passengerName">Name</Label>
              <Input
                id="passengerName"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                placeholder="Enter name"
              />
            </div>
            <div>
              <Label htmlFor="passengerAge">Age</Label>
              <Input
                id="passengerAge"
                type="number"
                min={0}
                value={passengerAge}
                onChange={(e) => setPassengerAge(e.target.value)}
                placeholder="Enter age"
              />
            </div>
          </div>
          <Button type="button" onClick={handleAddPassenger} variant="outline" className="mb-6">
            Add Passenger
          </Button>

          {passengers.length > 0 && (
            <div className="mb-6">
              <h4 className="text-md font-medium mb-2">Added Passengers:</h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                {passengers.map((p, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{p.name} (Age: {p.age})</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const updated = [...passengers];
                        updated.splice(index, 1);
                        setPassengers(updated);
                      }}
                      className="text-red-500"
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
              <span className="text-lg font-medium">Total:</span>
              <span className="text-xl font-bold text-purple-600">
                #{(route.price * Math.max(1, passengers.length)).toFixed(2)}
              </span>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-4 bg-gray-50">
        <Button variant="outline" onClick={() => navigate("/")}>Cancel</Button>
        <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700">
          Confirm Booking
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingForm;
