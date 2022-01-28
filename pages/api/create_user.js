/* Creates user endpoint at api/create_user */
import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
    const { db, client } = await connectToDatabase();
    if (req.method === "POST") {
        const data = req.body;
        const usersCollection = db.collection("usersCollection");
        const result = await usersCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({ message: "Data inserted successfully!" });
    }
}
