import { message } from "antd";
import { BOOKS_FETCH_FAILED, BOOKS_RECEIVED, BOOKS_REQUEST } from "./actionTypes";


export function getBooksRequest(){
    return {
        type: BOOKS_REQUEST
    };
};
export function getBooksSuccess(data){
    return {
        type: BOOKS_RECEIVED,
        payload: data
    };
};
export function getBooksFailed(error){
    message.error(`${error}`);
    return {
        type: BOOKS_FETCH_FAILED,
        payload: error
    };
};