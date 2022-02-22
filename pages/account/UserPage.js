import { useUser } from '../../lib/hooks';
import UserInfo from '../../components/UserInfo';
import Link from 'next/link';

const UserPage = () => {
    const user = useUser();
    return (
        <main className="main">
            <h1> User Info </h1>
            {user ?
                (
                    <Link href="/account/EditUserInfo">
                        <a>
                            <UserInfo user={user} />
                        </a>
                    </Link>

                ) : (
                    <><p>You are not logged in</p></>
                )
            }
        </main>
    );
};

export default UserPage;