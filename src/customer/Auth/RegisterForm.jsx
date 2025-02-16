import { Button, Grid, TextField, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, register } from "../../State/Auth/Action";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = useSelector(state => state.auth.jwt);
  const { isLoading, error } = useSelector(state => state.auth);
  const [formError, setFormError] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (jwt) {
      console.log("Token generated: ", jwt);
      console.log("Token in localStorage: ", localStorage.getItem("jwt"));
      dispatch(getUser());
      navigate("/"); // Navigate to home page upon successful registration
    }
  }, [jwt, dispatch, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError(null);
    setHasSubmitted(true);

    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password")
    };

    dispatch(register(userData))
      .then((response) => {
        if (response.error) {
          if (response.error.message.includes("401")) {
            setFormError("User already exists");
          } else {
            setFormError("An unexpected error occurred");
          }
        }
      })
      .catch((err) => {
        // setFormError("An unexpected error occurred");
      });

    console.log("userdata = ", userData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField 
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button className='bg-[#9155FD] w-full'
              type='submit'
              variant='contained'
              size='large'
              sx={{padding: "0.8rem 0", bgcolor:'#9155FD'}}
              disabled={isLoading}
            >
              Register
            </Button>
          </Grid>
          {hasSubmitted && formError && (
            <Grid item xs={12}>
              <Alert severity="error">{formError}</Alert>
            </Grid>
          )}
          {hasSubmitted && error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
        </Grid>
      </form>
      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center">
          <p>If you have already account ?</p>
          <Button onClick={() => navigate("/login")} className="ml-5" size='small'>Login</Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;