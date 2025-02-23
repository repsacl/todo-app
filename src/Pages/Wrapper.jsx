import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/auth";

function Wrapper({ children }) {
  const { session, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center"><h1 className="text-5xl mt-30 text-center">Loading...</h1></div>;
  } else {
    if (session) {
      return <>{children}</>;
    }
    return <Navigate to="/login" />;
  }
}

export default Wrapper;