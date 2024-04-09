import FriendService from "../services/friendService.js";
import { customError } from "../errors/errorUtils/index.js";
import { getIdByUsername } from "../utils/index.js";

const isMyFriend = async (req, res) => {
    const username = req.params?.username;
    const senderId = req.senderId;
    if (!username) {
        throw new customError(400, "Username is required");
    }
    const userId = await getIdByUsername(username);
    const friendService = new FriendService();
    const response = await friendService.areFriends(senderId, userId);

    return res.status(200).json({
        message: "Fetched successfully",
        data: response,
        success: true
    });
};

export default isMyFriend;
