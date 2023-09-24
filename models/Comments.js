import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    comment: {
        type: Array,
        default: [
            {
                text: String,
                userId: String
            }
            ]
    },
    lawsId: {
      type: String,
    }
}, {
    timestamps: true,
})

export default mongoose.model('Comment', CommentSchema)