function DisplayFriends({ friendList }) {
    // Take the friends object, and display friends on a card

    function deleteFriend(e) {
        const target = e.target;
        const id = target.parentNode.getAttribute('id');
        console.log(id);
        // const { id } = router.query  // add the id to router object

        // Send a delete request to /api/delete_friend/id
        fetch('/api/friends/' + id, {
            method: 'DELETE',
        }).then(() => alert('Friend Deleted'));
    }

    return (
        <div className="card">
            <h3>Friend List</h3>
            {/* TODO: Ok to use friend_id? */}
            {friendList.map((friend) => {
                return (
                    <li key={friend._id} id={friend._id}>
                        {friend.name}: {friend.timezone}
                        <button onClick={deleteFriend}>Delete</button>
                    </li>
                );
            })}
        </div>
    );
}

export default DisplayFriends;
