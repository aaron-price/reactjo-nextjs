const PROFILE_URL = 'http://localhost:8000/api/profile'

function profile_create() {}

const profile_list = async () => {
  const PROFILE_URL = 'http://localhost:8000/api/profile'
  const request = async () => {
    try {
      let response = await fetch(PROFILE_URL, {
        method: "get",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      let data = await response.json()
      return data
    }
    catch (rejected_value) {
      console.log(rejected_value)
    }

  }
  let profiles = await request()
  return profiles
}
function profile_details() {}
function profile_update() {}
function profile_delete() {}

module.exports = {
  profile_list
}
