import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BASE_URL from '../../config'
import useRequest from '../../request'

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
      ? <div>access denied</div>
      : <div>access granted</div>
  )
}

export default AdminPanel
