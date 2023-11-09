import axios from "axios";

const fetcher={
    getUser(){
        return axios.get("api/user/");
    },
};

export default fetcher;