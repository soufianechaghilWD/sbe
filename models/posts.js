import mongoose from 'mongoose'

const Schema = mongoose.Schema;


const postsSchema = mongoose.Schema({
    picUrl: String,
    poster: { type: Schema.Types.ObjectId, ref: 'User'},
    likes: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}]
})

export default mongoose.model("Post", postsSchema)