import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Doctors from "./Doctors";

const AppRoutes = () => {
    return(
        <Routes>
            <Route
                path="/search"
                element={<Doctors />}
            />
            <Route path="*" element={<Navigate to="/search" replace />} />
        </Routes>
    );
};

export default AppRoutes;

