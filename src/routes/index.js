import express from "express";
import { errorMiddleware } from "../errors/errorMiddlewares/index.js";
import {
    acceptRequest,
    areFriends,
    cancelOutgoingRequest,
    friendshipStatus,
    getFriendList,
    getFriendRequestList,
    isMyFriend,
    rejectIncomingRequest,
    sendRequest,
    unfriend
} from "../controllers/index.js";
import { asyncEventHandler } from "../errors/errorUtils/index.js";
import {
    getIDByUsernameMiddleware,
    verifyAccessToken
} from "../middleware/index.js";

const router = express.Router();

router.get("/ping", (req, res) => {
    res.send({ pong: "Hlo" });
});

router.get("/are-friends", asyncEventHandler(areFriends));

router.use(verifyAccessToken);
// Write all the routes which requires Access Token Below this

router.get(
    "/get-friend-request-list/",
    asyncEventHandler(getFriendRequestList)
);

router.patch(
    "/send-request/:username",
    getIDByUsernameMiddleware,
    asyncEventHandler(sendRequest)
);
router.delete(
    "/cancel-outgoing-request/:username",
    getIDByUsernameMiddleware,
    asyncEventHandler(cancelOutgoingRequest)
);
router.delete(
    "/reject-incoming-request/:username",
    getIDByUsernameMiddleware,
    asyncEventHandler(rejectIncomingRequest)
);
router.patch(
    "/accept-request/:username",
    getIDByUsernameMiddleware,
    asyncEventHandler(acceptRequest)
);
router.delete(
    "/unfriend/:username",
    getIDByUsernameMiddleware,
    asyncEventHandler(unfriend)
);
router.get(
    "/get-friend-list/:username",
    getIDByUsernameMiddleware,
    asyncEventHandler(getFriendList)
);
router.get(
    "/is-my-friend/:username",
    getIDByUsernameMiddleware,
    asyncEventHandler(isMyFriend)
);

router.get(
    "/friendship-status/:username",
    getIDByUsernameMiddleware,
    asyncEventHandler(friendshipStatus)
);

router.use(errorMiddleware);

export default router;
