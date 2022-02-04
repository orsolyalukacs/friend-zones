/*
   Connect to the db, and delete a user by id
   http://localhost:3000/api/friends/id
*/
import { connectToDatabase } from '../../../util/mongodb';
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  // get request information
  const { db } = await connectToDatabase();

  const objectId = ObjectId;
  if (req.method === 'DELETE') {
    try {
      const id = req.query.id;
      const username = req.query.userInfo;
      const usersCollection = db.collection('users');
      const result = await usersCollection.updateOne({ "username": username },
        { $pull: { "friendsList": { "friend_id": objectId(id) } } }
      );
      if (!result) {
        return res.status(400).json({ success: false });
      }
      res.status(201).json({ message: 'Data removed successfully!' });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
