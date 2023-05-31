import { useLoaderData, Link } from 'react-router-dom';
import GroupCard from '../../components/GroupCard';
import { RxArrowLeft, RxPlusCircled } from 'react-icons/rx';
import { IoSearchOutline } from 'react-icons/io5';
import { requireAuth } from '../../backend/authUtils'
import { getCurrentUser, getUsersGroups } from '../../backend/firebase'
import '../../styles/user/groups.css'
import '../../styles/utils.css'

export async function loader({ request }) {
  await requireAuth(request)

  const user = await getCurrentUser()
  const groups = await getUsersGroups(user.id)
  return groups
}

export default function Groups() {
  const data = useLoaderData()

  const groupElements = data.map((group, index) => {
    return (
      <GroupCard 
        key={index} 
        id={group.id}
        name={group.name} 
        members={group.members.length} 
      />
    )
  })

  return (
    <>
      <div className="groups-links-bar">
        <Link to="/home" className="groups-back-button">
          <RxArrowLeft size="1.125rem" /> Back
        </Link>
        <div>
          <Link to="join" className="groups-join-button">
            <IoSearchOutline size="2rem" />
          </Link>
          <Link to="create" className="groups-create-button">
            <RxPlusCircled size="2rem"/>
          </Link>
        </div>
      </div>
      <h2>Your Groups</h2>
      <div className="groups-cards-container">
        {groupElements}
      </div>
    </>
  )
}