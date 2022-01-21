/* Creates friend endpoint to be used in POST request */
import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
    const { db, client } = await connectToDatabase();
    if (req.method === "POST") {
        const data = req.body;
        // If collection does not exist, it creates it!
        const friendsCollection = db.collection("friendsCollection");
        const result = await friendsCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({ message: "Data inserted successfully!" });
    }
}
