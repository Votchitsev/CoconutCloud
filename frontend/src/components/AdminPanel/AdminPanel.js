import React, { useContext, useEffect, useState } from 'react'
import { userMe } from '../../api/requests'
import UsersList from './UsersList'
import './AdminPanel.css'
import Preloader from '../Preloader/Preloader'
import Context from '../../GlobalState/state'

function AdminPanel () {
  const { isAdmin } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await userMe()
      const data = await response.json()

      if (data.is_staff) {
        setAccess(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    isLoading
      ? <Preloader />
      : !isAdmin
          ? <div className='admin-panel--access-denied'>
              <span className='content'>{'You do not have access to the administration panel :('}</span>
            </div>
          : <UsersList />
  )
}

export default AdminPanel
