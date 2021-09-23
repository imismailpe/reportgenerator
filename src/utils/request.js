import 'whatwg-fetch';

export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    else if (response.status >= 500 && response.status < 600) {
        let error = new Error('Something wrong on server side');
        error.response = response;
        throw error;
    }
    else if (response.status === 403) {
        let error = new Error('Forbidden');
        error.response = response;
        throw error;
    }
    let error = new Error(`${response.status}`);
    error.response = response;
    throw error;
}

function parseJson(response) {
    if (response.status === 204 || response.status === 205) {
        return null;
    }
    return response.json();
}

export default function getRequest(url, options) {
    return fetch(url, options)
        .then(response => checkStatus(response))
        .then(statusCheckedResp => parseJson(statusCheckedResp));
}