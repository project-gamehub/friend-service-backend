import { customError } from "../errors/errorUtils/index.js";
import FriendRepository from "../repository/friendRepository.js";

class FriendService {
    constructor() {
        this.friendRepository = new FriendRepository();
    }

    async createUser(receiverId) {
        const user = await this.friendRepository.create(receiverId);
        return user;
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

    async cancelRequest(cancellerId, cancelRequestOfId) {
        const canceller = await this.friendRepository.getOneByData({
            userId: cancellerId
        });
        if (!canceller) {
            throw new customError(400, "No request found");
        } else {
            if (canceller.friends.includes(cancelRequestOfId)) {
                throw new customError(400, "You are friends");
            }
            if (!canceller.requests.includes(cancelRequestOfId)) {
                throw new customError(400, "No request found");
            }
        }
        const response = await this.friendRepository.deleteFriendRequest(
            cancellerId,
            cancelRequestOfId
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
            accepterId,
            requesterId
        );
        await this.friendRepository.addToFriend(accepterId, requesterId);
        await this.friendRepository.addToFriend(requesterId, accepterId);
    }
}

export default FriendService;
