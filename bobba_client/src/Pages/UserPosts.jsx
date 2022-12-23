import { useParams } from "react-router-dom";
import UserPostsPage from "./UserPostsPage";

export const UserPosts = () => {
  const { name } = useParams();

  return <UserPostsPage name={name} />;
};
