import { Link, Form, useActionData } from 'react-router-dom';
import { RxArrowLeft } from 'react-icons/rx';
import GroupCard from '../../components/GroupCard';
import { getGroupById } from '../../backend/firebase';
import { requireAuth } from '../../backend/authUtils';

import '../../styles/user/joingroup.css';

export async function loader({ request }) {
  await requireAuth(request)

  return null
}

export async function action({ request }) {
  const formData = await request.formData()
  const groupCode = formData.get('group-code')

  const group = await getGroupById(groupCode)

  if (!group) {
    return {
      error: 'No group found with that code.'
    }
  }

  return group
}

export default function JoinGroup() {
  let data = useActionData();

  let groupCard = null;
  if (data?.name) {
    groupCard = <GroupCard id={data.id} name={data.name} members={data.members.length} />
  }

  return (
    <div className="join-group">
      <div className="groups-links-bar">
        <Link to=".." className="groups-back-button">
          <RxArrowLeft size="1.125rem"/> Back
        </Link>
      </div>
      <h1 className="join-group-title">Find a Group</h1>
      {data?.error && <p className="join-group-error">{data.error}</p>}
      <Form 
        method="post"
        className="join-group-form"
      >
        <input 
          className="join-group-input"
          type="text"
          name="group-code"
          placeholder="Group code"  
          autoComplete="on"
        />
        <button type="submit" className="join-group-button">Search</button>
      </Form>
      {groupCard}
    </div>
  )
}