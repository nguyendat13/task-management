import { Navigate } from "react-router-dom";

const PublicRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/ho-so" />;
  }
  return element;
};

export default PublicRoute;
