import styles from '../styles/Home.module.css';
import { connectToDatabase } from '../util/mongodb';


function Friends({ friends }) {
    console.log(friends)
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Friends List</h1>
            <ul>
                {friends.map((friend, i) => (
                    <li key={i}>
                        <h2>{friend.name}</h2>
                        <h3>Timezone: {friend.timezone}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase();
    const friends = await db
        .collection("friendsCollection")
        .find({})
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray();
    return {
        props: {
            friends: JSON.parse(JSON.stringify(friends)),
        },
    };
}

export default Friends;