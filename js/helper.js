export async function request(url = '', method = "GET", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method, // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  })
  return response.json() // parses JSON response into native JavaScript objects
}