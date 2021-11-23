import { createContext, useContext, useEffect, useState } from "react";
import app from "../services/firebase.config";

const AuthContext = createContext([]);

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {

  const [session, setSession] = useState(false);
  const [logout, setLogout] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        setSession(true);
        if (user.displayName) {
          setEmail(user.displayName)
        } else {
          setEmail(user.email);
        }
      } else {
        setSession(false);
      }
    });
  }, [session]);

  const showBtnLogout = () => {
    if (logout) {
      setLogout(null);
    } else {
      setLogout('active');
    }
  }

  const btnLogout = () => {
    app.auth().signOut()
      .then((response) => {
        setSession(false);
        setLogout(null);
        setEmail('');
        localStorage.removeItem('user');
      })
  }

  return (
    <AuthContext.Provider value={{
      session, logout, showBtnLogout, btnLogout, email, setEmail
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;