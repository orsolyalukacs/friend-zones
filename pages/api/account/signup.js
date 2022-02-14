import { createUser } from '../../../lib/user';
import { connectToDatabase } from '../../../util/mongodb';

export default async function signup(req, res) {
    const { db } = await connectToDatabase();
    try {
        if (req.method === "POST") {
            const data = await createUser(req.body);
            const usersCollection = db.collection("users");
            const result = await usersCollection.insertOne(data);
            console.log(result);
            res.status(201).json({ message: "Data inserted successfully!" });
        }
    }

    // try {
    //     await createUser(req.body)
    //     res.status(200).send({ done: true })
    // }
    catch (error) {
        console.error(error);
        res.status(500).end(error.message);
    }
}
