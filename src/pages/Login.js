import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {AuthContext} from '../context/AuthContext'
import { Navigate, redirect } from 'react-router-dom';
const Login = () => {
    const {login,user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Define your Yup validation schema
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    });

    // Define your Formik form handling
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            login(values)
            // redirect('/dashboard')
        }
    });
if(user)
return(
    <Navigate to='/dashboard' />
)
    else
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    {...formik.getFieldProps('email')}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    {...formik.getFieldProps('password')}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                )}
            </form>
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default Login;