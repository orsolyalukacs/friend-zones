// New Friend
import { useRef } from "react";

const NewFriend = (props) => {
    // Consts
    const nameInput = useRef(null);
    const marker = props.marker;

    // Functions
    const handleSubmit = (e) => {
        e.preventDefault();
        // Create the newFriend object
        const newFriend = {
            _id: props.user._id,
            name: nameInput.current.value,
            coordinates: {
                "latitude": marker.latitude,
                "longitude": marker.longitude
            }
        };

        // TODO: fetch timezone api info to add before posting
        // POST data to db
        try {
            fetch('/api/friends/create_friend', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newFriend)
            }).then(() => {
                alert(newFriend.name + ' was added!');
                console.log('Friend added: ', newFriend);
                props.setUpdated(!(props.updated));
                props.setAddingFriend(false);
            });
        } catch (error) {
            console.log('Failed to add Friend', error);
        };
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <span>Friend&apos;s Name</span>
                <hr></hr>
                <input
                    type="text"
                    name="name"
                    maxLength={15}
                    size={10}
                    ref={nameInput}>
                </input>
            </label>
            <p>Lat: {marker.latitude}</p>
            <p>Long: {marker.longitude}</p>
            <button type="submit">Add Friend</button>
        </form>
    );
};

export default NewFriend;
