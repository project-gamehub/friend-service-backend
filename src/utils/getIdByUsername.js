import axios from "axios";
import { USER_SERVICE_URL } from "../config/index.js";
import { handleIfErrorInResponse } from "../errors/errorUtils/index.js";

const getIdByUsername = async (username) => {
    const response = await axios.get(
        USER_SERVICE_URL + "get-id-by-username/" + username
    );
    handleIfErrorInResponse(response);
    const id = response.data.data._id;
    return id;
};

export default getIdByUsername;
