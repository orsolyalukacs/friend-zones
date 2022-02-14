import { connectToDatabase } from "../util/mongodb";
import styles from '../styles/Home.module.css';

export default function Users({ users }) {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Users</h1>
            <ul className={styles.user_list}>
                {users.map((user, i) => (
                    <li key={i}>
                        <h2>{user.name}</h2>
                        <h3>{user.email}</h3>
                        <p>timezone: {user.timezone}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export async function getServerSideProps() {
    const { db } = await connectToDatabase();
    const users = await db
        .collection("users")
        .find({})
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray();
    return {
        props: {
            users: JSON.parse(JSON.stringify(users)),
        },
    };
}