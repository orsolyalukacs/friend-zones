import styles from '../styles/Form.module.css';
import cx from 'classnames';
const UTC_OFFSETS = require('/data/timezones.json');

const EditUser = ({ errorMessage, onSubmit }) => (
    <div className={styles.container}>
        <form onSubmit={onSubmit}>
            <label>
                <span>Username</span>
                <input type="text" name="username" required />
            </label>
            <label>
                <span>Timezone</span>
                <select
                    className={cx(styles.form_input, styles.border)}
                    type="text"
                    name="timezone"
                    required>
                    <option value="">Select your timezone</option>
                    {UTC_OFFSETS.map((timezoneOffset) => {
                        return <option key={timezoneOffset} value={timezoneOffset}>{timezoneOffset}</option>;
                    })
                    }
                </select>
            </label>
            <div className={styles.submit}>
                <>
                    <button type="submit">Update</button>
                </>
            </div>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </form>
    </div >
);

export default EditUser;
