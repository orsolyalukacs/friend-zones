import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../components/Form'

const fetcher = (url) =>
    fetch(url)
        .then((res) => res.json())
        .then((json) => json.data)

const EditUser = () => {
    const router = useRouter()
    const { id } = router.query
    const { data: user, error } = useSWR(id ? `/api/users/${id}` : null, fetcher)

    if (error) return <p>Failed to load</p>
    if (!user) return <p>Loading...</p>

    const userForm = {
        name: user.name,
        email: user.email,
        timezone: user.timezone,
    }

    return <Form formId="edit-user-form" userForm={userForm} forNewUser={false} />
}

export default EditUser
