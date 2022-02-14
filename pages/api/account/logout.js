import { removeTokenCookie } from '../../../lib/auth-cookies';
import { connectToDatabase } from '../../../util/mongodb';

export default async function logout(req, res) {
    const { client } = await connectToDatabase();
    removeTokenCookie(res);
    res.writeHead(302, { Location: '/' });
    res.end();

    // client.close();
}
