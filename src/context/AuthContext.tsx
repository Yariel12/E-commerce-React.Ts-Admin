import { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (data: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("authUser");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (data: User) => {
    setUser(data);
    localStorage.setItem("authUser", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
