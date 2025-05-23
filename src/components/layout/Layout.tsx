
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Offa Railway Station. All rights reserved.</p>
          <a href="https://x.com/seguncaleb8" className="text-purple-500">HarmlessDecision</a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
