import express from "express";
import axios from "axios";
import router from "./routes/index.js";
import { PORT } from "./config/index.js";
import { connectWithDB } from "./utils/index.js";

const app = express();
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

app.use("/", router);

const server = app.listen(PORT, async () => {
    console.log("Listening on port: ", PORT);
    axios.defaults.validateStatus = () => {
        return true;
    };
    connectWithDB().catch(() => {
        console.log("Error connecting MongoDB");
    });
});

process.on("unhandledRejection", (err) => {
    console.log(`Unhandled rejection ${err.name} occurred`);
    server.close(() => {
        process.exit(1);
    });
});
