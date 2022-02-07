import { useState } from 'react';
import cx from 'classnames';
import styles from '../styles/Home.module.css';

const UTC_OFFSETS = require('/data/timezones.json');

const AddFriend = ({ user }) => {
    const contentType = 'application/json';
    const [errors, setErrors] = useState({});  // For form validation issues
    const [message, setMessage] = useState("");  // For db issues
    const [form, setForm] = useState(
        {
            _id: user._id,
            name: "",
            timezone: ""
        }
    );

    // Add data to the db:
    const postData = async (form) => {
        try {
            const res = await fetch('/api/create_friend', {
                method: 'POST',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify(form),
            });
            // Throw error is API fetch request functionalities
            if (!res.ok) {
                throw new Error(res.status);
            }
            alert('Friend Added!');
        } catch (error) {
            console.log(error);
            setMessage('Failed to add friend');
        }
    };

    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        setForm({
            ...form,
            [name]: value,
        }
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = formValidate();
        if (Object.keys(errs).length === 0) {
            // TODO: Change to update db and clock
            console.log(`Form accepted: ${form.name} ${form.timezone}`);
            postData(form);
        } else {
            setErrors({ errs });
        }
    };

    const formValidate = () => {
        const err = {};
        if (!form.name) err.name = 'Name is required';
        if (!form.timezone) err.timezone = 'Timezone is required';
        return err;
    };

    return (
        <div className={styles.form_container}>
            <h3>Add Friends</h3>
            <hr></hr>
            <form className={styles.form} onSubmit={handleSubmit}>
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
                <label htmlFor="timezone">Timezone</label>
                <select
                    className={cx(styles.form_input, styles.border)}
                    type="text"
                    name="timezone"
                    value={form.timezone}
                    onChange={handleChange}
                    required>
                    <option value="">Select friend&apos;s timezone</option>
                    {UTC_OFFSETS.map((timezoneOffset) => {
                        return <option key={timezoneOffset} value={timezoneOffset}>{timezoneOffset}</option>;
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
    );
};

export default AddFriend;
