import Friend from "../models/friendModel.js";

class FriendRepository {
    async create(userId) {
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

    async deleteFriendRequest(cancellerId, cancelRequestOfId) {
        const user = await Friend.findOneAndUpdate(
            { userId: cancellerId },
            { $pull: { requests: cancelRequestOfId } },
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

    async update(id, dataToUpdate) {
        const user = await Friend.findOneAndUpdate({ id }, dataToUpdate, {
            new: true
        });
        return user;
    }

    async delete(id) {
        const user = await Friend.findByIdAndDelete(id);
        return user;
    }

    async getOneByData(data, getFields = "") {
        const user = await Friend.findOne(data, getFields);
        return user;
    }
}

export default FriendRepository;
