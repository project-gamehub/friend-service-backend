import mongoose from "mongoose";

const friendSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true
        },
        requests: [
            {
                type: mongoose.Schema.Types.ObjectId
            }
        ],
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId
            }
        ]
    },
    { timestamps: true }
);

const Friend = mongoose.model("Friend", friendSchema);

export default Friend;
