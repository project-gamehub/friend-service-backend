import FriendService from "../services/friendService.js";

const getFriendRequestList = async (req, res) => {
    const userId = req.senderId;
    const friendService = new FriendService();
    const response = await friendService.getFriendRequestList(userId);

    return res.status(200).json({
        message: "Retrieved successfully",
        data: response,
        success: true
    });
};

export default getFriendRequestList;
