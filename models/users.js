import mongoose from 'mongoose'

const Schema = mongoose.Schema;


const usersSchema = mongoose.Schema({
    // Add the user id cuz it's coming from the firebase Auth
    username : String,
    email: String,
    urlPic: String,
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    peopleUserFoll: [{type: Schema.Types.ObjectId, ref: 'User'}],
    peopleFollUser : [{type: Schema.Types.ObjectId, ref: 'User'}],
    private: Boolean,
    asking: [{type: Schema.Types.ObjectId, ref: 'User'}],
    newLikes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    acceptingFrie: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

export default mongoose.model("User", usersSchema)