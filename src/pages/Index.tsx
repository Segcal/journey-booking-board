
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initializeStorage } from "@/services/localStorageService";
import HomePage from "./HomePage";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Initialize local storage with sample data
    initializeStorage();
  }, []);
  
  return <HomePage />;
};

export default Index;
