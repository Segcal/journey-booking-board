
import React from "react";
import { Route } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface RouteCardProps {
  route: Route;
  onSelect: (route: Route) => void;
}

const RouteCard: React.FC<RouteCardProps> = ({ route, onSelect }) => {
  return (
    <Card className="w-full transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">From</p>
            <p className="text-lg font-semibold">{route.from}</p>
            <p className="text-sm text-gray-600">{route.departureTime}</p>
          </div>
          <ArrowRight className="mx-4 text-gray-400" />
          <div className="space-y-1 text-right">
            <p className="text-sm text-gray-500">To</p>
            <p className="text-lg font-semibold">{route.to}</p>
            <p className="text-sm text-gray-600">{route.arrivalTime}</p>
          </div>
        </div>
        <div className="flex justify-between items-center border-t pt-4">
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="text-xl font-bold text-purple-600">${route.price.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4">
        <Button 
          onClick={() => onSelect(route)} 
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          Select This Route
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RouteCard;
