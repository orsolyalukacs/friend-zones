import { useUser } from '../../lib/hooks';
import UserInfo from '../../components/UserInfo';
import Link from 'next/link';

const Dashboard = () => {
    const user = useUser();
    return (
        <main className="main">
            <h1> Dashboard</h1>
            {/* TODO: display map and friends timezones */}
            {user ?
                (
                    <Link href="/account/EditUserInfo">
                        <a>
                            <UserInfo user={user} />
                        </a>
                    </Link>

                ) : (
                    <><p className="error">You are not logged in</p></>
                )
            }
        </main>
    );
};

export default Dashboard;