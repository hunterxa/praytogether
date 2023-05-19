import { useLoaderData, Link } from 'react-router-dom'
import { RxArrowLeft, RxPlusCircled } from 'react-icons/rx'
import PostCard from '../../components/PostCard'
import { getPostsDataByGroup } from '../../backend/firebase'
import { requireAuth } from '../../backend/authUtils'
import '../../styles/user/groupposts.css'


export async function loader({ request, params }) {
  await requireAuth(request)

  const posts = await getPostsDataByGroup(params.groupId)
  return posts
}

export default function GroupPosts() {
  let posts = useLoaderData()
  const postElements = posts.map((post, index) => {
    return (
      <PostCard
        key={index}
        author={post.authorName}
        text={post.text}
        time={post.time}
      />
    )
})

  return (
    <>
      <div className="groups-links-bar">
        <Link to=".." className="groups-back-button">
          <RxArrowLeft size="1.125rem" /> Back
        </Link>
        <Link to="post" className="groups-create-button">
          <RxPlusCircled size="2rem"/>
        </Link>
      </div>
      <div className="posts">
        <h2 className="posts-title">Posts</h2>
        {postElements}
      </div>
    </>
  )
}