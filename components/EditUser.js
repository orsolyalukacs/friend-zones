import styles from '../styles/Form.module.css';
import cx from 'classnames';
const TIMEZONES = require('/data/tznames.json');

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
                    {TIMEZONES.map((item) => {
                        return <option key={item.utc_offset}>(GMT{item.utc_offset}) {item.timezone} </option>;
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
