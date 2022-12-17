import React from 'react';
import './App.css';
 
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import StartPage from './Pages/StartPage';
import NewLogin from './Pages/NewLogin';
import NotFoundPage from './Pages/NotFoundPage';
import  Login  from './Pages/OldLogin';
import  Registration  from './Pages/Registration';
import NewRegistration from './Pages/NewRegistration';
function App() {
  return (
  <Router>
    <Routes>
    <Route path='/oldlogin' element = {<Login/>}/>
      <Route path='/StartPage' element = {<StartPage/>}/>
      <Route path='/registration' element = {<NewRegistration/>}/>
      <Route path='/' element = {<NewLogin/>}/>
      <Route path='/reg' element = {<Registration/>}/>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
  );
   
}

export default App;
