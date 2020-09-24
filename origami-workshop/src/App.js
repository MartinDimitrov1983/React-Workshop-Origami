import React, { useState, useEffect } from 'react';
import UserContext from "./Context"
import getCookie from './utils/cookie'


const App =(props) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const logIn = (user) => {
    setUser({
      ...user,
      loggedIn: true,
    })
  }

  const logOut = () => {
    fetch("http://localhost:9999/api/user/logout",  {
      method: 'POST',
      credentials: 'include'
    }).then(res => {
      setUser({
        loggedIn: false,
      })
    })
    .catch(e => console.log(e))
   
  }

  useEffect(() => {
    
    const token = getCookie('x-auth-token')
    if (!token) {
      setUser({
        loggedIn: false,
      })
      setLoading(false)
      return
    }

    fetch("http://localhost:9999/api/user/verify", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    .then(promise => promise.json())
    .then(response => {
    
      if(response.status){
        logIn({
          username: response.user.username,
          id: response.user._id
        })
      } else {
        logOut()
      }
      
      setLoading(false)
    }).catch((e) => console.log("Error"))
  }, []);


    
    if (loading) {
      return (<div>Loading...</div>)
    }

    return (
      <UserContext.Provider value = {{
        user,
        logIn,
        logOut
      }}>
        {props.children}
         </UserContext.Provider>
    );
  
}

export default App;
