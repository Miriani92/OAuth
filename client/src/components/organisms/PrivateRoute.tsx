import React, { ReactNode, FC, ReactElement } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { useAppSelector } from "../../hooks/use_store";

type PrivateRouteProps = RouteProps & { children: ReactNode };

export const PrivateRoute: FC<PrivateRouteProps> = ({
  children,
  ...rest
}): ReactElement | any => {
  const { user } = useAppSelector((state) => state.auth);

  return user ? (
    children
  ) : (
    <Navigate to="/" replace state={{ from: window.location.pathname }} />
  );
};
