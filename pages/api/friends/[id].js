/*
   Connect to the db, and delete a user by id
   http://localhost:3000/api/friends/id
*/
import {connectToDatabase} from '../../../util/mongodb';

export default async function handler(req, res) {
  const objectId = require('mongodb').ObjectId;
  // get request information
  const {db} = await connectToDatabase();
  if (req.method === 'DELETE') {
    try {
      const id = req.query.id;
      const friendsCollection = db.collection('friendsCollection');
      const result = await friendsCollection.deleteOne({'_id': objectId(id)});
      if (!result) {
        return res.status(400).json({success: false});
      }
      res.status(201).json({message: 'Data removed successfully!'});
    } catch (error) {
      res.status(400).json({success: false});
    }
  }
}
