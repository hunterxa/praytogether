import { Link } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import '../styles/header.css'

export default function Header() {


  return (
    <header className="header">
      <Link to="/">
        <h1>Pray Together</h1>
      </Link>
      <nav>
        <Link to="/profile" className="header-profile-link">
          <CgProfile size="2.5rem" />
        </Link>
      </nav>
    </header>
  )
}