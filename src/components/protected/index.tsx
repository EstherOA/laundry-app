import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { data: token } = useQuery({ queryKey: ["userToken"], enabled: false });

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
