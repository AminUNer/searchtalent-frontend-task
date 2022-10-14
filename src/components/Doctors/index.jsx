import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Snackbar} from "@mui/material";
import {Helmet} from "react-helmet";
import {useSelector} from "react-redux";
import DoctorsList from "./DoctorsList";
import DoctorsSearch from "./DoctorsSearch";

const Doctors = () => {

    const doctors = useSelector((state) => state.doctorsReducer.doctors);

    const errorMessage = useSelector((state) => state.doctorsReducer.errorMessage);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

    const handleCloseError = useCallback(
        (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            setErrorSnackbarOpen(false);
        },
        [],
    );

    // check doctor's reducer errorMessage content and setSnackBarOpen to true in order to show it
    useEffect(() => {
        if (errorMessage) {
            setErrorSnackbarOpen(true);
        }
    }, [errorMessage]);

    // using react-helmet here allows to set meta tags that will be read by search engines and social media crawlers.
    return(
        <>
            <Helmet>
                <title>Search Doctor</title>
                <meta name="description" content="A view that enables the search and filter a list of doctors" />
            </Helmet>
            <DoctorsSearch />
            <hr />
            <DoctorsList doctors={doctors} />
            <Snackbar open={errorSnackbarOpen} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    )
}
export default Doctors;

