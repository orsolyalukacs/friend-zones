// friends
// Pull in timezones from a json file and display them:
// import
import styles from '../../styles/dashboard.module.css'
import AddFriend from '../../components/AddFriend';
import { useState, useEffect } from 'react';

const UTC_OFFSETS = require('/data/tznames.json');
const timeSettings = { hour: '2-digit', minute: '2-digit' };

function DisplayOffsets(props) {
    const offsets = props.offsets
    const friendList = props.friendList
    // Create zones of friends to check against
    const zones = []
    friendList.map((friend) => zones.push(friend.timezone));
    // Display offsets
    return (
        offsets.map((offset) =>
            <div className={styles.zones} key={offset.utc_offset}>
                {offset.utc_offset}
                <hr className={styles.line_break}></hr>
                {(zones.includes(offset.utc_offset)) ? new Date().toLocaleTimeString([], { timeZone: (offset.timezone), ...timeSettings }) : ''}
            </div>
        )
    );
}

function DisplayFriends(props) {
    // Take the friends object, and display friends on a card
    const friendList = props.friendList;
    return (
        <div className={styles.card}>
            <h3>Friend List</h3>
            {/*TODO: Ok to use friend_id? */}
            {friendList.map((friend) => {
                return <li key={friend._id}>{friend.name}: {friend.timezone}</li>
            })}
        </div>
    )
}

const Dashboard = () => {
    const [friendList, setFriendList] = useState([]);
    const [newFriend, setNewFriend] = useState(false);

    function handleClick() {
        // Use to refresh friend display
        setNewFriend(!newFriend);
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/get_friends');

            if (response.status != 200) {
                throw new Error('cannot fetch data');
            }
            const data = await response.json();
            return data;
        }
        fetchData()
          .then((data) => {
              console.log('resolved', data);
              setFriendList(data);
          })
          .catch((err) => {
              console.log('rejected', err.message);
          });

    }, [newFriend]);

    return (
        <div>
            <div>
                <h3>Dashboard</h3>
                <div className={styles.grid}>
                    <div className={styles.zone_container}>
                        <DisplayOffsets offsets={UTC_OFFSETS} friendList={friendList}></DisplayOffsets>
                    </div>
                </div>
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <AddFriend></AddFriend>
                        <button onClick={() => handleClick()}>Refresh Friends</button>
                    </div>
                    {friendList && <DisplayFriends friendList={friendList}></DisplayFriends>}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
