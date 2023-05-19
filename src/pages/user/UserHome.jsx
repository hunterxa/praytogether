import { useLoaderData, Link } from 'react-router-dom';
import { getCurrentUser } from '../../backend/firebase';
import { requireAuth } from '../../backend/authUtils';
import '../../styles/user/userhome.css'
import headerImage from '../../assets/beach_dusk.png'
import groupImage from '../../assets/group_praying.png'
import friendsImage from '../../assets/friends.png'
import listImage from '../../assets/prayer_list.png'

export async function loader({ request }) {
  await requireAuth(request)
  
  const user = getCurrentUser()
  return user
}

export default function UserHome() {
  const data = useLoaderData()
  return (
    <div className="userhome entire-page">
      <img className="userhome-header-image" src={headerImage}/>
      <p className="userhome-greeting">Hello, {data.displayName}!</p>
      <div className="userhome-buttons">
        <div className="userhome-buttons-top">
          <div className="userhome-button">
            <p className="userhome-buttons-top-title">Groups</p>
            <Link to="/groups" className="userhome-button-card">
              <img className="userhome-button-card-image" src={groupImage}></img>
            </Link>
          </div>
          <div className="userhome-button">
            <p className="userhome-buttons-top-title">Friends</p>
            <Link to="/friends" className="userhome-button-card">
              <img className="userhome-button-card-image" src={friendsImage}></img>
            </Link>
          </div>
        </div>
        <div className="userhome-buttons-bottom">
          <div className="userhome-button">
            <Link to="/list" className="userhome-button-card" id="bottom-card">
              <img className="userhome-button-card-image" id="bottom-image" src={listImage}></img>
            </Link>
            <p className="userhome-buttons-bottom-title">List</p>
          </div>
        </div>
      </div>
    </div>
  )
}