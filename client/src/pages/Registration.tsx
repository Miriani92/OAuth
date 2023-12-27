import React from "react";
import { Container } from "@mui/material";
import { NavigationBar } from "../components";

export const Registration = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <NavigationBar />
    </Container>
  );
};
