import mongoose from 'mongoose'

const Schema = mongoose.Schema;


const postsSchema = mongoose.Schema({
    picUrl: String,
    bio: String,
    poster: { type: Schema.Types.ObjectId, ref: 'User'},
    likes: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
    time: {type: Date, default: Date.now}
})

export default mongoose.model("Post", postsSchema)