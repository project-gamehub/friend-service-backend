import FriendService from "../services/friendService.js";

const isMyFriend = async (req, res) => {
    const senderId = req.senderId;
    const userId = req.userId;
    const friendService = new FriendService();
    const response = await friendService.areFriends(senderId, userId);

    return res.status(200).json({
        message: "Fetched successfully",
        data: response,
        success: true
    });
};

export default isMyFriend;
