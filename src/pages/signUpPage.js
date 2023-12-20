import React, { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const SignUpPageContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const SignUpForm = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  width: 300,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
}));

const SignUpPage = () => {
  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);

  const register = () => {
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);

    if (validPassword && password === passwordAgain) {
      context.register(userName, password);
      setRegistered(true);
    }
  }

  if (registered === true) {
    return <Navigate to="/login" />;
  }

  return (
    <SignUpPageContainer>
      <Typography variant="h4" gutterBottom>Register Here</Typography>
      <SignUpForm>
        <Typography>You must register with a username and password to log in.</Typography>
        <TextField
          value={userName}
          id="username"
          label="User Name"
          variant="outlined"
          margin="normal"
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          value={password}
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          value={passwordAgain}
          id="passwordAgain"
          label="Password Again"
          type="password"
          variant="outlined"
          margin="normal"
          onChange={(e) => setPasswordAgain(e.target.value)}
        />
        <Button variant="contained" style={{ backgroundColor: 'purple', color: 'white' }} onClick={register}>
          Register
        </Button>
        <Typography>
          Already Registered? <Link to="/login">Log In!</Link>
        </Typography>
      </SignUpForm>
    </SignUpPageContainer>
  );
};

export default SignUpPage;
