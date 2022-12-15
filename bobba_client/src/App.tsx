import React from 'react';
import logo from './logo.svg';
import './App.css';
 
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import StartPage from './Pages/StartPage';
import MyProfile from './Pages/MyProfile';
import NotFoundPage from './Pages/NotFoundPage';
import  Login  from './Pages/Login';
import  Registration  from './Pages/Registration';
function App() {
  return (
  <Router>
    <Routes>
      <Route path='/' element = {<StartPage/>}/>
      <Route path='/link' element = {<MyProfile/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/registration' element = {<Registration/>}/>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
  );
   
}

export default App;
