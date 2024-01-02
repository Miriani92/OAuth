import React, { useEffect, useState } from "react";
import { Registration } from "./pages";
import { Button, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Page from "./router/AppRoutes";

function App() {
  return (
    // <Container>
    <>
      <CssBaseline />
      <Page />
    </>
    // </Container>
  );
}

export default App;
