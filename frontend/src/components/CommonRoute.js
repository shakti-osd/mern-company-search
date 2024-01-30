import React, {useState, useEffect} from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Listing from '../pages/Listing';
import About from '../pages/About';
import ServicesProvides from '../pages/ServicesProvides.js';
import Contact from '../pages/Contact';
import Dashboard from '../pages/Dashboard';
import Protected from './Protected';
import Profile from '../pages/Profile';
import CompanyProfile from '../pages/CompanyProfile';
import EditCompanyProfile from '../pages/EditCompanyProfile';

export default function CommonRoute() {
  const [isSignedIn, setIsSignedIn] = useState(null)
  const isLoggedIn = localStorage.getItem('userEmail') 

  useEffect(()=>{
    if(isLoggedIn){
      setIsSignedIn(true)
    }else{
      setIsSignedIn(false)
    }
  },[isLoggedIn])

  return (
    <div>
        <Routes>
            <Route exact path="/" element = {<Home/>} />
            <Route exact path="/listing" element = {<Listing/>} />
            <Route exact path="/about-us" element = {<About/>} />
            <Route exact path="/services" element = {<ServicesProvides/>} />
            <Route exact path="/profile" element = {<Profile/>} />
            <Route exact path="/company-profile/:id" element = {<CompanyProfile/>} />
            <Route exact path="/edit-company-profile" element = {<EditCompanyProfile/>} />
            <Route
            exact
            path="/dashboard"
            element={
              <Protected isSignedIn={isSignedIn}>
                <Dashboard />
              </Protected>
            }
          />
            <Route exact path="/contact-us" element = {<Contact/>} />
        </Routes>
    </div>
  )
}
