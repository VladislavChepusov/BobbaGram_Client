import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./Pages/StartPage";
import NewLogin from "./Pages/NewLogin";
import NotFoundPage from "./Pages/NotFoundPage";
import NewFeed from "./Pages/NewFeed";
import CreatePost from "./Pages/CreatePost";
import NewRegistration from "./Pages/NewRegistration";
import UserSetting from "./Pages/UserSetting";
import { User } from "./Pages/User";
import { Post } from "./Pages/Post";
import { UserPosts } from "./Pages/UserPosts";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/StartPage" element={<StartPage />} />
        <Route path="/acute" element={<NewFeed />} />

        <Route path="/create" element={<CreatePost />} />

        <Route path="/registration" element={<NewRegistration />} />
        <Route path="/setting" element={<UserSetting />} />
        <Route path="/" element={<NewLogin />} />

        <Route path="/user/:name" element={<User />} />
        <Route path="/post/:id" element={<Post/>} />
        <Route path="/userposts/:name" element={<UserPosts/>} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
