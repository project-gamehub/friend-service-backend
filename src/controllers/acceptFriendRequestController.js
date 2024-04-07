import FriendService from "../services/friendService.js";
import { customError } from "../errors/errorUtils/index.js";
import { getIdByUsername } from "../utils/index.js";

const acceptRequest = async (req, res) => {
    const accepterId = req.senderId;
    const requesterUsername = req.params?.username;
    if (!requesterUsername) {
        throw new customError(400, "Whose request to accept?");
    }
    const requesterId = await getIdByUsername(requesterUsername);

    const friendService = new FriendService();

    await friendService.acceptRequest(accepterId, requesterId);

    return res.status(200).json({
        message: "Request accepted successfully",
        success: true
    });
};

export default acceptRequest;
