import React from 'react'

const UserLogin = () => {
  return (
    <div>
      <from>
        <h3>What's your email</h3>
        <input required type='email' placeholder='email@example.com'/>
        <h3>Enter Password</h3>
        <input required type='password' placeholder='password'/>
      <button>Login</button>
      </from>
    </div>
  )
}

export default UserLogin
