import { useState } from "react";
import { Form, redirect } from "react-router-dom";
import { createNewGroup } from "../../backend/firebase.js";
import { requireAuth } from "../../backend/authUtils";
import { validateGroupName } from '../../utils/validateUtils'
import '../../styles/user/creategroup.css'

export async function loader({ request }) {
  await requireAuth(request);

  return null;
}

export async function action({ request }) {
  const formData = await request.formData();
  const groupName = formData.get('group-name');
  const groupType = formData.get('group-type');

  try {
    validateGroupName(groupName);
  } catch (err) {
    return err
  }

  const groupId = await createNewGroup(groupName, groupType);

  return redirect(`/groups/${groupId}`);
}


export default function CreateGroup() {
  const [type, setType] = useState('Open');

  function handleChange(e) {
    setType(e.target.value);
  }

  return (
    <div className="create-group">
      <h2 className="create-group-title">Create a Group</h2>
      <Form 
        method="post"
        className="create-group-form"
        replace
      >
        <input 
          className="create-group-name-input" 
          type="text" 
          name="group-name" 
          placeholder="Group Name" 
          autoComplete="on"
        />

        <div className="create-group-type-container">
          <p className="create-group-label">Group type</p>
          <label className="create-group-radio-label">
            <input 
              className="create-group-radio"
              type="radio" 
              name="group-type" 
              value="Open" 
              checked="checked"
              onChange={handleChange} 
            />
            Open
          </label>
          <label className="create-group-radio-label">
            <input 
              className="create-group-radio"
              type="radio" 
              name="group-type" 
              value="Closed" 
              onChange={handleChange} 
            />
            Closed
          </label>
          {
            type === 'Open'
            ? <p className="create-group-details">Open: anyone can join</p>
            : <p className="create-group-details">Closed: only invited users can join</p>
          }
        </div>
        <button type="submit">Create</button>
      </Form>
    </div>
  )
}