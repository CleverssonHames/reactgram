import './Navbar.css'

import { NavLink, Link} from 'react-router-dom';
import {BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from 'react-icons/bs';

//hooks
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//redux
import {logout, reset} from '../slices/authSlice'

const Navbar = () => {

  const {auth} = useAuth();
  const {user} = useSelector((state)=> state.auth)

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [query, setQuery] = useState("")

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())

    navigate("/login")
  }

  const handleSearch = (e) => {
    e.preventDefault()

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  }

  return (
    <nav id='nav'>
      <Link to='/'>reactGram</Link>
      <form onSubmit={handleSearch} id='search-form'>
        <BsSearch />
        <input type="text" placeholder='pesquisar' onChange={(e) => setQuery(e.target.value)} />
      </form>
      <ul id="nav-links">
        {auth ? (
          <>
            <li>
              <NavLink to='/'><BsHouseDoorFill /></NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/users/${user._id}`}><BsFillCameraFill/></NavLink>
              </li>
            )}
            <li>
              <NavLink to="/profile"><BsFillPersonFill/></NavLink>
            </li>
            <li>
              <span onClick={handleLogout}>Sair</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to='/Login'>Entrar</NavLink>
            </li>
            <li>
              <NavLink to='/Register'>Cadastrar</NavLink>
            </li>
          </>
        )}
        
      </ul>
    </nav>
  )
};

export default Navbar