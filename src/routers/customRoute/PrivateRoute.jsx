import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/dang-nhap" />;
  }
  return element;
};

export default PrivateRoute;
