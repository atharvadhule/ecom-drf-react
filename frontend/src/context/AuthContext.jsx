import { createContext, useContext, useState , useEffect } from "react";
import { setAuthToken } from "../api/axios";
// Holds authentication-related state that can be shared across the app.
export const AuthContext = createContext(null);

// Makes the authentication state available to all child components.
export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);


  useEffect(() => {
      setAuthToken(accessToken);  
  }, [accessToken]);
  return (
    <AuthContext.Provider value={{ 
      user,
      setUser,
      loading,
      setLoading ,
      accessToken,
      setAccessToken
      }}>
        {children}
    </AuthContext.Provider>
  );
}

// Lets components read the authentication state without importing the context directly.
export function useAuth() {
  return useContext(AuthContext);
}
