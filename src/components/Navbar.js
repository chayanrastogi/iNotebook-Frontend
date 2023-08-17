import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'


const Navbar = () => {

  let navigate = useNavigate();

  const handleLogOut = ()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg" style={{backgroundColor:"#4682A9", color:"#f5f5f5"}} >
  <div className="container-fluid">
    <Link className="navbar-brand fw-bold" to="/" style={{color:"#f5f5f5"}}>iNoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="/" style={{color:"#f5f5f5"}}>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about"style={{color:"#f5f5f5"}}>About</NavLink>
        </li>
      </ul>
      {!localStorage.getItem('token')?<form a className="d-flex">
      <Link className="btn btn-primary button mx-2" to="/login" role="button" >Login</Link>
      <Link className="btn btn-primary button mx-2" to="/signup" role="button" >Sign Up</Link>
      </form>:<button className="btn btn-primary button" onClick={handleLogOut}>Log Out</button>}
    </div>
  </div>
</nav>

  ) 
}

export default Navbar
