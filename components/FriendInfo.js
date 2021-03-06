//  FriendInfo for Popup
const FriendInfo = ({
    friend,
    user,
    updated,
    setUpdated,
    setSelectedFriend,
    setAlertMsg,
    setMarker
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
            }).then(() => {
                setUpdated(!updated);
                setSelectedFriend(null);
                setMarker(null);
                setAlertMsg({ success: friend.properties.name + ' was removed' });
                console.log('Friend deleted');
                setTimeout(hideAlertMsg, 2000);
            });
        } catch (error) {
            setAlertMsg({ error: 'Failed to delete friend!' });
            console.log('Failed to delete friend', error);
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
