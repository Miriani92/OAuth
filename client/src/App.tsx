import React, { useEffect, useState } from "react";
import { Registration } from "./pages";
import { Button, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <Container>
      <CssBaseline />
      <Registration />
    </Container>
  );
}

export default App;
