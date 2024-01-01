import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../components";
import { Registration, Chat, Error } from "../pages";
import { getCurrentUser } from "../store/actions/auth.actions";
import { useAppDispatch } from "../hooks/use_store";

const AppRoutes = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Registration />} />
      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default AppRoutes;
