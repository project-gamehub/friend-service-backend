import FriendService from "../services/friendService.js";

const getFriendList = async (req, res) => {
    const userId = req.userId;
    const friendService = new FriendService();
    const response = await friendService.getFriendList(userId);

    return res.status(200).json({
        message: "Retrieved successfully",
        data: response,
        success: true
    });
};

export default getFriendList;
