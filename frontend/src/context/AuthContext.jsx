import { createContext, useContext, useState, useEffect } from "react";
import { setAuthToken } from "../api/axios";
import api from "../api/axios";
import { setOnTokenRefresh  , setOnLogout} from "../api/axios";
// Holds authentication-related state that can be shared across the app.
export const AuthContext = createContext(null);

// Makes the authentication state available to all child components.
export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);


  // Whenever the accessToken changes, update the auth token in the API module i.e axios.js
  useEffect(() => {
    setAuthToken(accessToken);
  }, [accessToken]);


  //get the new access token from the axios and update the accessToken state in AuthContext
  useEffect(() => {
    setOnTokenRefresh(setAccessToken);
  }, []);


  //
  useEffect(() => {
    setOnLogout(() => {
      setUser(null);
      setAccessToken(null);
      setAuthToken(null);
    });
  }, []);



  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await api.post("auth/refresh/");
        // setAccessToken(response.data.access);
        const newToken = response.data.access;
        setAccessToken(newToken);
        setAuthToken(newToken);
        const userResponse = await api.get("auth/me/");
        setUser(userResponse.data);
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error(error);
        }
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);


  function logout() {
    setUser(null);
    setAccessToken(null);
    setAuthToken(null);
}
  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loading,
      setLoading,
      accessToken,
      setAccessToken,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Lets components read the authentication state without importing the context directly.
export function useAuth() {
  return useContext(AuthContext);
}
