import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import cardImage from '../assets/outside_house.png'
import '../styles/groupcard.css'

export default function GroupCard({ id, name, members }) {
  return (
    <Link to={id} className="group-card">
      <div className="group-card-info">
        <img className="group-card-image" src={cardImage} />
        <div className="group-card-info-text">
          <p className="group-card-title">{name}</p>
          <p className="group-card-members">{members} {`member${members > 1 ? "s" : ""}`}</p>
        </div>
      </div>
    </Link>
  )
}

GroupCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  members: PropTypes.number.isRequired
}