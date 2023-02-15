import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useRequest from '../../request'
import User from './User'
import BASE_URL from '../../config'
import './AdminPanel.css'

function UsersList () {
  const token = useSelector(state => state.auth.authToken)
  const [renderedData, setRenderedData] = useState(null)
  const { data } = useRequest([BASE_URL + 'auth/users/', 'GET', null, token])

  useEffect(() => {
    if (data && data.ok) {
      setRenderedData(data.data)
    }
  }, [data])

  const removeItem = (id) => {
    const newRenderedData = renderedData.filter(item => item.id !== id)
    setRenderedData(newRenderedData)
  }

  return (
    <table>
      <thead>
        <th>Username</th>
        <th>First name</th>
        <th>Last name</th>
        <th>email</th>
        <th>is admin</th>
      </thead>
      <tbody>
        {
          renderedData
            ? renderedData.map(user =>
              <User
                key={ user.id }
                id={user.id}
                username={user.username}
                firstName={user.first_name}
                lastName={user.last_name}
                email={user.email}
                isStaff={user.is_staff}
                removeItem={removeItem}
              />
            )
            : null
        }
      </tbody>
    </table>
  )
}

export default UsersList
