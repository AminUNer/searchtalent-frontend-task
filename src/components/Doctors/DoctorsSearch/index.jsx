import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {searchDoctors} from "../../../redux/Actions/doctorsActions";
import areasOfExpertise from "../../../utils/areaOfExpertise";

const DoctorsSearch = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.doctorsReducer.loading);
    // select doctor's reducer searchQuery object and use it in a local state called searchObject for local component changes
    const searchQuery = useSelector((state) => state.doctorsReducer.searchQuery);
    const [searchObject, setSearchObject] = useState(searchQuery);

    const handleAreaChange = (event) => {
        setSearchObject({
            ...searchObject,
            area_of_expertise: areasOfExpertise[event.target.value] || "",
            area: event.target.value,
        });
    };

    return(
        <Container maxWidth="md">
            <Box sx={{ flexGrow: 1 }} margin={4}>
                <Grid container display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <Box margin={3}>
                        <Typography variant="h3">
                            Search Doctors
                        </Typography>
                    </Box>
                    <Box margin={1}>
                        <TextField
                            id="outlined-basic"
                            label="City"
                            variant="outlined"
                            value={searchObject.city}
                            sx={{ minWidth: 500 }}
                            onChange={(e) => setSearchObject({
                                ...searchObject,
                                city: e.target.value,
                            })}/>
                    </Box>
                    <Box margin={2}>
                        <TextField
                            id="outlined-basic"
                            label="Facility"
                            variant="outlined"
                            value={searchObject.facility}
                            sx={{ minWidth: 500 }}
                            onChange={(e) => setSearchObject({
                                ...searchObject,
                                facility: e.target.value,
                            })}/>
                    </Box>
                    <Box margin={2} className="css-n27id2-MuiFormControl-root-MuiTextField-root">
                        <InputLabel id="demo-simple-select-label">Field of Expertise</InputLabel>
                        <Select
                            labelId="simple-select-label-id"
                            value={searchObject.area}
                            label="Field of expertise"
                            onChange={handleAreaChange}
                            // use a static Menu option for all fields, and map options from areasOfExpertise type
                        >
                            <MenuItem key="-1" value="-1">All Fields</MenuItem>
                            {
                                Object.keys(areasOfExpertise).map((area) => (
                                    <MenuItem key={area} value={area}>{areasOfExpertise[area]}</MenuItem>
                                ))
                            }
                        </Select>

                    </Box>
                    <Grid container display="flex" justifyContent="center" alignItems="center">
                        <>
                            <Box margin={1}>
                                <Button
                                    variant="contained"
                                    disabled={loading}
                                    // determine if the response is being loading or not via the loading flag selected from doctorsReducer
                                    onClick={() => {
                                        dispatch(searchDoctors(searchObject));
                                    }}>{loading ? 'Loading...' : 'Search'}</Button>
                            </Box>
                        </>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}
export default DoctorsSearch;



