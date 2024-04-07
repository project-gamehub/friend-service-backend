import FriendService from "../services/friendService.js";
import { customError } from "../errors/errorUtils/index.js";
import { getIdByUsername } from "../utils/index.js";

const rejectIncomingRequest = async (req, res) => {
    const cancellerId = req.senderId;
    const cancelRequestOfUsername = req.params?.username;
    if (!cancelRequestOfUsername) {
        throw new customError(400, "Whose request to reject?");
    }
    const cancelRequestOf = await getIdByUsername(cancelRequestOfUsername);

    const friendService = new FriendService();
    await friendService.rejectIncomingRequest(cancellerId, cancelRequestOf);

    return res.status(200).json({
        message: "Request rejected successfully",
        success: true
    });
};

export default rejectIncomingRequest;