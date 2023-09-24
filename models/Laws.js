import mongoose from "mongoose";

const LawsSchema = new mongoose.Schema({
    senderId: {
        type: String
    },
    title: {
        type: String
    },
    desc: {
        type: String
    },
    text: {
        type: String
    },
    userName: {
        type: String
    },
    yesV: {
        type: Array,
        default: []
    },
    notV: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
})

export default mongoose.model('Laws', LawsSchema)