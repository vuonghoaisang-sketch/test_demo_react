import { Navigate } from "react-router-dom";
import Test1 from "./Test1";
import Test2 from "./Test2";
import { useSelector } from "react-redux";
const PrivateRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  //   const nagivate = useNavigate();
  if (!isAuthenticated) {
    return <Navigate to="/login"></Navigate>;
  }
  return <>{props.children}</>;
};

export default PrivateRoute;
