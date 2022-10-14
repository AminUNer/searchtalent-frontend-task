import React from 'react';
import {Box, Card, CardActionArea, CardContent, Grid, Typography} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import PsychologyIcon from '@mui/icons-material/Psychology';

const DoctorCard = ({doctor}) => {

    return(
        <>
            <Grid item xs={6} md={4} lg={3} display="flex" justifyContent="center" alignItems="center">
                <Card sx={{ minWidth: 300, minHeight: 150 }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" noWrap>
                                { doctor.first_name } { doctor.last_name }
                            </Typography>
                            <Grid display="flex" alignItems="center">
                                <Box margin={1}>
                                    <EmailIcon />
                                </Box>
                                <Typography variant="body2" color="text.secondary" noWrap>
                                    { doctor.email }
                                </Typography>
                            </Grid>
                            <Grid display="flex" alignItems="center">
                                <Box margin={1}>
                                    <PlaceIcon />
                                </Box>
                                <Typography variant="body2" color="text.secondary" noWrap>
                                    { doctor.city }
                                </Typography>
                            </Grid>
                            <Grid display="flex" alignItems="center">
                                <Box margin={1}>
                                    <SavedSearchIcon />
                                </Box>
                                <Typography variant="body2" color="text.secondary" noWrap>
                                    { doctor.area_of_expertise }
                                </Typography>
                            </Grid>
                            <Grid display="flex" alignItems="center">
                                <Box margin={1}>
                                    <PsychologyIcon />
                                </Box>
                                <Typography variant="body2" color="text.secondary" noWrap>
                                    { doctor.facility }
                                </Typography>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </>
    )
}
export default DoctorCard;

