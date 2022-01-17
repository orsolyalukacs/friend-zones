/* Gets all users data from db
    http://localhost:3000/api/get_friends
*/
import { connectToDatabase } from "../../util/mongodb";
export default async function usersApi(req, res) {
    const { db } = await connectToDatabase();
    const users = await db
        .collection("friendsCollection")
        .find({})
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray();
    res.json(users);
}
