// friends
// Pull in timezones from a json file and display them:
// import
import styles from '../../styles/dashboard.module.css'
import AddFriend from '../../components/AddFriend';
import { connectToDatabase } from '../../util/mongodb';
import { useState } from 'react';

const UTC_OFFSETS = require('/data/timezones.json');
const timeSettings = { hour: '2-digit', minute: '2-digit' };

function DisplayOffsets(props) {
    const offsets = props.offsets
    // Display offsets
    return (
        offsets.map((offset) =>
            <div className={styles.zones} key={offset}>
                {offset}
                <hr className={styles.line_break}></hr>
                {/*TODO: Check this against friend functionalities not magic number +02:00*/}
                {(offset === '+02:00') ? new Date().toLocaleTimeString([], { ...timeSettings }) : ''}
            </div>
        )
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

function DisplayFriends(props) {
    // Take the friends object, and display friends on a card
    const friends = props.friends;
    return (
        <div className={styles.card}>
            <h3>Friends List</h3>
            {/*TODO: Ok to use friend_id? */}
            {friends.map((friend) => {
                return <li key={friend._id}>{friend.name}: {friend.timezone}</li>
            })}
        </div>
    )
}

const Dashboard = ({ friends }) => {
    const [friendsList, setFriendsList] = useState([friends])
    return (
        <div>
            <div>
                <h3>Dashboard</h3>
                <div className={styles.grid}>
                    <div className={styles.zone_container}>
                        <DisplayOffsets offsets={UTC_OFFSETS}></DisplayOffsets>
                    </div>
                </div>
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <AddFriend></AddFriend>
                    </div>
                    <DisplayFriends friends={friends}></DisplayFriends>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
