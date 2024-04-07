import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const MONGOOSE_URL = process.env.MONGOOSE_URL;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

export { PORT, NODE_ENV, MONGOOSE_URL, USER_SERVICE_URL };
