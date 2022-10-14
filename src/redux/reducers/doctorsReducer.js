import * as types from '../../constants/ActionTypes';

const initialState = {
    loading: false,
    errorMessage: "",
    doctors: [],
    // area_of_expertise is set default to "" and area to "-1" in order to make All fields of expertise default selected
    searchQuery: {area_of_expertise: "", area: "-1", facility: "", city: ""},
    totalLength: 0,
    page: 1,
    endIndex: 8,
};

const doctorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH: {
            return {
                ...state,
                loading: true,
                searchQuery: action.payload,
            };
        }
        case types.FIRST_SEARCH_RECEIVED: {
            return {
                ...state,
                loading: false,
                // affect the received doctors[] to the one in the store in order to preview only the first page
                doctors: action.payload.doctors,
                totalLength: action.payload.length,
                // error message is set when doctors[] is empty to be later on previewed in a material snackbar popup
                errorMessage: action.payload.doctors.length === 0 ? "No doctor matches your criteria" : "",
                // for firstSearch, page is set to 1 and endIndex to 8 (helps to reset the content/result when making a new search)
                page: 1,
                endIndex: 8,
            };
        }
        case types.SEARCH_RECEIVED: {
            return {
                ...state,
                loading: false,
                // concatenate doctors[] with the recent result (in order to implement the infinite scroll feature)
                doctors: [
                    ...state.doctors,
                    ...action.payload.doctors
                ],
                page: action.payload.page,
                // we update the endIndex depending on it's range (we set it to the totalLength for the last page)
                endIndex: state.endIndex + 8 > state.totalLength ? state.totalLength : state.endIndex + 8,
            };
        }
        case types.SEARCH_ERROR: {
            return {
                ...state,
                loading: false,
                errorMessage: action.payload,
            };
        }
        default:
            return state;
    }
};

export default doctorsReducer;

