const UserInfo = ({ user }) => {
    const date = JSON.parse(JSON.stringify(user.createdAt));
    const d = new Date(date).toLocaleString('en-US');

    return (
        <div className="card">
            <p><span className="bold">Username: </span> {JSON.parse(JSON.stringify(user.username))} </p>
            <p><span className="bold">Timezone: </span> {JSON.parse(JSON.stringify(user.timezone))} </p>
            {/* TODO: add updated at*/}
            <p><span className="bold">Created at: </span>{d}</p>
        </div>
    );
};

export default UserInfo;