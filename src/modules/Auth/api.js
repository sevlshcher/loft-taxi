export const getAuth = (username, password) =>
  fetch(
    `https://loft-taxi.glitch.me/auth?username=${username}&password=${password}`
  ).then(response => response.json())
  .catch(error => console.log(error))