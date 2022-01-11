import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import User from '../../models/User'

/* Allows you to view user card info and delete user card*/
const UserPage = ({ user }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const userID = router.query.id

    try {
      await fetch(`/api/users/${userID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the user.')
    }
  }

  return (
    <div key={user._id}>
      <div className="card">
        <h5 className="user-name">{user.name}</h5>
        <div className="main-content">
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.timezone}</p>

          <div className="btn-container">
            <Link passHref="/[id]/edit" as={`/${user._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const user = await User.findById(params.id).lean()
  user._id = user._id.toString()

  return { props: { user } }
}

export default UserPage
