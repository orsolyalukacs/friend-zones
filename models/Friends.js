import mongoose from 'mongoose'

/*Temporary schema to test friend adding functionalities. */
const FriendSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide friend's name"],

    },
    timezone: {
        type: String, // stores timezone as timezone :"-5"
        required: [true, 'Timezone cannot be empty'],
    }
});

// register/compile schema with mongoose
export default mongoose.models.Friends || mongoose.model('Friend', FriendSchema)
