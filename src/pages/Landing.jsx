import { Link, redirect } from 'react-router-dom'
import { checkUserLoggedIn } from '../backend/firebase'
import '../styles/Landing.css'
import headerImage from '../assets/man_praying.webp'
import footerImage from '../assets/woman_praying.webp'

export function loader() {
  if (checkUserLoggedIn()) {
    return redirect('/home')
  }
  return null
}

export default function Landing() {
  return (
    <div className="landing">
      <img className="landing-header-image" src={headerImage} />
      <p className="landing-copy">
        Life moves fast, it&#39;s easy to get distracted. Stay organized and updated on the things you&#39;re praying for.
      </p>
      <h1 className="landing-title">Pray Together</h1>
      <div className="landing-buttons">
        <Link to="/signup" className="landing-button">Sign Up</Link>
        <Link to="/login" className="landing-button">Log In</Link>
      </div>
      <div className="landing-features">
        <h2>Features:</h2>
        <ul>
          <li>Easily organize the people and things you’re praying for</li>
          <li>Stay updated on prayer requests from your friends</li>
          <li>Form prayer groups to pray for your friends and have them pray for you</li>
          <li>Intercessory mode: helps you organize and dedicate time to praying for the people and things that matter to you</li>
        </ul>
      </div>
      <img className="landing-footer-image" src={footerImage} />
    </div>
  )
}