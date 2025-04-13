
import { User } from './types';

// Mock user data for demo purposes
const MOCK_USERS: Record<string, User & { password: string }> = {
  'user1': {
    id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=5E35B1&color=fff'
  }
};

// Mock storage key
const AUTH_STORAGE_KEY = 'copilot_auth';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Initial auth state
export const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

// Check if user is already logged in from local storage
export const initializeAuth = (): Promise<AuthState> => {
  return new Promise((resolve) => {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth) as AuthState;
        resolve(parsedAuth);
      } catch (e) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        resolve(initialAuthState);
      }
    } else {
      resolve(initialAuthState);
    }
  });
};

// Login function
export const login = async (email: string, password: string): Promise<AuthState> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Find user by email
      const user = Object.values(MOCK_USERS).find(u => u.email === email);
      
      if (user && user.password === password) {
        const authState: AuthState = {
          user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar },
          isAuthenticated: true,
          isLoading: false,
          error: null
        };
        
        // Store in localStorage
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
        
        resolve(authState);
      } else {
        reject({ error: 'Invalid email or password' });
      }
    }, 800); // Simulate network delay
  });
};

// Register function
export const register = async (name: string, email: string, password: string): Promise<AuthState> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if email already exists
      const existingUser = Object.values(MOCK_USERS).find(u => u.email === email);
      
      if (existingUser) {
        reject({ error: 'Email already in use' });
        return;
      }
      
      // Create new user
      const newUserId = `user${Date.now()}`;
      const newUser: User & { password: string } = {
        id: newUserId,
        name,
        email,
        password,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=5E35B1&color=fff`
      };
      
      // In a real app, this would be an API call to create the user
      MOCK_USERS[newUserId] = newUser;
      
      const authState: AuthState = {
        user: { id: newUser.id, name: newUser.name, email: newUser.email, avatar: newUser.avatar },
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
      
      // Store in localStorage
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
      
      resolve(authState);
    }, 800); // Simulate network delay
  });
};

// Logout function
export const logout = async (): Promise<void> => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  return Promise.resolve();
};
