import express from "express";
import { errorMiddleware } from "../errors/errorMiddlewares/index.js";
import {
    acceptRequest,
    cancelOutgoingRequest,
    rejectIncomingRequest,
    sendRequest
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

router.get("/ping", (req, res) => {
    res.send({ pong: "Hlo" });
});

router.use(errorMiddleware);

export default router;
