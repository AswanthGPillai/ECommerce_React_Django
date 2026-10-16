import React from 'react'
import { Link } from 'react-router'

const Homepage = () => {
  return (
    <div>
        <Link to="district">District</Link><br />
        <Link to="place">Place</Link> <br />
        <Link to="user_list">User List</Link>
    </div>
  )
}

export default Homepage