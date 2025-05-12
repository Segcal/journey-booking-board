
import React, { createContext, useState, useEffect, useContext } from "react";
import { User } from "@/types";
import { authenticateUser, getCurrentUser, saveUser, setCurrentUser } from "@/services/localStorageService";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  signup: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  signup: () => false,
  logout: () => {},
  isAuthenticated: false,
  isAdmin: false
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const authenticatedUser = authenticateUser(username, password);
    if (authenticatedUser) {
      setUser(authenticatedUser);
      setCurrentUser(authenticatedUser);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${authenticatedUser.username}!`,
      });
      return true;
    }
    toast({
      title: "Login Failed",
      description: "Invalid username or password.",
      variant: "destructive",
    });
    return false;
  };

  const signup = (username: string, password: string): boolean => {
    const newUser: User = {
      id: Date.now().toString(),
      username,
      password,
      isAdmin: false
    };
    saveUser(newUser);
    setUser(newUser);
    setCurrentUser(newUser);
    toast({
      title: "Signup Successful",
      description: `Welcome, ${username}!`,
    });
    return true;
  };

  const logout = (): void => {
    setUser(null);
    setCurrentUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isAdmin: !!user?.isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
