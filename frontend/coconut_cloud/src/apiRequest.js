import BASE_URL from './config'

function apiRequest (method, url, body = {}, token = null) {
  let response

  if (method === 'POST') {
    response = fetch(BASE_URL + url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'Application/json',
        Authorization: `Token ${token}`
      }
    })
  }

  return response
}

export default apiRequest
