import React, { ReactNode, FC, ReactElement } from "react";
import { Navigate, RouteProps } from "react-router-dom";

type PrivateRouteProps = RouteProps & { children: ReactNode };

export const PrivateRoute: FC<PrivateRouteProps> = ({
  children,
  ...rest
}): ReactElement | any => {
  return true ? (
    children
  ) : (
    <Navigate to="/chat" replace state={{ from: window.location.pathname }} />
  );
};
