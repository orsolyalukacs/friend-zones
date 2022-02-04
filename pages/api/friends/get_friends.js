/* Gets all users data from db
    http://localhost:3000/api/get_friends
*/
import { connectToDatabase } from "../../../util/mongodb";

export default async function friendsApi(req, res) {
    const { db } = await connectToDatabase();
    const username = req.query.userInfo;

    const friends = await db
        .collection("users")
        .find({ "username": username })
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray();
    res.json(friends);
}
