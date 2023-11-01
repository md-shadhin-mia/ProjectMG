import {SET_TOKEN} from "./types.jsx";

function setAuthToken(token) {
    return {type:SET_TOKEN, payload:token}
}

export  default  setAuthToken();