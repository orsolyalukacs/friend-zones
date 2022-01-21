/*
   Connect to the db, and delete a user by id
   http://localhost:3000/api/friends/id
*/
import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req, res) {
    const ObjectId = require('mongodb').ObjectId;
    // get request information
    const { db } = await connectToDatabase();
    if (req.method === "DELETE") {
        // Get the data from the request
        const id = req.query.id;
        console.log('Data is: ', req.query.id);
        const friendsCollection = db.collection('friendsCollection');
        // Will it get id from request?
        // May need some error handling
        const result = await friendsCollection.deleteOne({"_id": ObjectId(id)})
        console.log(result);
        res.status(201).json({ message: "Data removed successfully!" });
    }
}
