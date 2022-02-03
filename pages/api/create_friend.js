/* Creates friend endpoint to be used in POST request */
import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
    const { db } = await connectToDatabase();
    const objectId = require('mongodb').ObjectId;

    if (req.method === "POST") {
        const usersCollection = db.collection("users");
        const result = await usersCollection.updateOne(
            { "_id": objectId(req.body._id) }, // Filter by user id
            {
                $push: {
                    friendsList:
                    {
                        "name": req.body.name,
                        "timezone": req.body.timezone,
                        // "coordinates": {
                        //     "latitude": req.body.latitude,
                        //     "longitude": req.body.longitude
                        // }
                    }

                },
            }, // Update with newly added friend to friendsList array
            {
                multi: true,
                upsert: true
            }
        );
        console.log(result);
        res.status(201).json({ message: "Data inserted successfully!" });
    }
}
