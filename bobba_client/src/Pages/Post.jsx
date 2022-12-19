import React from 'react';
import { useParams } from 'react-router-dom';
import UserPage from './UserPage';

export const User = () => {
  const {id} = useParams();
  return ( <div/>
 // return ( <UserPage id = {id}/>
  );
};
 
 