
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRoutes } from "@/services/localStorageService";
import { Route } from "@/types";
import RouteCard from "@/components/booking/RouteCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HomePage = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
  const [fromFilter, setFromFilter] = useState<string>("");
  const [toFilter, setToFilter] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const allRoutes = getRoutes();
    setRoutes(allRoutes);
    setFilteredRoutes(allRoutes);
  }, []);

  useEffect(() => {
    let filtered = routes;
    
    if (fromFilter && fromFilter !== "all-locations") {
      filtered = filtered.filter(route => route.from.toLowerCase().includes(fromFilter.toLowerCase()));
    }
    
    if (toFilter && toFilter !== "all-locations") {
      filtered = filtered.filter(route => route.to.toLowerCase().includes(toFilter.toLowerCase()));
    }
    
    setFilteredRoutes(filtered);
  }, [fromFilter, toFilter, routes]);

  // Get unique destinations for filters
  const fromLocations = [...new Set(routes.map(route => route.from))];
  const toLocations = [...new Set(routes.map(route => route.to))];

  const handleRouteSelect = (route: Route) => {
    navigate(`/booking/${route.id}`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Find Your Train</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Book your train tickets quickly and easily. Search for routes, select your train, and book your journey in minutes.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fromLocation">From</Label>
            <Select onValueChange={setFromFilter} value={fromFilter || "all-locations"}>
              <SelectTrigger id="fromLocation">
                <SelectValue placeholder="Select departure" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-locations">All locations</SelectItem>
                {fromLocations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="toLocation">To</Label>
            <Select onValueChange={setToFilter} value={toFilter || "all-locations"}>
              <SelectTrigger id="toLocation">
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-locations">All locations</SelectItem>
                {toLocations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoutes.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No routes found matching your search.</p>
          </div>
        ) : (
          filteredRoutes.map((route) => (
            <RouteCard key={route.id} route={route} onSelect={handleRouteSelect} />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
