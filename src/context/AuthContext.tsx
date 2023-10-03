import React, { createContext, useContext } from "react";
import { useReducerAsync } from "use-reducer-async";

interface Iuser {
  name: string;
  email: string;
  password: string;
}
interface AuthContextType {
  user: Iuser;
}
interface AuthContextDispatcherType {
  dispatchUser: React.Dispatch<{
    type: string;
    payload: any;
  }>;
}

const AuthContext = createContext<AuthContextType | null>(null);
const AuthContextDispatcher = createContext<AuthContextDispatcherType | null>(
  null
);
const initialUserState: Iuser = { email: "", name: "", password: "" };

const reducer = (
  state: Iuser = initialUserState,
  action: { type: string; payload: any }
): Iuser => {
  return state;
};

const asyncReducer = {
  LOGIN: async (state, action) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...initialUserState });
      }, 100);
    });
  },
  SIGN_UP: null,
  LOG_OUT: null,
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, dispatchUser] = useReducerAsync(
    reducer,
    initialUserState,
    asyncReducer
  );
  return (
    <AuthContext.Provider value={{ user }}>
      <AuthContextDispatcher.Provider value={{ dispatchUser }}>
        {children}
      </AuthContextDispatcher.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
const useAuth = () => useContext(AuthContext);
const useAuthActions = () => useContext(AuthContextDispatcher);
export { useAuth, useAuthActions };
