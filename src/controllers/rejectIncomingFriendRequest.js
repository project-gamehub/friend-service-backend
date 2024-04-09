import FriendService from "../services/friendService.js";

const rejectIncomingRequest = async (req, res) => {
    const cancellerId = req.senderId;
    const cancelRequestOf = req.userId;

    const friendService = new FriendService();
    await friendService.rejectIncomingRequest(cancellerId, cancelRequestOf);

    return res.status(200).json({
        message: "Request rejected successfully",
        success: true
    });
};

export default rejectIncomingRequest;
