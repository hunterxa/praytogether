import PropTypes from 'prop-types'
import { getFormattedDate } from '../utils/dateUtils'
import '../styles/postcard.css'

export default function PostCard({ author, text, time }) {
  const date = new Date(time.seconds * 1000)

  return (
    <div className="post-card">
      <div className="post-card-info">
        <p className="post-card-author">{author}</p>
        <p className="post-card-time">
          {getFormattedDate(date)}
        </p>
      </div>
      <p className="post-card-text">{text}</p>
    </div>
  )
}

PostCard.propTypes = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  time: PropTypes.object.isRequired,
}