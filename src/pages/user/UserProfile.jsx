import { useLoaderData, Link} from 'react-router-dom'
import { getCurrentUser, } from '../../backend/firebase'
import { requireAuth } from '../../backend/authUtils'
import '../../styles/user/userprofile.css'
import '../../styles/utils.css'
import profileHeaderImage from '../../assets/bus.png'

export async function loader({ request }) {
  await requireAuth(request);
  const user = getCurrentUser()
  return user
}

export default function UserProfile() {
  const user = useLoaderData()

  return (
    <div className="user-profile entire-page">
      <img className="user-profile-header-image" src={profileHeaderImage} />
      <h2 className="user-profile-greeting">Hello, {user.displayName}</h2>

      <div className="user-profile-button-grid">
        <Link className="user-profile-manage-button button-transform">
          <div className="user-profile-button-color">
            <p>Manage Groups</p>
          </div>
        </Link>
        <Link className="user-profile-manage-button button-transform">
          <div className="user-profile-button-color">
            <p>Manage Friends</p>
          </div>
        </Link>
        <Link className="user-profile-manage-button button-transform">
          <div className="user-profile-button-color">
            <p>Manage List</p>
          </div>
        </Link>
        <Link className="user-profile-manage-button button-transform">
          <div className="user-profile-button-color">
            <p>Manage Profile</p>
          </div>
        </Link>
      </div>

      <Link to="/logout" className="user-profile-sign-out">
        Sign Out
      </Link>
    </div>
  )
}