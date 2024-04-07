import mongoose from "mongoose";

const friendSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        requests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    { timestamps: true }
);

const Friend = mongoose.model("Friend", friendSchema);

export default Friend;
