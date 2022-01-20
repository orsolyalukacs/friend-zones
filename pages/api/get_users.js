/** Gets all users data from db
 * http://localhost:3000/api/users/users
*/

import { connectToDatabase } from "../../util/mongodb";

export default async function usersApi(res) {
    const { db } = await connectToDatabase();
    const users = await db
        .collection("users")
        .find({})
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray();
    res.json(users);
}