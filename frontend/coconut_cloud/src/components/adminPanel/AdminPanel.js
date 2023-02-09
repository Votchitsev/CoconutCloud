import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BASE_URL from '../../config'
import useRequest from '../../request'
import './AdminPanel.css'

function AdminPanel () {
  const token = useSelector(state => state.auth.authToken)
  const [access, setAccess] = useState(false)

  const { data } = useRequest([BASE_URL + 'verify_admin/', 'GET', null, token])

  useEffect(() => {
    if (data && data.is_admin) {
      setAccess(true)
    }
  }, [data])

  return (
    !access
      ? <div className='admin-panel--access-denied'>
          <span className='content'>{'You do not have access to the administration panel :('}</span>
        </div>
      : <div>access granted</div>
  )
}

export default AdminPanel
