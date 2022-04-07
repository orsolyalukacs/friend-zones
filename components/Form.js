import Link from 'next/link';
import styles from '../styles/Form.module.css';
import cx from 'classnames';
const TIMEZONES = require('/data/tznames.json');

const Form = ({ isLogin, errorMessage, onSubmit }) => (
    <div className={styles.container}>
        <form onSubmit={onSubmit}>
            <label>
                <span>Username</span>
                <input type="text" name="username" required />
            </label>
            <label>
                <span>Password</span>
                <input type="password" name="password" required />
            </label>
            {!isLogin && (
                <>
                    <label>
                        <span>Confirm password</span>
                        <input type="password" name="rpassword" required />
                    </label>
                    <label>
                        <span>Time Zone</span>
                        <select
                            className={cx(styles.form_input, styles.border)}
                            type="text"
                            name="timezone"
                            required>
                            <option value="">Select your Time Zone</option>
                            {TIMEZONES.map((item) => {
                                return <option key={item.utc_offset}>(GMT{item.utc_offset}) {item.timezone} </option>;
                            })
                            }
                        </select>
                    </label>
                </>

            )}

            <div className={styles.submit}>
                {isLogin ? (
                    <>
                        <Link href="/account/Signup">
                            <a>I don&apos;t have an account</a>
                        </Link>
                        <button type="submit">Login</button>
                    </>
                ) : (
                    <>
                        <Link href="/account/Login">
                            <a>I already have an account</a>
                        </Link>
                        <button type="submit">Signup</button>
                    </>
                )}
            </div>

            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </form>
    </div>
);

export default Form;
