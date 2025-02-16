import { Button, Grid, TextField, Alert } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../State/Auth/Action";

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, jwt } = useSelector(state => state.auth);
    const [formError, setFormError] = useState(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        if (jwt) {
            navigate("/"); // Navigate to home page upon successful login
        }
    }, [jwt, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormError(null);
        setHasSubmitted(true);

        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get("email"),
            password: data.get("password")
        };

        dispatch(login(userData))
            .then((response) => {
                if (response.error) {
                    console.log("Error message:", response.error.message); // Log the error message for debugging
                    if (response.error.message === "User ID not found") {
                        setFormError("User ID not found. Please check your email.");
                    } else if (response.error.message === "Invalid password") {
                        setFormError("Invalid password");
                    } else {
                        setFormError(response.error.message);
                    }
                }
            })
            .catch((err) => {
                // setFormError("An unexpected error occurred");
                console.log("error", err);
            });

        console.log("userdata = ", userData);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
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
                            Login
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
                    <p>If you don't have account ?</p>
                    <Button onClick={() => navigate("/register")} className="ml-5" size='small'>Register</Button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;