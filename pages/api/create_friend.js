/* Creates friend endpoint to be used in POST request */
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
    const { db } = await connectToDatabase();
    const objectId = ObjectId;

    if (req.method === "POST") {
        // If collection does not exist, it creates it!
        const usersCollection = db.collection("users");
        const result = await usersCollection.updateOne(
            { "_id": objectId(req.body._id) }, // Filter by user id
            {
                $push: {
                    friendsList:
                    {
                        "friend_id": ObjectId(),
                        "name": req.body.name,
                        "coordinates":
                            req.body.coordinates
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
