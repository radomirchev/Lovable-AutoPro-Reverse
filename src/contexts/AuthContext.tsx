import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
export interface User {
  id: string;
  name: string;
  email: string;
}
export interface SavedConfiguration {
  id: string;
  date: string;
  model: string;
  trim: string;
  powertrain: string;
  exterior: string;
  accessories: string[];
  totalPrice: number;
}
export interface SavedFilter {
  id: string;
  name: string;
  filters: Record<string, any>;
  createdAt: string;
}
export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'processing' | 'delivered';
  type: 'new' | 'used';
  vehicle: string;
  price: number;
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  savedConfigurations: SavedConfiguration[];
  addConfiguration: (config: Omit<SavedConfiguration, 'id' | 'date'>) => void;
  deleteConfiguration: (id: string) => void;
  savedFilters: SavedFilter[];
  addFilter: (filter: Omit<SavedFilter, 'id' | 'createdAt'>) => void;
  deleteFilter: (id: string) => void;
  orders: Order[];
  exportUserData: () => void;
  deleteAccount: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
// Mock data for demonstration
const mockUser: User = {
  id: 'user-001',
  name: 'Max Mustermann',
  email: 'max@example.com',
};
const mockConfigurations: SavedConfiguration[] = [
  {
    id: 'config-001',
    date: '2024-01-15',
    model: 'APEX SUV',
    trim: 'Luxury',
    powertrain: 'Hybrid',
    exterior: 'Racing Red',
    accessories: ['Tow Bar Package', 'Winter Package'],
    totalPrice: 78990,
  },
];
const mockOrders: Order[] = [
  {
    id: 'order-001',
    date: '2024-01-10',
    status: 'processing',
    type: 'new',
    vehicle: 'APEX SUV - Luxury Hybrid',
    price: 78990,
  },
];
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [savedConfigurations, setSavedConfigurations] = useState<SavedConfiguration[]>([]);
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('autopro_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setSavedConfigurations(JSON.parse(localStorage.getItem('autopro_configs') || '[]'));
      setSavedFilters(JSON.parse(localStorage.getItem('autopro_filters') || '[]'));
      setOrders(JSON.parse(localStorage.getItem('autopro_orders') || '[]'));
    }
  }, []);
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (email && password) {
      const loggedInUser = { ...mockUser, email };
      setUser(loggedInUser);
      setSavedConfigurations(mockConfigurations);
      setOrders(mockOrders);
      localStorage.setItem('autopro_user', JSON.stringify(loggedInUser));
      localStorage.setItem('autopro_configs', JSON.stringify(mockConfigurations));
      localStorage.setItem('autopro_orders', JSON.stringify(mockOrders));
      return true;
    }
    return false;
  };
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (name && email && password) {
      const newUser = { id: `user-${Date.now()}`, name, email };
      setUser(newUser);
      localStorage.setItem('autopro_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };
  const logout = () => {
    setUser(null);
    setSavedConfigurations([]);
    setSavedFilters([]);
    setOrders([]);
    localStorage.removeItem('autopro_user');
    localStorage.removeItem('autopro_configs');
    localStorage.removeItem('autopro_filters');
    localStorage.removeItem('autopro_orders');
  };
  const addConfiguration = (config: Omit<SavedConfiguration, 'id' | 'date'>) => {
    const newConfig: SavedConfiguration = {
      ...config,
      id: `config-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    const updated = [...savedConfigurations, newConfig];
    setSavedConfigurations(updated);
    localStorage.setItem('autopro_configs', JSON.stringify(updated));
  };
  const deleteConfiguration = (id: string) => {
    const updated = savedConfigurations.filter(c => c.id !== id);
    setSavedConfigurations(updated);
    localStorage.setItem('autopro_configs', JSON.stringify(updated));
  };
  const addFilter = (filter: Omit<SavedFilter, 'id' | 'createdAt'>) => {
    const newFilter: SavedFilter = {
      ...filter,
      id: `filter-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [...savedFilters, newFilter];
    setSavedFilters(updated);
    localStorage.setItem('autopro_filters', JSON.stringify(updated));
  };
  const deleteFilter = (id: string) => {
    const updated = savedFilters.filter(f => f.id !== id);
    setSavedFilters(updated);
    localStorage.setItem('autopro_filters', JSON.stringify(updated));
  };
  const exportUserData = () => {
    const data = {
      user,
      configurations: savedConfigurations,
      filters: savedFilters,
      orders,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `autopro-data-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const deleteAccount = () => {
    logout();
    // In real implementation, this would call an API endpoint
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        savedConfigurations,
        addConfiguration,
        deleteConfiguration,
        savedFilters,
        addFilter,
        deleteFilter,
        orders,
        exportUserData,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}