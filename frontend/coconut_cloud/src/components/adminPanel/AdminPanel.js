import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BASE_URL from '../../config'
import useRequest from '../../request'
import UsersList from './UsersList'
import './AdminPanel.css'

function AdminPanel () {
  const token = useSelector(state => state.auth.authToken)
  const [access, setAccess] = useState(false)

  const { data } = useRequest([BASE_URL + 'auth/users/me/', 'GET', null, token])

  useEffect(() => {
    if (data && data.data.is_staff) {
      setAccess(true)
    }
  }, [data])

  return (
    !access
      ? <div className='admin-panel--access-denied'>
          <span className='content'>{'You do not have access to the administration panel :('}</span>
        </div>
      : <UsersList />
  )
}

export default AdminPanel
