import {FIRST_SEARCH_RECEIVED, SEARCH, SEARCH_ERROR, SEARCH_RECEIVED} from "../../constants/ActionTypes";
import axios from "axios";
import baseUrl from "../../utils/apiConstants";

export const searchDoctors = (data, page = 1, limit = 8) => async (dispatch) => {
    try {
        dispatch({
            type: SEARCH,
            payload: data,
        });
        const response = await axios.post(
            baseUrl + "?page=" + page + "&limit=" + limit,
            {
                city: data?.city,
                area_of_expertise: data?.area_of_expertise,
                facility: data?.facility,
            },
            {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        });
        // when searchDoctors is called without page attribute, then it's default set to 1, so it's the first page to be loaded
        if (page === 1) {
            dispatch({
                type: FIRST_SEARCH_RECEIVED,
                payload: {doctors: response?.data.doctors, length: response?.data?.length, page}
            });
        } else {
            // when searchDoctors is called with the next page attribute, then we dispatch SEARCH_RECEIVED which concatenate in the doctorsReducer the received results
            dispatch({
                type: SEARCH_RECEIVED,
                payload: {doctors: response?.data?.doctors, page}
            });
        }
        return response;
    } catch (err) {
        // SEARCH_ERROR is called with an error message in the payload to be later on previewed in a snackbar
        dispatch({
            type: SEARCH_ERROR,
            payload: "Backend endpoint call failed",
        });
        return false;
    }
};
