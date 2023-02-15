import useSWR from 'swr'

const fetcher = async ([url, method, body, token]) => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Token ${token}` : null
    },
    body: body ? JSON.stringify(body) : null
  })

  let json

  try {
    json = await response.json()
  } catch {
    json = undefined
  }

  return {
    ok: response.ok,
    data: json
  }
}

const useRequest = (args) => {
  const { data, error, isLoading } = useSWR(!args ? null : [...args], fetcher)

  return {
    data,
    error,
    isLoading
  }
}

export default useRequest
