import express from "express";
import { errorMiddleware } from "../errors/errorMiddlewares/index.js";
import {
    acceptRequest,
    cancelRequest,
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
    "/cancel-request/:username",
    verifyAccessToken,
    asyncEventHandler(cancelRequest)
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
