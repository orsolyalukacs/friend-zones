// login
import { useState } from 'react';
import Router from 'next/router';
import { useUser } from '../../lib/hooks';
import Form from '../../components/Form';
import styles from '../../styles/Home.module.css';

const Login = () => {
    useUser({ redirectTo: '/', redirectIfFound: true });

    const [errorMsg, setErrorMsg] = useState('');

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
                Router.push('/account/Dashboard');
            } else {
                throw new Error(await res.text());
            }
        } catch (error) {
            console.error('An unexpected error happened occurred:', error);
            setErrorMsg(error.message);
        }
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>
                    Login
                </h1>
                <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
            </main>
        </div>
    );
};

export default Login;