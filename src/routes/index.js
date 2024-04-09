import express from "express";
import { errorMiddleware } from "../errors/errorMiddlewares/index.js";
import {
    acceptRequest,
    areFriends,
    cancelOutgoingRequest,
    getFriendList,
    getFriendRequestList,
    isMyFriend,
    rejectIncomingRequest,
    sendRequest,
    unfriend
} from "../controllers/index.js";
import { asyncEventHandler } from "../errors/errorUtils/index.js";
import { verifyAccessToken } from "../middleware/index.js";

const router = express.Router();

router.post(
    "/send-request/:username",
    verifyAccessToken,
    asyncEventHandler(sendRequest)
);
router.post(
    "/cancel-outgoing-request/:username",
    verifyAccessToken,
    asyncEventHandler(cancelOutgoingRequest)
);
router.post(
    "/reject-incoming-request/:username",
    verifyAccessToken,
    asyncEventHandler(rejectIncomingRequest)
);
router.post(
    "/accept-request/:username",
    verifyAccessToken,
    asyncEventHandler(acceptRequest)
);
router.post(
    "/unfriend/:username",
    verifyAccessToken,
    asyncEventHandler(unfriend)
);
router.get(
    "/get-friend-list/:username",
    verifyAccessToken,
    asyncEventHandler(getFriendList)
);
router.get(
    "/get-friend-request-list/",
    verifyAccessToken,
    asyncEventHandler(getFriendRequestList)
);
router.get(
    "/is-my-friend/:username",
    verifyAccessToken,
    asyncEventHandler(isMyFriend)
);

router.get("/are-friends", asyncEventHandler(areFriends));

router.get("/ping", (req, res) => {
    res.send({ pong: "Hlo" });
});

router.use(errorMiddleware);

export default router;
