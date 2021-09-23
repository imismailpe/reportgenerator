import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import getRequest from '../../utils/request';
import { getBooksFailed, getBooksSuccess } from '../actions/actions';
import { BOOKS_REQUEST } from '../actions/actionTypes';
export function* fetchBooks(action) {
    const reqAttrs = {
        'method': 'GET',
        'headers': {
            'Content-Type': 'text/plain'
        }
    }
    try {
        const response = yield call(getRequest, 'https://ireportbackend.herokuapp.com/books', reqAttrs);
        yield put(getBooksSuccess(response));
    }
    catch (error) {
        console.log('error', error)
        yield put(getBooksFailed(error));
    }
}
export default function* watcherSaga() {
    yield takeLatest(BOOKS_REQUEST, fetchBooks);
}