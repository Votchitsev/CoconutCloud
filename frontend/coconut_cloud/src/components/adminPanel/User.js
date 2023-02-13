import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import IsStaffBtn from './isStaffButton'
import img from '../forms/icons8-close.svg'
import './AdminPanel.css'
import useRequest from '../../request'
import BASE_URL from '../../config'

function User ({ id, username, firstName, lastName, email, isStaff, removeItem }) {
  const [sendRequest, setSendRequest] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [_isStaff, _setIsStaff] = useState(isStaff)
  const token = useSelector(state => state.auth.authToken)

  const deleteResponse = useRequest(sendRequest && sendRequest === 'DELETE'
    ? [BASE_URL + `auth/users/${id}/`, 'DELETE', { current_password: currentPassword }, token]
    : null)

  const changeIsStaffResponse = useRequest(sendRequest && sendRequest === 'PATCH'
    ? [BASE_URL + `auth/users/${id}/`, 'PATCH', { is_staff: _isStaff }, token]
    : null)

  useEffect(() => {
    if (deleteResponse.data || changeIsStaffResponse.data) {
      setSendRequest(false)

      if (deleteResponse.data.ok) {
        removeItem(id)
      }
    }
  }, [deleteResponse, changeIsStaffResponse])

  const onClickHandler = (method) => {
    if (method === 'DELETE') {
      const currentPassword = prompt('Insert your password')
      setCurrentPassword(currentPassword)
    }
    setSendRequest(method)
  }

  return (
    <tr key={ id }>
      <td>{ username }</td>
      <td>{ firstName }</td>
      <td>{ lastName }</td>
      <td>{ email }</td>
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
  isStaff: PropTypes.bool,
  removeItem: PropTypes.func
}

export default User
