//  FriendInfo for Popup
const FriendInfo = ({
    friend,
    user,
    updated,
    setUpdated,
    setSelectedFriend,
    setAlertMsg,
    setErrorMsg
}) => {
    const hideAlertMsg = () => {
        setAlertMsg(null);
    };

    const handleDelete = (e) => {
        // connects to db, and deletes friend based on id
        e.preventDefault();
        const id = e.target.value;

        try {
            fetch(`/api/friends/${id}?userInfo=${user.username}`, {
                method: 'DELETE',
            });
            console.log('Friend deleted');
            setAlertMsg(friend.properties.name + ' was removed');
            setTimeout(hideAlertMsg, 2000);
            setUpdated(!updated);
            setSelectedFriend(null);
        } catch (error) {
            console.log('Failed to delete friend', error);
            setAlertMsg(null);
            setErrorMsg('Failed to delete friend!');
        }
    };

    return (
        <form>
            <h4>{friend.properties.name}</h4>
            <p>
                {new Date().toLocaleTimeString([], {
                    timeZone: friend.properties.timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </p>
            <button className="popup" onClick={handleDelete} value={friend.properties.friendId}>
                Delete Friend
            </button>
        </form>
    );
};

export default FriendInfo;
