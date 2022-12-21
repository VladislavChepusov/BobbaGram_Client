import { useParams } from "react-router-dom";
import PostPage from "./PostPage";

export const Post = () => {
  const { id } = useParams();
  return <PostPage id={id} />;
};
