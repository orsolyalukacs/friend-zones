import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB

// Check if MongoDB URI exists in env.local
if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environmental variable')
}

// Check if MongoDB DB exists in env.local
if (!MONGODB_DB) {
    throw new Error('Define the MONGODB_DB environmental variable')
}

let cachedClient = null
let cachedDb = null

export async function connectToDatabase() {
    // check the cached.
    if (cachedClient && cachedDb) {
        // load from cache
        return {
            client: cachedClient,
            db: cachedDb,
        }
    }

    // Set the connection options
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    // Connect to cluster
    let client = new MongoClient(MONGODB_URI, opts)
    await client.connect()
    let db = client.db(MONGODB_DB)

    // Set cache to our instance so subsequent requests don't have to reconnect to cluster
    cachedClient = client
    cachedDb = db

    return {
        client: cachedClient,
        db: cachedDb,
    }
}