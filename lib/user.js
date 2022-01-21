import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { connectToDatabase } from '../util/mongodb';
/**
 * User methods
 */

export async function createUser({ username, password, timezone }) {
    // Creates the user and saves the salt and hashed password
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex');
    return { id: uuidv4(), createdAt: Date.now(), username, timezone, hash, salt };
}

// Lookup for the user in your DB
export async function findUser({ username }) {
    const { db } = await connectToDatabase();
    const collection = db.collection('users');
    return collection.findOne({ username: username });
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
    const inputHash = crypto
        .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
        .toString('hex');
    return user.hash === inputHash;
}
