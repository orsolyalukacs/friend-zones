import { useUser } from '../../lib/hooks';
import UserInfo from './UserInfo';

const Dashboard = () => {
    const user = useUser();
    return (
        <main className="main">
            <h1> Dashboard</h1>
            {/* TODO: display map and friends timezones */}
            {user ?
                (
                    <UserInfo user={user} />
                ) : (
                    <><p>You are not logged in</p></>
                )
            }
        </main>
    );
};

export default Dashboard;