import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import IsStaffBtn from './IsStaffButton'
import { deleteUser, patchUser } from '../../api/requests'
import img from '../forms/icons8-close.svg'
import './AdminPanel.css'

function User ({ id, username, firstName, lastName, email, numOfFiles, size, isStaff, removeItem }) {
  const [sendRequest, setSendRequest] = useState('')
  const [_isStaff, _setIsStaff] = useState(isStaff)

  useEffect(() => {
    const fetchDataDelete = async () => {
      const response = await deleteUser(id)

      if (response.ok) {
        removeItem(id)
      }
    }

    const fetchDataPatch = async () => {
      await patchUser(id, _isStaff)
    }

    if (sendRequest === 'DELETE') {
      fetchDataDelete()
      setSendRequest('')
    }

    if (sendRequest === 'PATCH') {
      fetchDataPatch()
      setSendRequest('')
    }
  }, [sendRequest])

  const onClickHandler = (method) => {
    setSendRequest(method)
  }

  return (
    <tr key={ id }>
      <td>{ username }</td>
      <td>{ firstName }</td>
      <td>{ lastName }</td>
      <td>{ email }</td>
      <td>{ numOfFiles }</td>
      <td>{ size }</td>
      <td><IsStaffBtn isStaff={ _isStaff } setIsStaff={ _setIsStaff} onClickHandler={onClickHandler} /></td>
      <td><img src={img} onClick={() => onClickHandler('DELETE')}></img></td>
    </tr>
  )
}

User.propTypes = {
  id: PropTypes.number,
  username: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  numOfFiles: PropTypes.number,
  size: PropTypes.string,
  isStaff: PropTypes.bool,
  removeItem: PropTypes.func
}

export default User
