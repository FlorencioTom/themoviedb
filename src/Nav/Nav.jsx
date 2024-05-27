import React, { useState, useEffect, useRef, useContext}  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClapperboard, faBars,faMasksTheater, faFile, faTv, faHeart, faPowerOff} from '@fortawesome/free-solid-svg-icons';
import { Sidebar } from 'primereact/sidebar';
import { Divider } from 'primereact/divider';
import { NavLink } from 'react-router-dom';
import { loginContext } from '../Login/loginContext';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import axios from 'axios';

import './Nav.css';
const Nav = ({info, estado, peli, filtroPelisTexto}) => {
  const [visible, setVisible] = useState(false);
  const [expand, setExpand] = useState(false);
  const filtroGP = useRef(null);
  const {user, setUser, setToken, token} = useContext(loginContext);
  const [peliculasRefDesk, setPeliculasRefDesk] = useState(false);

  useEffect(() => {

  },[user, token]);

  const toggleLogin = () => {
    info(estado);
  }

  const logout = async() => {
    console.log('sesion cerrada');
    try {
      const response = await axios.post('http://localhost:3002/usuarios/logout',{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }       
      });
      //console.log(response); // Maneja la respuesta según sea necesario
      setUser(null);
      setToken(null);
      console.log(response.data);
    } catch (error) {
      console.error('Error en el logout:', error);
    }
  }

  const hover = (elemento) => {
    const siblings = document.querySelectorAll('.menu-list-item');
    siblings.forEach((sibling) => {
      if (sibling !== elemento) {
        sibling.classList.add('nothover');
      }
    });
  }

  const notHover = (elemento) => {
    const siblings = document.querySelectorAll('.menu-list-item');
    siblings.forEach((sibling) => {
      if (sibling !== elemento) {
        sibling.classList.remove('nothover');
      }
    });
  }

  const hoverHeader = (elemento) => {
    const menuItems = document.querySelectorAll('.menu-list-item');
    menuItems.forEach((menuItem) => {
      menuItem.classList.add('azulClaro');
    });
  }

  const outHoverHeader = (elemento) => {
    const menuItems = document.querySelectorAll('.menu-list-item');
    menuItems.forEach((menuItem) => {
      menuItem.classList.remove('azulClaro');
    });
  }

  const inputStyle = {
    width: expand ? '200px' : '50px', // Cambia el ancho según el estado
    transition: 'width 0.3s, margin-left 0.3s, color 0.3s', // Opcional: animación de transición
    marginLeft: expand ? '10px' : '0px',
    color: expand ? 'white' : '#1565c0'
    // Agrega otros estilos aquí si es necesario
  };

  const filtro = (texto) => { 
    filtroPelisTexto(texto);
  }


  return (
    <>
    <header className='header-desktop'>
        <nav className='menu'>
            <ul className='menu-list'>
              <NavLink to={'/peliculas'} className={({ isActive }) => isActive ? "activo" : ""}>
                <li className={`menu-list-item`} 
                  onMouseEnter={(e) => hover(e.currentTarget)} 
                  onMouseLeave={(e) => notHover(e.currentTarget)}>
                    Películas
                </li>
              </NavLink>

              <NavLink to={'/series'} className={({ isActive }) => isActive ? "activo" : ""}>
                <li className={`menu-list-item`} 
                  onMouseEnter={(e) => hover(e.currentTarget)} 
                  onMouseLeave={(e) => notHover(e.currentTarget)}>
                    Series
                </li>
              </NavLink>

              <li className='menu-list-item favorito' onMouseEnter={(e) => hover(e.currentTarget)} onMouseLeave={(e) => notHover(e.currentTarget)}>
                Favoritos
              </li>

            </ul>
            <div style={{display:'flex', alignItems:'center'}}>           
            {peli && ( 
              <div style={{marginRight:'30px'}} className='filtro'>
                <IconField iconPosition="left"> 
                  <InputIcon className="pi pi-search" onClick={() => setExpand(!expand)}> </InputIcon>
                  <InputText className="filtroinput" onChange={(e) => filtro(e.target.value)} style={inputStyle} placeholder=""/>
                </IconField>
              </div>
            )}
            {!user && ( 
              <span className='profileAccess no' onClick={() => {toggleLogin()}}>               
                {!user && (
                  <FontAwesomeIcon icon={faUser} />
                )}
                {user && (
                  <FontAwesomeIcon icon={faPowerOff}/>
                )}
              </span>
            )}
            {user && ( 
              <span className='profileAccess si' onClick={() => {logout()}}> 
                {!user && (
                  <FontAwesomeIcon icon={faUser} />
                )}
                {user && (
                  <FontAwesomeIcon icon={faPowerOff}/>
                )}
              </span>
            )}
            </div>
        </nav>
    </header>
    <header className='header-mobile'>
      <div>
        <span className='profileAccess' onClick={() => setVisible(true)}> 
          <FontAwesomeIcon icon={faBars} />
        </span>      
      </div>
      <div className="">
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <ul className='menu-sidebar'>
            <Divider type="dashed"/>
            <li className='menu-sidebar-item'><FontAwesomeIcon icon={faClapperboard} /><span className='menu-sidebar-item-text'>Peliculas</span></li>
            <Divider type="dashed"/>
            <li className='menu-sidebar-item'><FontAwesomeIcon icon={faMasksTheater} /><span className='menu-sidebar-item-text'>Series</span></li>
            <Divider type="dashed"/>
            <li className='menu-sidebar-item fav'><FontAwesomeIcon icon={faHeart} /><span className='menu-sidebar-item-text'>Favoritos</span></li>
            <Divider type="dashed"/>
          </ul>
        </Sidebar>
        {!user && ( 
              <span className='profileAccess no' onClick={() => {toggleLogin()}}> 
                {!user && (
                  <FontAwesomeIcon icon={faUser} />
                )}
                {user && (
                  <FontAwesomeIcon icon={faPowerOff}/>
                )}
              </span>
            )}
            {user && ( 
              <span className='profileAccess si' onClick={() => {logout()}}> 
                {!user && (
                  <FontAwesomeIcon icon={faUser} />
                )}
                {user && (
                  <FontAwesomeIcon icon={faPowerOff}/>
                )}
              </span>
            )}
    </div>

    </header>
    </>
  )
}

export default Nav;
