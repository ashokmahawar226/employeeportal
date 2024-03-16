
import { createContext, useContext, useReducer, ReactNode } from 'react';
import { User } from './AuthModal';

// Interface for the authentication state
interface AuthState {
  isAuthenticated: boolean;
  user: null | User; // Replace 'string' with the actual user data type
}

// Action types
type AuthAction =
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'SET_USER'; payload: null | User }; // Replace 'string' with the actual user data type

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext<{
 // state: AuthState;
  //dispatch: React.Dispatch<AuthAction>;
  user: User | undefined;
  isAuthenticated : boolean;
  setAuthenticated? : CallableFunction,
  setUser? : CallableFunction
  removeUser? : CallableFunction
} | undefined>(undefined);

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: null,
  });

  const setAuthenticated = (isAuthenticated: boolean) => {
    dispatch({ type: 'SET_AUTHENTICATED', payload: isAuthenticated });
  };

  const setUser = (user: null | User) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const removeUser = ()=>{
    dispatch({ type: 'SET_USER', payload: null });
  }

  return (
    <AuthContext.Provider value={{ 
      user: state.user || undefined,
      isAuthenticated: state.isAuthenticated,
      setAuthenticated,
      setUser,
      removeUser
     }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};