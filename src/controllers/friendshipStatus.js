import FriendService from "../services/friendService.js";

const friendshipStatus = async (req, res) => {
    const initiatorId = req.senderId;
    const userId = req.userId;
    const friendService = new FriendService();
    const response = await friendService.friendshipStatus(initiatorId, userId);

    return res.status(200).json({
        message: "Fetched successfully",
        data: response,
        success: true
    });
};

export default friendshipStatus;
