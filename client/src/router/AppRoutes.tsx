import React from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../components";
import { Registration, Chat, Error } from "../pages";

const AppRoutes = () => {
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
