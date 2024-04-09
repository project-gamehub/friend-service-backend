import { customError } from "../errors/errorUtils/index.js";
import FriendRepository from "../repository/friendRepository.js";

class FriendService {
    constructor() {
        this.friendRepository = new FriendRepository();
    }

    async createUser(receiverId) {
        return await this.friendRepository.createUser(receiverId);
    }

    async sendRequest(senderId, receiverId) {
        let receiver = await this.friendRepository.getOneByData({
            userId: receiverId
        });
        if (!receiver) {
            receiver = await this.createUser(receiverId);
        }
        if (receiver.friends.includes(senderId)) {
            throw new customError(400, "Already friends");
        }
        if (receiver.requests.includes(senderId)) {
            throw new customError(400, "Already requested");
        }

        const sender = await this.friendRepository.getOneByData({
            userId: senderId
        });
        if (sender && sender.requests.includes(receiverId)) {
            throw new customError(
                400,
                "This user has already sent you a request"
            );
        }

        const response = await this.friendRepository.createFriendRequest(
            senderId,
            receiverId
        );
        return response;
    }

    async cancelOutgoingRequest(cancellerId, cancelRequestFromId) {
        const cancelRequestFrom = await this.friendRepository.getOneByData({
            userId: cancelRequestFromId
        });
        if (!cancelRequestFrom) {
            throw new customError(400, "No request found");
        } else {
            if (cancelRequestFrom.friends.includes(cancellerId)) {
                throw new customError(400, "You are friends");
            }
            if (!cancelRequestFrom.requests.includes(cancellerId)) {
                throw new customError(400, "No request found");
            }
        }
        const response = await this.friendRepository.deleteFriendRequest(
            cancellerId,
            cancelRequestFromId
        );
        return response;
    }

    async rejectIncomingRequest(rejectorId, rejectRequestOfId) {
        const rejector = await this.friendRepository.getOneByData({
            userId: rejectorId
        });
        if (!rejector) {
            throw new customError(400, "No request found");
        } else {
            if (rejector.friends.includes(rejectRequestOfId)) {
                throw new customError(400, "You are friends");
            }
            if (!rejector.requests.includes(rejectRequestOfId)) {
                throw new customError(400, "No request found");
            }
        }
        const response = await this.friendRepository.deleteFriendRequest(
            rejectRequestOfId,
            rejectorId
        );
        return response;
    }

    async acceptRequest(accepterId, requesterId) {
        const accepter = await this.friendRepository.getOneByData({
            userId: accepterId
        });
        if (!accepter) {
            throw new customError(400, "No request found");
        }
        if (accepter.friends.includes(requesterId)) {
            throw new customError(400, "Already friends");
        }
        if (!accepter.requests.includes(requesterId)) {
            throw new customError(400, "No request found");
        }

        let requester = await this.friendRepository.getOneByData({
            userId: requesterId
        });
        if (!requester) {
            requester = await this.createUser(requesterId);
        }

        // Delete Requester's request from accepter request list
        // Add Requester's id to accepter friend list
        // Add accepter's id to Requester friend list

        await this.friendRepository.deleteFriendRequest(
            requesterId,
            accepterId
        );
        await this.friendRepository.addToFriend(accepterId, requesterId);
        await this.friendRepository.addToFriend(requesterId, accepterId);
    }

    async removeFriend(user1Id, user2Id) {
        const user1 = await this.friendRepository.getOneByData({
            userId: user1Id
        });
        if (!user1) {
            throw new customError(400, "No friend found");
        }
        if (!user1.friends.includes(user2Id)) {
            throw new customError(400, "No such friend found");
        }

        await this.friendRepository.removeFriend(user1Id, user2Id);

        await this.friendRepository.removeFriend(user2Id, user1Id);
    }

    async getFriendList(userId) {
        return await this.friendRepository.getFriendList(userId);
    }

    async getFriendRequestList(userId) {
        return await this.friendRepository.getFriendRequestList(userId);
    }

    async areFriends(user1Id, user2Id) {
        return await this.friendRepository.areFriends(user1Id, user2Id);
    }

    async friendshipStatus(initiatorId, userId) {
        return await this.friendRepository.friendshipStatus(initiatorId, userId);
    }
}

export default FriendService;
