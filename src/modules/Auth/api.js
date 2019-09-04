export const getAuth = (userName, userPassword) =>
  fetch(
    `https://loft-taxi.glitch.me/auth?username=${userName}&password=${userPassword}`
  ).then(response => {
    return response.status === 200 ? Promise.reject(response) : response.json()
  })