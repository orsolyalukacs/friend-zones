import { useState } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import cx from 'classnames';
import styles from '../styles/Home.module.css';

const UTC_OFFSETS = require('/data/timezones.json');

const Form = ({ formId, userForm, forNewUser = true }) => {
    const router = useRouter();
    const contentType = 'application/json';
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const [form, setForm] = useState({
        name: userForm.name,
        email: userForm.email,
        password: userForm.password,
        timezone: userForm.timezone,
    });

    // The PUT method edits an existing entry in the mongodb database.
    const putData = async (form) => {
        const { id } = router.query;

        try {
            const res = await fetch(`/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify(form),
            });

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status);
            }

            const { data } = await res.json();

            mutate(`/api/users/${id}`, data, false); // Update the local data without a revalidation
            router.push('/');
            // TODO: create a success pop-up message:  ('Successfully updated user')
        } catch (error) {
            setMessage('Failed to update user');
        }
    };

    // The POST method adds a new entry in the mongodb database.
    const postData = async (form) => {
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify(form),
            });

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status);
            }

            router.push('/');
            // TODO: create a success pop-up message: ('Successfully created new user')
        } catch (error) {
            setMessage('Failed to add user');
        }
    };

    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = formValidate();
        if (Object.keys(errs).length === 0) {
            forNewUser ? postData(form) : putData(form);
        } else {
            setErrors({ errs });
        }
    };

    // Makes sure user info is filled for username, email, password and timezones
    // TODO: confirm password match
    const formValidate = () => {
        let err = {};
        if (!form.name) err.name = 'Name is required';
        if (!form.email) err.email = 'Email is required'; // email validation is now at the server side (mongoose)
        if (!form.password) err.password = 'Password is required';
        if (!form.confirm_password) err.confirm_password = 'Confirm password is required';
        if (!form.timezone) err.timezone = 'Timezone is required';
        return err;
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.form_container}>
                    <h2 style={{ textAlign: "left" }}>Register</h2>
                    <p>Please fill in this form to create an account!</p>
                    <hr></hr>
                    <form id={formId} onSubmit={handleSubmit} className={styles.form}>
                        <label htmlFor="name">Name</label>
                        <input
                            className={cx(styles.form_input, styles.border)}
                            type="text"
                            maxLength="30"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            className={cx(styles.form_input, styles.border)}
                            type="text"
                            maxLength="40"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            className={cx(styles.form_input, styles.border)}
                            type="text"
                            maxLength="20"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="password">Confirm password</label>
                        <input
                            className={cx(styles.form_input, styles.border)}
                            type="text"
                            maxLength="20"
                            name="confirm_password"
                            value={form.confirm_passwors}
                            onChange={handleChange}
                            required
                        />
                        {/* TODO: 1. Get timezone information of user based on location
                                  2. Load timezones from an API or separate json file */}
                        <label htmlFor="timezone">Timezone</label>
                        <select
                            className={cx(styles.form_input, styles.border)}
                            type="text"
                            name="timezone"
                            value={form.timezone}
                            onChange={handleChange}
                            required>
                            <option value="">Select friend&apos;s timezone</option>
                            {UTC_OFFSETS.map((timezone_offset) => {
                                return <option key={timezone_offset} value={timezone_offset}>{timezone_offset}</option>;
                            })
                            }
                        </select>
                        <button
                            className={cx(styles.form_button, styles.border)}
                            type="submit">
                            Submit
                        </button>
                    </form>
                    <p>{message}</p>
                    <div>
                        {Object.keys(errors).map((err, index) => (
                            <li key={index}>{err}</li>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Form;