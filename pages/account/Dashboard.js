import { useUser } from '../../lib/hooks';
import UserInfo from '../../components/UserInfo';
import Link from 'next/link';

const Dashboard = () => {
    const user = useUser();
    return (
        <main className="main">
            <h1> Dashboard</h1>
            {user ?
                (
                    <Link href="/account/EditUserInfo">
                        <a>
                            <UserInfo user={user} />
                        </a>
                    </Link>

                ) : (
                    <><p className="error">Loading...</p></>
                )
            }
        </main>
    );
};

export default Dashboard;