import React from 'react';
import logo from './logo.svg';
import './App.css';
 
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import StartPage from './Pages/StartPage';
import NewLogin from './Pages/NewLogin';
import NotFoundPage from './Pages/NotFoundPage';
import  Login  from './Pages/OldLogin';
import  Registration  from './Pages/Registration';
import NewRegistration from './Pages/NewReg';
function App() {
  return (
  <Router>
    <Routes>
    <Route path='/oldlogin' element = {<Login/>}/>
      <Route path='/StartPage' element = {<StartPage/>}/>
      <Route path='/reg' element = {<NewRegistration/>}/>
      <Route path='/' element = {<NewLogin/>}/>
      <Route path='/registration' element = {<Registration/>}/>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
  );
   
}

export default App;
