import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CommonRoute from './components/CommonRoute';
import './App.css';
import axios from 'axios';
import { useAuth } from './context/AuthContext';

function App() {
  const [user, setUser] = useState(null);
  const { updateUser } = useAuth();
  const getUser = async () => {
    try {
      const url = 'http://localhost:5555/user/login/success';
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user);
      updateUser(data.user);
      console.log('data_user', data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <Header userData={user} />
      <CommonRoute />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
