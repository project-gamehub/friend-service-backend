import FriendService from "../services/friendService.js";
import { getIdByUsername } from "../utils/index.js";

const friendshipStatus = async (req, res) => {
    const initiatorId = req.senderId;
    const username = req.params?.username;
    const userId = await getIdByUsername(username);
    const friendService = new FriendService();
    const response = await friendService.friendshipStatus(initiatorId, userId);

    return res.status(200).json({
        message: "Fetched successfully",
        data: response,
        success: true
    });
};

export default friendshipStatus;
