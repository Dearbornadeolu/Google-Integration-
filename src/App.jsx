import { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode"
import './App.css'

function App() {

  const [user, setUser] = useState({})

  function handleCallbackResponse(response){
    var userObject = jwt_decode(response.credential)
    setUser(userObject)
    document.getElementById("signInDiv").hidden = true
  }

  function handleSignOut(event){
    setUser({})
    document.getElementById("signInDiv").hidden = false
  }

  useEffect(()=>{
    google.accounts.id.initialize({
      client_id: "525309145937-0hpevnl3l6kr7l8o86cso2q0ghujmeek.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    )
    google.accounts.id.prompt()
  },[])

  return (
    <div className="App">
     <div id="signInDiv"></div>
     {
      Object.keys(user).length != 0 && 
      <button onClick={(e) => handleSignOut(e)}>sign out</button>
     }
     {user && 
      <div>
        <img src={user.picture}/>
        <h3>{user.name}</h3>
      </div>
     }
    </div>
  )
}

export default App
