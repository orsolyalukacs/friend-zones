import styles from '../../styles/dashboard.module.css';

const UserInfo = ({ user }) => {
    return (
        <div className={styles.card}>
            <h3> User info </h3>
            <p><span className="bold">Username: </span> {JSON.parse(JSON.stringify(user.username))} </p>
            <p><span className="bold">Timezone: </span> {JSON.parse(JSON.stringify(user.timezone))} </p>
            {/* TODO: add updated at*/}
            <p><span className="bold">Created at: </span> <br></br>{JSON.parse(JSON.stringify(user.createdAt))} </p>
        </div>
    );
};

export default UserInfo;