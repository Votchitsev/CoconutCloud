import Cookies from 'js-cookie';

export const BASE_URL = 'http://127.0.0.1:8000/api/';

export function getCsrfCookie() {
  return fetch(`${BASE_URL}auth/get_csrf/`);
}

export function logIn(email, password) {
  return fetch(`${BASE_URL}auth/login/`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export function logOut() {
  return fetch(`${BASE_URL}auth/logout/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
      cookie: `sessionid=${Cookies.get('sessionid')}`,
    },
  });
}

export function userMe() {
  return fetch(`${BASE_URL}auth/me/`, {
    method: 'GET',
    Cookie: Cookies,
    headers: {
      'Content-Type': 'application/json',
      cookie: `sessionid=${Cookies.get('sessionid')}`,
    },
  });
}

export function getUserList() {
  return fetch(`${BASE_URL}detail_users_list/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function deleteUser(id) {
  return fetch(`${BASE_URL}delete_user/${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
      cookie: `sessionid=${Cookies.get('sessionid')}`,
    },
  });
}

export function patchUser(id, isStaff) {
  return fetch(`${BASE_URL}auth/users/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
      cookie: `sessionid=${Cookies.get('sessionid')}`,
    },
    body: JSON.stringify({
      is_staff: isStaff,
    }),
  });
}

export function signUp(data) {
  return fetch(`${BASE_URL}registr/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export function postFile(data) {
  return fetch(`${BASE_URL}files/`, {
    method: 'POST',
    headers: {
      'X-CSRFToken': Cookies.get('csrftoken'),
      cookie: `sessionid=${Cookies.get('sessionid')}`,
    },
    body: data,
  });
}

export function getFiles() {
  return fetch(`${BASE_URL}files/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function patchFile(data) {
  return fetch(`${BASE_URL}files/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
      cookie: `sessionid=${Cookies.get('sessionid')}`,
    },
    body: JSON.stringify(data),
  });
}

export function deleteFile(id) {
  return fetch(`${BASE_URL}files/?id=${id}`, {
    method: 'DELETE',
    headers: {
      'X-CSRFToken': Cookies.get('csrftoken'),
      'Content-Type': 'application/json',
    },
  });
}

export function downloadFile(id) {
  return fetch(`${BASE_URL}link/${id}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function getDownloadLink(id) {
  return fetch(`${BASE_URL}link/?file_id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
