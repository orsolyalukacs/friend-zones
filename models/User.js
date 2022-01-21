import mongoose from 'mongoose'

/* UserSchema will correspond to a collection in the MongoDB database. */
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for user'],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true,
        maxlength: [30, 'Name cannot be more than 30 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address for user'],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
        maxlength: [40, 'Email address cannot be more than 40 characters'],
    },
    // TODO: hash password and validate password
    password: {
        type: String,
        required: [true, 'Please type a password'],
        maxlength: [20, 'Password cannot be longer than 20 characters'],
    },
    // TODO: find out how to store timezone in MongoDB database
    timezone: {
        type: String, // stores timezone as timezone :"-5"
        required: [true, 'Timezone cannit be empty'],
    },
}, 
    // creates a createdAt and updatedAt field on our models that contain timestamps which will get automatically updated when our model changes
    { timestamps: true })

// register schema with mongoose
export default mongoose.models.User || mongoose.model('User', UserSchema)