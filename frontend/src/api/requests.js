import Cookies from 'js-cookie'
import BASE_URL from '../config'

export function getCsrfCookie () {
  return fetch(BASE_URL + 'auth/get_csrf')
}

export function logIn (email, password) {
  return fetch(BASE_URL + 'auth/login/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken' : Cookies.get('csrftoken'),
    },
    body: JSON.stringify({
      email,
      password
    })
  })
}

export function logOut (token) {
  return fetch(BASE_URL + 'auth/logout/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    }
  })
}

export function userMe (token) {
  return fetch(BASE_URL + 'auth/users/me/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    }
  })
}

export function getUserList (token) {
  return fetch(BASE_URL + 'detail_users_list/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    }
  })
}

export function deleteUser (token, password, id) {
  return fetch(BASE_URL + `auth/users/${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    },
    body: JSON.stringify({
      current_password: password
    })
  })
}

export function patchUser (token, id, isStaff) {
  return fetch(BASE_URL + `auth/users/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    },
    body: JSON.stringify({
      is_staff: isStaff
    })
  })
}

export function signUp (data) {
  return fetch(BASE_URL + 'registr/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export function postFile (token, data) {
  return fetch(BASE_URL + 'files/', {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`
    },
    body: data
  })
}

export function getFiles (token) {
  return fetch(BASE_URL + 'files/', {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`
    }
  })
}

export function patchFile (token, data) {
  return fetch(BASE_URL + 'files/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    },
    body: JSON.stringify(data)
  })
}

export function deleteFile (token, id) {
  return fetch(BASE_URL + `files/?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    }
  })
}

export function downloadFile (token, id) {
  return fetch(BASE_URL + `link/${id}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    }
  })
}

export function getDownloadLink (token, id) {
  return fetch(BASE_URL + `link/?file_id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    }
  })
}
