import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Page from "./router/AppRoutes";
import { getCurrentUser } from "./store/actions/auth.actions";
import { useAppDispatch } from "./hooks/use_store";
import { useAppSelector } from "./hooks/use_store";
import { getAllChats } from "./store/actions/chat.actions";

function App() {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  const init = async () => {
    await dispatch(getCurrentUser());
    await dispatch(getAllChats());
  };

  useEffect(() => {
    init();
  }, []);

  if (isLoading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  }

  return (
    <>
      <CssBaseline />
      <Page />
    </>
  );
}

export default App;
