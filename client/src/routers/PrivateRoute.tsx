import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../store/StoreProvider";

const PrivateRoute = () => {
  const { state } = useContext(AppContext);
  const { loggedIn } = state;

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
