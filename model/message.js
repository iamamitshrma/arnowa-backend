import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

export default mongoose.model("Message", messageSchema);