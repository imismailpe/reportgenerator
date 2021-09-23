import { fromJS } from "immutable";
import { BOOKS_FETCH_FAILED, BOOKS_RECEIVED, BOOKS_REQUEST } from "../actions/actionTypes";

export const initialState = fromJS({
    isFetching: false,
    books: [],
    fetchError: null
});

export const dataR = (state = initialState, action = {}) => {
    switch(action.type){
        case BOOKS_REQUEST:
            return state.set('isFetching', true);
        case BOOKS_RECEIVED:
            return state.set('books', action.payload)
            .set('isFetching', false)
            .set('fetchError', null);
        case BOOKS_FETCH_FAILED:
            return state.set('books', [])
            .set('isFetching', false)
            .set('fetchError', action.payload);
        default:
            return initialState;
    }
};
export default dataR;