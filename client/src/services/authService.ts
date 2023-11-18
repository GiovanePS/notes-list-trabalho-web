export const checkAuth = async () => {
  const response: Response = await fetch('http://localhost:5000/check', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  }).catch((error) => {
    if (error) throw error

    return error
  })

  if (response.status === 400) {
    return false
  }

  if (response.status === 200) {
    return true
  }
}