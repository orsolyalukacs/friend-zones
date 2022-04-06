// New Friend
import { useRef } from 'react';

const NewFriend = ({ user,
    data,
    error,
    marker,
    updated,
    setUpdated,
    setAddingFriend,
    setMarker,
    setAlertMsg
}) => {
    const hideAlertMsg = () => {
        setAlertMsg(null);
    };

    const nameInput = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newFriend = {
            _id: user._id,
            name: nameInput.current.value,
            coordinates: {
                latitude: marker.latitude,
                longitude: marker.longitude,
            },
            timezone: data.timezone,
            timezone_offset: data.timezone_offset,
        };

        try {
            fetch('/api/friends/create_friend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newFriend),
            }).then(() => {
                setUpdated(!updated);
                setAddingFriend(false);
                setMarker(null);
                setAlertMsg({ success: newFriend.name + ' was added!' });
                console.log('Friend added: ', newFriend);
                setTimeout(hideAlertMsg, 2000);
            });
        } catch (error) {
            setAlertMsg({ error: "Failed to add friend!" });
            console.log('Failed to add Friend', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="new-friend">
            <label>
                <div className="newFriendTitle">Friend&apos;s Name</div>
                <input
                    type="text"
                    minLength={2}
                    maxLength={50}
                    size={10}
                    ref={nameInput}
                    required
                ></input>
            </label>
            <p>Lat: {marker.latitude}</p>
            <p>Long: {marker.longitude}</p>
            {error && <p>Unable to get timezone info from coordinates</p>}
            <button className='popup' type="submit" value={'preventNewMarker'}>
                Add Friend
            </button>
        </form>
    );
};

export default NewFriend;
