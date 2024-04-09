import FriendService from "../services/friendService.js";
import { getIdByUsername } from "../utils/index.js";

// This will cancel the outgoing request of the sender
const cancelOutgoingRequest = async (req, res) => {
    const cancellerId = req.senderId;
    const cancelRequestFromUsername = req.params?.username;
    const cancelRequestFrom = await getIdByUsername(cancelRequestFromUsername);

    const friendService = new FriendService();
    await friendService.cancelOutgoingRequest(cancellerId, cancelRequestFrom);

    return res.status(200).json({
        message: "Request cancelled successfully",
        success: true
    });
};

export default cancelOutgoingRequest;
