import React from 'react'
import './AdminPanel.css'

function UsersList () {
  return (
    <table>
      <tr>
        <th>Username</th>
        <th>First name</th>
        <th>Last name</th>
        <th>email</th>
        <th>is admin</th>
      </tr>
    </table>
  )
}

export default UsersList
