import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const updateUser = (_user) => setUser(_user);

  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
