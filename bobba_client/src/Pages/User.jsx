import { useParams } from "react-router-dom";
import UserPage from "./UserPage";

export const User = () => {
  const { name } = useParams();
  return <UserPage name={name} />;
};
