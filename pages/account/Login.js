// login
import { useState } from 'react';
import Router from "next/router";
import { useRouter } from "next/router";
import { useUser } from '../../lib/hooks';
import Form from '../../components/Form';
import Loader from '../../components/Loader';

const Login = () => {
    useUser({ redirectTo: '/', redirectIfFound: true });

    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {
        query: { message },
    } = router;

    async function handleSubmit(e) {
        e.preventDefault();

        if (errorMsg) setErrorMsg('');

        const body = {
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
        };

        try {
            const res = await fetch('/api/account/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (res.status === 200) {
                setIsLoading(true);
                Router.push(`/account/Friends?userInfo=${body.username}`);
            } else {
                throw new Error(await res.text());
            }
        } catch (error) {
            console.error('An unexpected error happened occurred:', error);
            setErrorMsg(error.message);
        }
    }

    return (
        <div className="container">
            <main className="main">
                <h1>
                    Login
                </h1>
                {!isLoading ?
                    (<>
                        <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
                        {message && <p className="success_msg">{message}</p>}
                    </>
                    )
                    :
                    <Loader />
                }
            </main>
        </div>
    );
};

export default Login;

Login.getInitialProps = ({ query: { message } }) => {
    return { message };
};
