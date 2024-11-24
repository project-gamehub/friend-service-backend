import FriendService from "../services/friendService.js";

const acceptRequest = async (req, res) => {
    const accepterId = req.senderId;
    const requesterId = req.params.userId;

    const friendService = new FriendService();

    await friendService.acceptRequest(accepterId, requesterId);

    return res.status(200).json({
        message: "Request accepted successfully",
        success: true
    });
};

export default acceptRequest;
