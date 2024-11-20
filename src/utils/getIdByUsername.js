import axios from "axios";
import { USER_SERVICE_URL } from "../config/index.js";
import { customError } from "../errors/errorUtils/index.js";

const getIdByUsername = async (username) => {
    try {
        const response = await axios.get(
            USER_SERVICE_URL + "get-id-by-username/" + username
        );
        const id = response.data.data._id;
        return id;
    } catch (error) {
        throw new customError(
            error?.response?.data?.error?.statusCode,
            error?.response?.data?.message
        );
    }
};

export default getIdByUsername;
