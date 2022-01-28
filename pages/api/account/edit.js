// edit user info
import { connectToDatabase } from '../../../util/mongodb';

export default async function edit(req, res) {
    const objectId = require('mongodb').ObjectId;
    const { db } = await connectToDatabase();
    try {
        if (req.method === "PUT") {
            const usersCollection = db.collection("users");
            const result = await usersCollection.updateOne(
                { "_id": objectId(req.body._id) }, // Filter
                {
                    $set: {
                        "username": req.body.username,
                        "timezone": req.body.timezone
                    }
                }, // Update
                { upsert: false }
            );
            console.log(result);
            res.status(201).json({ message: "Data updated successfully!" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).end(error.message);
    }
}
