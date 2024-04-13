import { asyncEventHandler } from "../errors/errorUtils/index.js";
import { getIdByUsername } from "../utils/index.js";

const getIDByUsernameMiddleware = asyncEventHandler(async (req, res, next) => {
    const username = req.params.username;
    const userId = await getIdByUsername(username);

    req.userId = userId;
    next();
});

export default getIDByUsernameMiddleware;
