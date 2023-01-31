import BASE_URL from './config'

function apiRequest (method, url, body) {
  let response

  if (method === 'POST') {
    response = fetch(BASE_URL + url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'Application/json'
      }
    })
  }

  return response
}

export default apiRequest
