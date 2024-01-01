import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import GithubIcon from "@mui/icons-material/GitHub";
import { Container, Button, Box, Typography } from "@mui/material";
import { NavigationBar } from "../components";
import { getGoogleOAuthURL } from "../utils/getGoogleUrl";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/use_store";

export const Registration = () => {
  const { user } = useAppSelector((state) => state.auth);
  const isUser = Object.values(user).some((value) => value !== "");

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <NavigationBar />
      {isUser && <Navigate to="/chat" />}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4">Sign with Providers</Typography>
        <Button
          href={getGoogleOAuthURL()}
          variant="contained"
          color="secondary"
          fullWidth
          startIcon={<GoogleIcon />}
        >
          Sign in with google
        </Button>
        <Button
          variant="contained"
          startIcon={<GithubIcon />}
          color="success"
          fullWidth
        >
          Sign in with github
        </Button>
      </Box>
    </Container>
  );
};
