import { useLoaderData, Form, useActionData, redirect } from "react-router-dom"
import { addCurrentUserToGroup, getGroupById, getUserFromFirestoreByRef } from "../../backend/firebase"
import { requireAuth } from "../../backend/authUtils"
import cardImage from '../../assets/outside_house.png'
import '../../styles/user/joingroup.css'
import '../../styles/groupcard.css'

export async function loader({ request, params }) {
  await requireAuth(request)
  const groupId = params.groupId
  const group = await getGroupById(groupId)
  const groupOwner = await getUserFromFirestoreByRef(group.owner)

  return {
    group,
    groupOwner
  }
}

export async function action({ params }) {
  const groupId = params.groupId
  try {
    await addCurrentUserToGroup(groupId)
  } catch (err) {
    return err
  }

  return redirect(`/groups/${groupId}`)
}

export default function JoinInfo() {
  const data = useLoaderData()
  const group = data.group
  const groupOwner = data.groupOwner

  const error = useActionData()

  return (
    <>
      <div className="join-info">
        <div className="join-info-card-top">
          <img src={cardImage} className="group-card-image" />
          <p className="join-info-group-name">{group.name}</p>
        </div>
        <p className="join-info-group-owner">Owner: {groupOwner.displayName}</p>
        <p className="join-info-group-members">Members: {group.members.length}</p>
        <Form
          method="post"
          className="join-info-form"
          replace
        >
          <button type="submit" className="join-group-button">Join</button>
        </Form>
      </div>
      {error && <p className="join-group-error">{error}</p>}
    </>
  )
}