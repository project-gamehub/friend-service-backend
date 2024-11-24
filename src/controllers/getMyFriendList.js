import FriendService from "../services/friendService.js";

const getMyFriendList = async (req, res) => {
    const userId = req.senderId;

    const friendService = new FriendService();
    const response = await friendService.getFriendList(userId);

    return res.status(200).json({
        message: "Retrieved successfully",
        data: response,
        success: true
    });
};

export default getMyFriendList;
