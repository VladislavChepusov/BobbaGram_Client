import React from 'react';
import { useParams } from 'react-router-dom';
import PostPage from './PostPage';


export const Post = () => {
  const {id} = useParams();
  //return ( <div>{id}</div>
 return ( <PostPage id = {id}/>
  );
};
 
 