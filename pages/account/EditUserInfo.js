import { useState } from 'react';
import Router from 'next/router';
import { useUser } from '../../lib/hooks';
import EditUser from '../../components/EditUser';

// TODO: add success message after edit
const EditUserInfo = () => {
    const user = useUser();

    const [errorMsg, setErrorMsg] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        if (errorMsg) setErrorMsg('');

        const body = {
            _id: user._id,
            username: e.currentTarget.username.value,
            timezone: e.currentTarget.timezone.value,
        };

        try {
            const res = await fetch('/api/account/edit', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (res.status === 201) {
                Router.push('/account/UserPage');
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
                    Edit User Info
                </h1>
                <EditUser errorMessage={errorMsg} onSubmit={handleSubmit} />
            </main>
        </div>
    );
};

export default EditUserInfo;
