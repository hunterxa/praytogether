import { Outlet } from 'react-router-dom'
import '../styles/user/groups.css'
import '../styles/utils.css'
import headerImage from '../assets/beach_dusk.png'
import footerImage from '../assets/man_outside.png'

export default function GroupsLayout() {
  return (
    <div className="groups entire-page">
      <img className="groups-header-image" src={headerImage} />
        <Outlet />
      <img className="groups-footer-image" src={footerImage} />
    </div>
  )
}