import React, { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const LoginPageContainer = styled('div') ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
});

const LoginForm = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  width: 300,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
}));

const LoginPage = () => {
  const context = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    context.authenticate(userName, password);
  };

  let location = useLocation();
  const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

  if (context.isAuthenticated === true) {
    return <Navigate to={from} />;
  }

  // welcome message for each user will be displayed in the siteheader
  return (
    <LoginPageContainer>
      <Typography variant="h4" gutterBottom>Login page</Typography>
      <LoginForm>
        <Typography>You must log in to see your favourites/watchlist!</Typography>
        <TextField
          id="username"
          label="User Name"
          variant="outlined"
          margin="normal"
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" style={{ backgroundColor: 'purple', color: 'white' }} onClick={login}>
          Log in
        </Button>
        <Typography>
          Not Registered? <Link to="/signup">Sign Up!</Link>
        </Typography>
      </LoginForm>
    </LoginPageContainer>
  );
};

export default LoginPage;
