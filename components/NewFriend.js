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
    setAlertMsg,
    setErrorMsg
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
                setAlertMsg(newFriend.name + ' was added!');
                setTimeout(hideAlertMsg, 2000);
                console.log('Friend added: ', newFriend);
                setUpdated(!updated);
                setAddingFriend(false);
                setMarker(null);
            });
        } catch (error) {
            console.log('Failed to add Friend', error);
            setAlertMsg(null);
            setErrorMsg('Failed to add friend!');
        }
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
                    ref={nameInput}
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
