import express from "express";
import { errorMiddleware } from "../errors/errorMiddlewares/index.js";
import {
    acceptRequest,
    areFriends,
    cancelOutgoingRequest,
    friendshipStatus,
    getFriendList,
    getFriendRequestList,
    getMyFriendList,
    isMyFriend,
    rejectIncomingRequest,
    sendRequest,
    unfriend
} from "../controllers/index.js";
import { asyncEventHandler } from "../errors/errorUtils/index.js";
import { verifyAccessToken } from "../middleware/index.js";

const router = express.Router();

router.get("/ping", (_, res) => {
    res.send({ pong: "Hlo" });
});

router.get("/are-friends", asyncEventHandler(areFriends));

router.use(verifyAccessToken);
// Write all the routes which requires Access Token Below this

router.get(
    "/get-friend-request-list/",
    asyncEventHandler(getFriendRequestList)
);

router.patch("/send-request/:userId", asyncEventHandler(sendRequest));
router.delete(
    "/cancel-outgoing-request/:userId",
    asyncEventHandler(cancelOutgoingRequest)
);
router.delete(
    "/reject-incoming-request/:userId",
    asyncEventHandler(rejectIncomingRequest)
);
router.patch("/accept-request/:userId", asyncEventHandler(acceptRequest));
router.delete("/unfriend/:userId", asyncEventHandler(unfriend));

router.get("/get-my-friend-list", asyncEventHandler(getMyFriendList));

router.get("/get-friend-list/:userId", asyncEventHandler(getFriendList));

router.get("/is-my-friend/:userId", asyncEventHandler(isMyFriend));

router.get("/friendship-status/:userId", asyncEventHandler(friendshipStatus));

router.use(errorMiddleware);

export default router;
