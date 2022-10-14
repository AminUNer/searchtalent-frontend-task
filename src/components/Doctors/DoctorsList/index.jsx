import React, {useCallback} from 'react';
import { Grid } from "@mui/material";
import DoctorCard from "./DoctorCard";
import InfiniteScroll from "react-infinite-scroll-component";
import {searchDoctors} from "../../../redux/Actions/doctorsActions";
import {useDispatch, useSelector} from "react-redux";

const DoctorsList = ({doctors}) => {

    const dispatch = useDispatch();

    const searchQuery = useSelector((state) => state.doctorsReducer.searchQuery);
    const page = useSelector((state) => state.doctorsReducer.page);
    // redux state endIndex selector used for scrollLoading, initial state is set to 8 (in doctorsReducer) in order to show only the first 8 doctors in the first place
    const endIndex = useSelector((state) => state.doctorsReducer.endIndex);
    // redux state selector for the current filtered doctors result length
    const totalLength = useSelector((state) => state.doctorsReducer.totalLength);


    // fetchMoreDoctors by updating the page
    const showMoreDoctors = useCallback(() => {
        dispatch(searchDoctors(searchQuery, page + 1));
        }, [dispatch, page, searchQuery]);

    return(
        // InfiniteScroll is used to implement the lazy/scrolling loading in the frontend side
        <InfiniteScroll
            dataLength={doctors.length}
            next={showMoreDoctors}
            hasMore={endIndex < totalLength}
            loader={
            <p style={{ textAlign: "center" }}>
                <b>Loading...</b>
            </p>}
            // show ending message in the end of the list or empty result message when filtered array is empty
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>{doctors.length === 0 ? 'Empty result' : `Yay! That's all`}</b>
                    <hr />
                </p>
            }
        >
            <Grid container spacing={2} rowSpacing={1} display="flex" justifyContent="center" alignItems="center">
                {doctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </Grid>
        </InfiniteScroll>
    )
}
export default DoctorsList;

