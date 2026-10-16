import React from 'react'
import { Link } from 'react-router'

export const Homepage = () => {
  return (
    <div>

        <Link to="userregistration">User Register</Link>
        <br />
        <Link to="login">Login</Link>
    </div>
  )
}
