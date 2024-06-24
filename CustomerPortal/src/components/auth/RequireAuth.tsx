import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
  const user = JSON.parse(localStorage.getItem("user")!);
  return user ? <Outlet /> : <Navigate to="/login" />;
}
