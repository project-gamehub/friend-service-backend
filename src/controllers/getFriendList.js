import FriendService from "../services/friendService.js";
import { customError } from "../errors/errorUtils/index.js";
import { getIdByUsername } from "../utils/index.js";

const getFriendList = async (req, res) => {
    const username = req.params?.username;
    if (!username) {
        throw new customError(400, "Username is required");
    }
    const userId = await getIdByUsername(username);
    const friendService = new FriendService();
    const response = await friendService.getFriendList(userId);

    return res.status(200).json({
        message: "Retrieved successfully",
        data: response,
        success: true
    });
};

export default getFriendList;
