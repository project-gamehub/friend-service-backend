import FriendService from "../services/friendService.js";

const unfriend = async (req, res) => {
    const initiatorId = req.senderId;
    const removeFriendId = req.userId;

    const friendService = new FriendService();
    await friendService.removeFriend(initiatorId, removeFriendId);

    return res.status(200).json({
        message: "Friend removed successfully",
        success: true
    });
};

export default unfriend;
