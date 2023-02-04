const request = async ([url, method, data, token]) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Token ${token}` : null
      },
      body: data ? JSON.stringify(data) : null
    })
    const json = await response.json()
    return json
  } catch (error) {
    return error
  }
}

export default request
