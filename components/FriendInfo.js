//  FriendInfo for Popup
const FriendInfo = (props) => {
    const friend = props.friend;

    const handleDelete = (e) => {
        // connects to db, and deletes friend based on id
        e.preventDefault();
        const id = e.target.value;
        try {
            fetch(`/api/friends/${id}`, {
                method: 'DELETE'
            });
            console.log('Friend deleted');
            props.setUpdated(!(props.updated));
            props.setSelectedFriend(null);
        } catch (error) {
            console.log('Failed to delete friend', error);
        }
    };

    return (
        <form>
            <h4>{friend.name}</h4>
            <button onClick={handleDelete} value={friend._id}>Delete Friend</button>
        </form>
    );
};

export default FriendInfo;
