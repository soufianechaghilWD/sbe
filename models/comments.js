import mongoose from 'mongoose'

const Schema = mongoose.Schema;


const commentsSchema = mongoose.Schema({
    comment: String,
    commenter: { type: Schema.Types.ObjectId, ref: 'User'}
})
export default mongoose.model("Comment", commentsSchema)