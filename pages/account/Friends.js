import { useState, useEffect } from 'react';
import styles from '../../styles/dashboard.module.css';

import AddFriend from '../../components/AddFriend';
import DisplayFriends from '../../components/DisplayFriends';
import DisplayOffsets from '../../components/DisplayOffsets';


const Friends = () => {
    const [friendList, setFriendList] = useState([]);
    const [newFriend, setNewFriend] = useState(false);
    const UTC_OFFSETS = require('/data/tznames.json');

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
        };
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
                <h3>Friends</h3>
                <div className={styles.grid}>
                    <div className={styles.zone_container}>
                        <DisplayOffsets offsets={UTC_OFFSETS} friendList={friendList}>
                        </DisplayOffsets>
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
};

export default Friends;
