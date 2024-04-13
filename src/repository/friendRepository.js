import Friend from "../models/friendModel.js";

class FriendRepository {
    async createUser(userId) {
        const user = await Friend.create({ userId, requests: [], friends: [] });
        return user;
    }

    async createFriendRequest(senderId, receiverId) {
        const user = await Friend.findOneAndUpdate(
            { userId: receiverId },
            { $push: { requests: senderId } },
            { new: true }
        );
        return user;
    }

    async deleteFriendRequest(deleteRequestofId, deleteRequestFromId) {
        const user = await Friend.findOneAndUpdate(
            { userId: deleteRequestFromId },
            { $pull: { requests: deleteRequestofId } },
            { new: true }
        );
        return user;
    }

    // remove user 2 from user 1
    async removeFriend(user1Id, user2Id) {
        const user = await Friend.findOneAndUpdate(
            { userId: user1Id },
            { $pull: { friends: user2Id } },
            { new: true }
        );
        return user;
    }

    // add friend to user's friend list
    async addToFriend(userId, friendId) {
        const user = await Friend.findOneAndUpdate(
            { userId: userId },
            { $push: { friends: friendId } },
            { new: true }
        );
        return user;
    }

    async getFriendList(userId) {
        const friendList = await Friend.findOne({ userId }, "friends -_id");
        return friendList?.friends ? friendList.friends : [];
    }

    async getFriendRequestList(userId) {
        const friendList = await Friend.findOne({ userId }, "requests -_id");
        return friendList?.requests ? friendList.requests : [];
    }

    async areFriends(user1Id, user2Id) {
        const data = await Friend.findOne({ userId: user1Id });
        if (!data || !data.friends.includes(user2Id)) {
            return false;
        }
        return true;
    }

    // friendshipStatusCode = 1 means Friends
    // friendshipStatusCode = 2 means The user who is initiating the query has requested the front user for friends
    // friendshipStatusCode = 3 means The user who is initiating the query has received friend request from the front user
    // friendshipStatusCode = -1 means Strangers
    async friendshipStatus(initiatorId, userId) {
        const initiator = await Friend.findOne({ userId: initiatorId });
        const user = await Friend.findOne({ userId: userId });
        if (initiator && initiator.friends.includes(userId)) {
            return {
                friendshipStatusCode: 1,
                friendshipStatus: "Friends"
            };
        }
        if (user && user.requests.includes(initiatorId)) {
            return {
                friendshipStatusCode: 2,
                friendshipStatus: "Requested"
            };
        }
        if (initiator && initiator.requests.includes(userId)) {
            return {
                friendshipStatusCode: 3,
                friendshipStatus: "Request incoming"
            };
        }
        return {
            friendshipStatusCode: -1,
            friendshipStatus: "Strangers"
        };
    }

    async getOneByData(data, getFields = "") {
        const user = await Friend.findOne(data, getFields);
        return user;
    }
}

export default FriendRepository;
