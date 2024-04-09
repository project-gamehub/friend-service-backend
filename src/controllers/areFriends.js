import FriendService from "../services/friendService.js";
import { customError } from "../errors/errorUtils/index.js";

const areFriends = async (req, res) => {
    const user1Id = req.body?.user1Id;
    const user2Id = req.body?.user2Id;
    if (!user1Id || !user2Id) {
        throw new customError(400, "User ids are missing");
    }
    console.log("User 1 is: ", user1Id);
    console.log("User 2 is: ", user2Id);
    const friendService = new FriendService();
    const response = await friendService.areFriends(user1Id, user2Id);

    return res.status(200).json({
        message: "Fetched successfully",
        data: response,
        success: true
    });
};

export default areFriends;
