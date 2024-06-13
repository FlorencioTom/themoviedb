import React, { useState, useEffect, useRef, useContext}  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClapperboard, faBars, faMasksTheater, faTv, faHeart, faPowerOff} from '@fortawesome/free-solid-svg-icons';
import { Sidebar } from 'primereact/sidebar';
import { Divider } from 'primereact/divider';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { loginContext } from '../Login/loginContext';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import Swal from 'sweetalert2';
import axios from 'axios';

import './Nav.css';
const Nav = ({info, estado, peli, serie, actor, filtroPelisTexto, enFav}) => {
  const tokenApi = import.meta.env.VITE_TOKEN_THEMOVIEDB_API;
  const [visible, setVisible] = useState(false);
  const [expand, setExpand] = useState(false);
  const filtroGP = useRef(null);
  const {user, setUser, setToken, token} = useContext(loginContext);
  const [peliculasRefDesk, setPeliculasRefDesk] = useState(false);
  const location = useLocation();
  const toastTopCenter = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(location.pathname === '/'){
      console.log('estoy en la raiz');
    } 
  },[user, token]);

  const toggleLogin = () => {
    info(estado);
  }

  const showToast = (severity, summary, detail) => {
    if (toastTopCenter.current) {
      toastTopCenter.current.show({ severity, summary, detail, life: 3000 });
    }
  }

  const logout = async() => {
    console.log('sesion cerrada');
    try {
      const response = await axios.post('http://localhost:3002/usuarios/logout',{
        headers: {
          'Authorization': `Bearer ${tokenApi}`,
          'Content-Type': 'application/json',
        }       
      });
      //console.log(response); // Maneja la respuesta según sea necesario
      setUser(null);
      setToken(null);
      console.log(response.data);
      showToast('info', 'Sesion cerrada', 'Cerraste la sesion');
    } catch (error) {
      console.error('Error en el logout:', error);
      showToast('error', 'Error de cerrar sesion', 'Ocurrió un error al Cerrar la sesion.');
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
  
  const serachSerie = (texto) => {
    console.log('serie:', texto); 
  }

  const serachActor = () => {
    
  }

  const filtro = (texto) => { 
    //filtroPelisTexto(texto);

  }

  const goToFav = () => {
    if(!token){
      Swal.fire({
        icon: "error",
        title: "Tienes que iniciar sesion para acceder a tus favoritos"
      });
    }else{
      navigate('/favoritos');
    }
    //setVisible(false);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if(peli){
        navigate(`/peliculas/buscar/${e.target.value}`);
      }
      if(serie){
        navigate(`/series/buscar/${e.target.value}`);
      }
      if(actor){
        navigate(`/actores/buscar/${e.target.value}`);
      }
    }
  };

  return (
    <>
    <Toast ref={toastTopCenter} position="top-center" />
    <header className={`header-desktop ${location.pathname === '/'?'flotando':''}`} >
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

              <NavLink to={'/actores'} className={({ isActive }) => isActive ? "activo" : ""}>
                <li className={`menu-list-item`} 
                  onMouseEnter={(e) => hover(e.currentTarget)} 
                  onMouseLeave={(e) => notHover(e.currentTarget)}>
                    Actores
                </li>
              </NavLink>

              <li className={`menu-list-item favorito ${enFav?'enFav':''}`} onClick={() => {goToFav()}} onMouseEnter={(e) => hover(e.currentTarget)} onMouseLeave={(e) => notHover(e.currentTarget)}>
                Favoritos
              </li>

            </ul>
            <div style={{display:'flex', alignItems:'center'}}>           
            {peli && ( 
              <div style={{marginRight:'30px'}} className='filtro'>
                <IconField iconPosition="left"> 
                  <InputIcon className="pi pi-search" onClick={() => setExpand(!expand)}> </InputIcon>
                  <InputText className="filtroinput" onKeyDown={(e) => handleKeyPress(e)} onChange={(e) => handleKeyPress(e.target.value)} style={inputStyle} placeholder=""/>
                </IconField>
              </div>
            )}
            {actor && ( 
              <div style={{marginRight:'30px'}} className='filtro'>
                <IconField iconPosition="left"> 
                  <InputIcon className="pi pi-search" onClick={() => setExpand(!expand)}> </InputIcon>
                  <InputText className="filtroinput" onKeyDown={(e) => handleKeyPress(e)} onChange={(e) => handleKeyPress(e.target.value)} style={inputStyle} placeholder=""/>
                </IconField>
              </div>
            )}
            {serie && ( 
              <div style={{marginRight:'30px'}} className='filtro'>
                <IconField iconPosition="left"> 
                  <InputIcon className="pi pi-search" onClick={() => setExpand(!expand)}> </InputIcon>
                  <InputText className="filtroinput" onKeyDown={handleKeyPress} onChange={(e) => filtro(e.target.value)} style={inputStyle} placeholder=""/>
                </IconField>
              </div>
            )}
            {!user && ( 
              <span className='profileAccess no' onClick={() => {toggleLogin()}}>               
                {!user && (
                  <FontAwesomeIcon icon={faUser} />
                )}
                {user && (
                  <>
                    {showToast('success', 'Sesión iniciada', '.')} {/* Llama a showToast cuando el usuario inicia sesión */}
                    <FontAwesomeIcon icon={faPowerOff} onClick={() => toggleLogin()} />
                  </>
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
      <div className='header-mobile-items'>
        <span className='profileAccess' onClick={() => setVisible(true)}> 
          <FontAwesomeIcon icon={faBars} />
        </span>      
      </div>
      <div className='header-mobile-items'>
                <IconField iconPosition="left"> 
                  <InputIcon className="pi pi-search" onClick={() => setExpand(!expand)}> </InputIcon>
                  <InputText className="filtroinput" onKeyDown={(e) => handleKeyPress(e)} onChange={(e) => handleKeyPress(e.target.value)} style={inputStyle} placeholder=""/>
                </IconField>
              </div>
      <div className='header-mobile-items'>
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <ul className='menu-sidebar'>
            <Divider type="dashed"/>
            <li className='menu-sidebar-item'>
              <NavLink to={`/peliculas`} className={({ isActive }) => isActive ? "activo-mobile" : "menu-sidebar-item-text"} >
                <div style={{display:'flex', gap:'20px'}}>
                  <FontAwesomeIcon icon={faClapperboard} />
                  Películas
                </div>
              </NavLink>
            </li>
            <Divider type="dashed"/>
            <li className='menu-sidebar-item favorito-mobile'>
              <NavLink to={`/series`} className={({ isActive }) => isActive ? "activo-mobile" : "menu-sidebar-item-text"} >
                <div style={{display:'flex', gap:'20px'}}>
                  <FontAwesomeIcon icon={faTv} />
                  Series
                </div>
              </NavLink>
            </li>
            <Divider type="dashed"/>
            <li className='menu-sidebar-item'>
              <NavLink to={`/actores`} className={({ isActive }) => isActive ? "activo-mobile" : "menu-sidebar-item-text"} >
                <div style={{display:'flex', gap:'20px'}}>
                  <FontAwesomeIcon icon={faMasksTheater} />
                  Actores
                </div>
              </NavLink>
            </li>
            <Divider type="dashed"/>
            <li className='menu-sidebar-item' onClick={() => {goToFav()}}>
              <NavLink className={'menu-sidebar-item-text'}>
                <div style={{display:'flex', gap:'20px'}}>
                  <FontAwesomeIcon icon={faHeart} />
                  Favoritos
                </div>
              </NavLink>
            </li>
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
    <div className='fade-bottom'></div>
    </>
  )
}

export default Nav;
