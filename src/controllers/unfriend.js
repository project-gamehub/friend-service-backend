import FriendService from "../services/friendService.js";
import { customError } from "../errors/errorUtils/index.js";
import { getIdByUsername } from "../utils/index.js";

const unfriend = async (req, res) => {
    const initiatorId = req.senderId;
    const removeFriendUsername = req.params?.username;
    if (!removeFriendUsername) {
        throw new customError(400, "Whom to unfriend?");
    }
    const removeFriendId = await getIdByUsername(removeFriendUsername);

    const friendService = new FriendService();
    await friendService.removeFriend(initiatorId, removeFriendId);

    return res.status(200).json({
        message: "Friend removed successfully",
        success: true
    });
};

export default unfriend;
