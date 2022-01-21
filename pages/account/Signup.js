import { useState } from 'react';
import Router from 'next/router';
import { useUser } from '../../lib/hooks';
import Form from '../../components/Form';

// TODO: add success message after signup
const Signup = () => {
    useUser({ redirectTo: '/Login', redirectIfFound: true });

    const [errorMsg, setErrorMsg] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        if (errorMsg) setErrorMsg('');

        const body = {
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
            timezone: e.currentTarget.timezone.value,
        };

        if (body.password !== e.currentTarget.rpassword.value) {
            setErrorMsg(`The passwords don't match`);
            return;
        }

        try {
            const res = await fetch('/api/account/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (res.status === 201) {
                Router.push('/account/Login');
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
                    Sign up
                </h1>
                <Form isLogin={false} errorMessage={errorMsg} onSubmit={handleSubmit} />
            </main>
        </div>
    );
};

export default Signup;
