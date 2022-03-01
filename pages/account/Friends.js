import { useEffect, useState } from 'react';
import { getFriendList } from '../../util/services';
import { useUser } from '../../lib/hooks';
import FriendCard from '../../components/FriendCard';

const Friends = () => {

    const [friendList, setFriendList] = useState([]);
    const user = useUser();

    const userInfo = user.username;

    useEffect(() => {
        getFriendList(userInfo)
            .then((data) => {
                console.log('resolved', data);
                setFriendList(data[0].friendsList);
            })
            .catch((err) => {
                console.log('rejected', err.message);
            });
    }, [userInfo]);

    return (
        <main className="main">
            <div className="grid">
                {friendList &&
                    friendList.map((friend) => (
                        <FriendCard
                            friend={friend}
                            key={friend.friend_id}
                        ></FriendCard>
                    ))
                }
            </div>
        </main>

    );
};

export default Friends;
