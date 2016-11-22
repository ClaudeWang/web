import fetch from 'isomorphic-fetch'

//const url = 'https://webdev-dummy.herokuapp.com'
const url = 'http://localhost:8080'
const resource = (method, endpoint, payload) => {
  const options =  {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (payload) options.body = JSON.stringify(payload)

  return fetch(`${url}/${endpoint}`, options)
    .then(r => {
      if (r.status === 200) {
        return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
      } else {
        // useful for debugging, but remove in production
        console.error(`${method} ${endpoint} ${r.statusText}`)
        throw new Error(r.statusText)
      }
    })
}

export function navToMain() {
  return (dispatch) => {
    dispatch({type: 'clearText'})
    dispatch(changePageToMain());
  }
}
export function navToLogin() {
  return (dispatch) => {
    dispatch({type: 'clearText'});
    dispatch(changePageToLogin());
  }
}
export function navToProfile() {
  return (dispatch) => {
    dispatch({type: 'clearText'});
    dispatch(changePageToProfile());
  }
}

export function changePageToMain() {
  return {type: "toMain"};
}

export function changePageToLogin() {
  return {type: "toLogin"}
}

export function changePageToProfile() {
  return {type: "toProfile"}
}
export {resource, url}
