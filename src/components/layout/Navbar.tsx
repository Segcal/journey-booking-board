
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";

const Navbar: React.FC = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-purple-600">R | B | K</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/" className="text-gray-700 hover:text-purple-600">
                Home
              </Link>
              <Link to="/my-bookings" className="text-gray-700 hover:text-purple-600">
                My Bookings
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-gray-700 hover:text-purple-600">
                  Admin Dashboard
                </Link>
              )}
              <div className="flex items-center ml-4">
                <User size={18} className="mr-1 text-gray-600" />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => logout()} 
                  className="flex items-center text-gray-700 hover:text-purple-600"
                >
                  <span className="mr-1">Logout</span>
                  <LogOut size={16} />
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                onClick={() => navigate("/login")}
                className="text-gray-700 hover:text-purple-600"
              >
                Login
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate("/scheduledetail")}
                className="border-gray-300 text-gray-700 hover:text-purple-600">  
                ScheduleDetails
                </Button>
              <Button 
                onClick={() => navigate("/signup")}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
