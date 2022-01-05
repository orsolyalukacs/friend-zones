import { useState } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import cx from 'classnames';
import styles from '../styles/Home.module.css';

const Form = ({ formId, userForm, forNewUser = true }) => {
    const router = useRouter()
    const contentType = 'application/json'
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('');

    const [form, setForm] = useState({
        name: userForm.name,
        owner_name: userForm.owner_name,
        species: userForm.species,
        age: userForm.age,
    })

    // The PUT method edits an existing entry in the mongodb database.
    const putData = async (form) => {
        const { id } = router.query

        try {
            const res = await fetch(`/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify(form),
            })

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status)
            }

            const { data } = await res.json()

            mutate(`/api/users/${id}`, data, false) // Update the local data without a revalidation
            router.push('/')
            // TODO: create a success pop-up message:  ('Successfully updated user')
        } catch (error) {
            setMessage('Failed to update user')
        }
    }

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
            })

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status)
            }

            router.push('/')
            // TODO: create a success pop-up message: ('Successfully created new user')
        } catch (error) {
            setMessage('Failed to add user')
        }
    }

    const handleChange = (e) => {
        const target = e.target
        const value = target.value
        const name = target.name

        setForm({
            ...form,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = formValidate()
        if (Object.keys(errs).length === 0) {
            forNewUser ? postData(form) : putData(form)
        } else {
            setErrors({ errs })
        }
    }

    // Makes sure user info is filled for username, email, password and timezones
    // TODO: confirm password match
    const formValidate = () => {
        let err = {}
        if (!form.name) err.name = 'Name is required'
        if (!form.email) err.email = 'Email is required' // email validation is now at the server side (mongoose)
        if (!form.password) err.password = 'Password is required'
        if (!form.confirm_password) err.confirm_password = 'Confirm password is required'
        if (!form.timezone) err.timezone = 'Timezone is required'
        return err
    }

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
                                <option value="">--Please choose your timezone--</option>
                                <option timezoneid="1" gmtadjustment="GMT-12:00" usedaylighttime="0" value="-12">(GMT-12:00) International Date Line West</option>
                                <option timezoneid="2" gmtadjustment="GMT-11:00" usedaylighttime="0" value="-11">(GMT-11:00) Midway Island, Samoa</option>
                                <option timezoneid="3" gmtadjustment="GMT-10:00" usedaylighttime="0" value="-10">(GMT-10:00) Hawaii</option>
                                <option timezoneid="4" gmtadjustment="GMT-09:00" usedaylighttime="1" value="-9">(GMT-09:00) Alaska</option>
                                <option timezoneid="5" gmtadjustment="GMT-08:00" usedaylighttime="1" value="-8">(GMT-08:00) Pacific Time (US & Canada)</option>
                                <option timezoneid="6" gmtadjustment="GMT-08:00" usedaylighttime="1" value="-8">(GMT-08:00) Tijuana, Baja California</option>
                                <option timezoneid="7" gmtadjustment="GMT-07:00" usedaylighttime="0" value="-7">(GMT-07:00) Arizona</option>
                                <option timezoneid="8" gmtadjustment="GMT-07:00" usedaylighttime="1" value="-7">(GMT-07:00) Chihuahua, La Paz, Mazatlan</option>
                                <option timezoneid="9" gmtadjustment="GMT-07:00" usedaylighttime="1" value="-7">(GMT-07:00) Mountain Time (US & Canada)</option>
                                <option timezoneid="10" gmtadjustment="GMT-06:00" usedaylighttime="0" value="-6">(GMT-06:00) Central America</option>
                                <option timezoneid="11" gmtadjustment="GMT-06:00" usedaylighttime="1" value="-6">(GMT-06:00) Central Time (US & Canada)</option>
                                <option timezoneid="12" gmtadjustment="GMT-06:00" usedaylighttime="1" value="-6">(GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
                                <option timezoneid="13" gmtadjustment="GMT-06:00" usedaylighttime="0" value="-6">(GMT-06:00) Saskatchewan</option>
                                <option timezoneid="14" gmtadjustment="GMT-05:00" usedaylighttime="0" value="-5">(GMT-05:00) Bogota, Lima, Quito, Rio Branco</option>
                                <option timezoneid="15" gmtadjustment="GMT-05:00" usedaylighttime="1" value="-5">(GMT-05:00) Eastern Time (US & Canada)</option>
                                <option timezoneid="16" gmtadjustment="GMT-05:00" usedaylighttime="1" value="-5">(GMT-05:00) Indiana (East)</option>
                                <option timezoneid="17" gmtadjustment="GMT-04:00" usedaylighttime="1" value="-4">(GMT-04:00) Atlantic Time (Canada)</option>
                                <option timezoneid="18" gmtadjustment="GMT-04:00" usedaylighttime="0" value="-4">(GMT-04:00) Caracas, La Paz</option>
                                <option timezoneid="19" gmtadjustment="GMT-04:00" usedaylighttime="0" value="-4">(GMT-04:00) Manaus</option>
                                <option timezoneid="20" gmtadjustment="GMT-04:00" usedaylighttime="1" value="-4">(GMT-04:00) Santiago</option>
                                <option timezoneid="21" gmtadjustment="GMT-03:30" usedaylighttime="1" value="-3.5">(GMT-03:30) Newfoundland</option>
                                <option timezoneid="22" gmtadjustment="GMT-03:00" usedaylighttime="1" value="-3">(GMT-03:00) Brasilia</option>
                                <option timezoneid="23" gmtadjustment="GMT-03:00" usedaylighttime="0" value="-3">(GMT-03:00) Buenos Aires, Georgetown</option>
                                <option timezoneid="24" gmtadjustment="GMT-03:00" usedaylighttime="1" value="-3">(GMT-03:00) Greenland</option>
                                <option timezoneid="25" gmtadjustment="GMT-03:00" usedaylighttime="1" value="-3">(GMT-03:00) Montevideo</option>
                                <option timezoneid="26" gmtadjustment="GMT-02:00" usedaylighttime="1" value="-2">(GMT-02:00) Mid-Atlantic</option>
                                <option timezoneid="27" gmtadjustment="GMT-01:00" usedaylighttime="0" value="-1">(GMT-01:00) Cape Verde Is.</option>
                                <option timezoneid="28" gmtadjustment="GMT-01:00" usedaylighttime="1" value="-1">(GMT-01:00) Azores</option>
                                <option timezoneid="29" gmtadjustment="GMT+00:00" usedaylighttime="0" value="0">(GMT+00:00) Casablanca, Monrovia, Reykjavik</option>
                                <option timezoneid="30" gmtadjustment="GMT+00:00" usedaylighttime="1" value="0">(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</option>
                                <option timezoneid="31" gmtadjustment="GMT+01:00" usedaylighttime="1" value="1">(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
                                <option timezoneid="32" gmtadjustment="GMT+01:00" usedaylighttime="1" value="1">(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
                                <option timezoneid="33" gmtadjustment="GMT+01:00" usedaylighttime="1" value="1">(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
                                <option timezoneid="34" gmtadjustment="GMT+01:00" usedaylighttime="1" value="1">(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
                                <option timezoneid="35" gmtadjustment="GMT+01:00" usedaylighttime="1" value="1">(GMT+01:00) West Central Africa</option>
                                <option timezoneid="36" gmtadjustment="GMT+02:00" usedaylighttime="1" value="2">(GMT+02:00) Amman</option>
                                <option timezoneid="37" gmtadjustment="GMT+02:00" usedaylighttime="1" value="2">(GMT+02:00) Athens, Bucharest, Istanbul</option>
                                <option timezoneid="38" gmtadjustment="GMT+02:00" usedaylighttime="1" value="2">(GMT+02:00) Beirut</option>
                                <option timezoneid="39" gmtadjustment="GMT+02:00" usedaylighttime="1" value="2">(GMT+02:00) Cairo</option>
                                <option timezoneid="40" gmtadjustment="GMT+02:00" usedaylighttime="0" value="2">(GMT+02:00) Harare, Pretoria</option>
                                <option timezoneid="41" gmtadjustment="GMT+02:00" usedaylighttime="1" value="2">(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
                                <option timezoneid="42" gmtadjustment="GMT+02:00" usedaylighttime="1" value="2">(GMT+02:00) Jerusalem</option>
                                <option timezoneid="43" gmtadjustment="GMT+02:00" usedaylighttime="1" value="2">(GMT+02:00) Minsk</option>
                                <option timezoneid="44" gmtadjustment="GMT+02:00" usedaylighttime="1" value="2">(GMT+02:00) Windhoek</option>
                                <option timezoneid="45" gmtadjustment="GMT+03:00" usedaylighttime="0" value="3">(GMT+03:00) Kuwait, Riyadh, Baghdad</option>
                                <option timezoneid="46" gmtadjustment="GMT+03:00" usedaylighttime="1" value="3">(GMT+03:00) Moscow, St. Petersburg, Volgograd</option>
                                <option timezoneid="47" gmtadjustment="GMT+03:00" usedaylighttime="0" value="3">(GMT+03:00) Nairobi</option>
                                <option timezoneid="48" gmtadjustment="GMT+03:00" usedaylighttime="0" value="3">(GMT+03:00) Tbilisi</option>
                                <option timezoneid="49" gmtadjustment="GMT+03:30" usedaylighttime="1" value="3.5">(GMT+03:30) Tehran</option>
                                <option timezoneid="50" gmtadjustment="GMT+04:00" usedaylighttime="0" value="4">(GMT+04:00) Abu Dhabi, Muscat</option>
                                <option timezoneid="51" gmtadjustment="GMT+04:00" usedaylighttime="1" value="4">(GMT+04:00) Baku</option>
                                <option timezoneid="52" gmtadjustment="GMT+04:00" usedaylighttime="1" value="4">(GMT+04:00) Yerevan</option>
                                <option timezoneid="53" gmtadjustment="GMT+04:30" usedaylighttime="0" value="4.5">(GMT+04:30) Kabul</option>
                                <option timezoneid="54" gmtadjustment="GMT+05:00" usedaylighttime="1" value="5">(GMT+05:00) Yekaterinburg</option>
                                <option timezoneid="55" gmtadjustment="GMT+05:00" usedaylighttime="0" value="5">(GMT+05:00) Islamabad, Karachi, Tashkent</option>
                                <option timezoneid="56" gmtadjustment="GMT+05:30" usedaylighttime="0" value="5.5">(GMT+05:30) Sri Jayawardenapura</option>
                                <option timezoneid="57" gmtadjustment="GMT+05:30" usedaylighttime="0" value="5.5">(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                                <option timezoneid="58" gmtadjustment="GMT+05:45" usedaylighttime="0" value="5.75">(GMT+05:45) Kathmandu</option>
                                <option timezoneid="59" gmtadjustment="GMT+06:00" usedaylighttime="1" value="6">(GMT+06:00) Almaty, Novosibirsk</option>
                                <option timezoneid="60" gmtadjustment="GMT+06:00" usedaylighttime="0" value="6">(GMT+06:00) Astana, Dhaka</option>
                                <option timezoneid="61" gmtadjustment="GMT+06:30" usedaylighttime="0" value="6.5">(GMT+06:30) Yangon (Rangoon)</option>
                                <option timezoneid="62" gmtadjustment="GMT+07:00" usedaylighttime="0" value="7">(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
                                <option timezoneid="63" gmtadjustment="GMT+07:00" usedaylighttime="1" value="7">(GMT+07:00) Krasnoyarsk</option>
                                <option timezoneid="64" gmtadjustment="GMT+08:00" usedaylighttime="0" value="8">(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
                                <option timezoneid="65" gmtadjustment="GMT+08:00" usedaylighttime="0" value="8">(GMT+08:00) Kuala Lumpur, Singapore</option>
                                <option timezoneid="66" gmtadjustment="GMT+08:00" usedaylighttime="0" value="8">(GMT+08:00) Irkutsk, Ulaan Bataar</option>
                                <option timezoneid="67" gmtadjustment="GMT+08:00" usedaylighttime="0" value="8">(GMT+08:00) Perth</option>
                                <option timezoneid="68" gmtadjustment="GMT+08:00" usedaylighttime="0" value="8">(GMT+08:00) Taipei</option>
                                <option timezoneid="69" gmtadjustment="GMT+09:00" usedaylighttime="0" value="9">(GMT+09:00) Osaka, Sapporo, Tokyo</option>
                                <option timezoneid="70" gmtadjustment="GMT+09:00" usedaylighttime="0" value="9">(GMT+09:00) Seoul</option>
                                <option timezoneid="71" gmtadjustment="GMT+09:00" usedaylighttime="1" value="9">(GMT+09:00) Yakutsk</option>
                                <option timezoneid="72" gmtadjustment="GMT+09:30" usedaylighttime="0" value="9.5">(GMT+09:30) Adelaide</option>
                                <option timezoneid="73" gmtadjustment="GMT+09:30" usedaylighttime="0" value="9.5">(GMT+09:30) Darwin</option>
                                <option timezoneid="74" gmtadjustment="GMT+10:00" usedaylighttime="0" value="10">(GMT+10:00) Brisbane</option>
                                <option timezoneid="75" gmtadjustment="GMT+10:00" usedaylighttime="1" value="10">(GMT+10:00) Canberra, Melbourne, Sydney</option>
                                <option timezoneid="76" gmtadjustment="GMT+10:00" usedaylighttime="1" value="10">(GMT+10:00) Hobart</option>
                                <option timezoneid="77" gmtadjustment="GMT+10:00" usedaylighttime="0" value="10">(GMT+10:00) Guam, Port Moresby</option>
                                <option timezoneid="78" gmtadjustment="GMT+10:00" usedaylighttime="1" value="10">(GMT+10:00) Vladivostok</option>
                                <option timezoneid="79" gmtadjustment="GMT+11:00" usedaylighttime="1" value="11">(GMT+11:00) Magadan, Solomon Is., New Caledonia</option>
                                <option timezoneid="80" gmtadjustment="GMT+12:00" usedaylighttime="1" value="12">(GMT+12:00) Auckland, Wellington</option>
                                <option timezoneid="81" gmtadjustment="GMT+12:00" usedaylighttime="0" value="12">(GMT+12:00) Fiji, Kamchatka, Marshall Is.</option>
                                <option timezoneid="82" gmtadjustment="GMT+13:00" usedaylighttime="0" value="13">(GMT+13:00) Nuku&apos;alofa</option>
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
    )
}

export default Form
