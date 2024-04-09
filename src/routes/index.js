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
import { getIDByUsernameMiddleware, verifyAccessToken } from "../middleware/index.js";

const router = express.Router();

router.get("/are-friends", asyncEventHandler(areFriends));

router.get("/ping", (req, res) => {
    res.send({ pong: "Hlo" });
});

router.use(verifyAccessToken);

router.get(
    "/get-friend-request-list/",
    asyncEventHandler(getFriendRequestList)
);

router.post(
    "/send-request/:username",
    getIDByUsernameMiddleware,
    asyncEventHandler(sendRequest)
);
router.post(
    "/cancel-outgoing-request/:username",
    getIDByUsernameMiddleware,
    asyncEventHandler(cancelOutgoingRequest)
);
router.post(
    "/reject-incoming-request/:username",
    getIDByUsernameMiddleware,
    asyncEventHandler(rejectIncomingRequest)
);
router.post(
    "/accept-request/:username",
    getIDByUsernameMiddleware,
    asyncEventHandler(acceptRequest)
);
router.post(
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
