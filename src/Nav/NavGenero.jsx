import React, { useState, useEffect, useRef, useContext}  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClapperboard, faBars,faMasksTheater, faArrowLeft, faHeart, faPowerOff, faPlus} from '@fortawesome/free-solid-svg-icons';
import { Sidebar } from 'primereact/sidebar';
import { Divider } from 'primereact/divider';
import { NavLink } from 'react-router-dom';
import { loginContext } from '../Login/loginContext';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { OverlayPanel } from 'primereact/overlaypanel';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';
import axios from 'axios';

import './Nav.css';
const NavGenero = ({info, estado, peli, filtroPelisTexto, id, generos}) => {
  const [visible, setVisible] = useState(false);
  const [expand, setExpand] = useState(false);
  const filtroGP = useRef(null);
  const {user, setUser, setToken, token} = useContext(loginContext);
  const [peliculasRefDesk, setPeliculasRefDesk] = useState(false);
  const [generoPelis, setGeneroPelis] = useState(null);
  const [generoSeries, setGeneroSeries] = useState(null);
  const op = useRef(null);

  useEffect(() => {

    getGenreMovies();
    getGenreSeries();

  },[user, token]);

  const getGenreMovies = async() => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en', {
        params: {
          include_adult: 'false',
          include_video: 'false',
          language: 'en-US',
          page: '1',
          sort_by: 'popularity.desc'
        },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}` // Reemplaza 'tu_token_de_autenticacion' con tu token real
        }
      });
      let arrayG = [];
      response.data.genres.filter((genero) => {
        arrayG.push(genero);
      });
      setGeneroPelis(arrayG);
      //console.log(arrayG);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }

  const getGenreSeries = async() => {
      try {
          const response = await axios.get('https://api.themoviedb.org/3/genre/tv/list', {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${token}` // Reemplaza 'tu_token_de_autenticacion' con tu token real
            }
          });

          let arrayG = [];
          response.data.genres.filter((genero) => {
            arrayG.push(genero);
          });
          setGeneroSeries(arrayG);
          //console.log('series: ',arrayG);
        } catch (error) {
          console.error('Error al obtener datos:', error);
        } 
  }

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

  const showGenres = () => {
    Swal.fire({
        title: "Custom animation with Animate.css",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
  }


  return (
    <>
    <header className='header-desktop'>
        <nav className='menu'>
            <ul className='menu-list dflc'>
                <NavLink to={`${generos=='pelis'?'/peliculas':'/series'}`}>
                    <li className={`menu-list-item atras`} 
                        onMouseEnter={(e) => hover(e.currentTarget)} 
                        onMouseLeave={(e) => notHover(e.currentTarget)}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </li>
                </NavLink>
                <li className={`menu-list-item mas`} onClick={(e) => op.current.toggle(e)}
                    onMouseEnter={(e) => hover(e.currentTarget)} 
                    onMouseLeave={(e) => notHover(e.currentTarget)}>
                      <FontAwesomeIcon icon={faPlus} />
                </li>
            </ul>
            <div style={{display:'flex', alignItems:'center'}}>           
                <ul className='menu-list dflc'> 
                    {(generoPelis && generos=='pelis') && generoPelis.map((genero, index) => {
                        if(genero.id == id){
                            return(
                              <div key={index} style={{display:'flex', gap:'25px'}}>
                                <li className={`menu-list-item`} 
                                    onMouseEnter={(e) => hover(e.currentTarget)} 
                                    onMouseLeave={(e) => notHover(e.currentTarget)}>
                                        {generos}
                                </li>
                                <NavLink key={index} to={`/peliculas/genero/${genero.id}`} className={({ isActive }) => isActive ? "activo" : ""}>
                                    <li className={`menu-list-item`} 
                                    onMouseEnter={(e) => hover(e.currentTarget)} 
                                    onMouseLeave={(e) => notHover(e.currentTarget)}>
                                        {genero.name}
                                    </li>
                                </NavLink>
                              </div>
                            )
                        }
                    })}
                    {(generoSeries && generos =='series') && generoSeries.map((genero, index) => {
                        if(genero.id == id){
                            return(
                              <div key={index} style={{display:'flex', gap:'25px'}}>
                                <li className={`menu-list-item`} 
                                    onMouseEnter={(e) => hover(e.currentTarget)} 
                                    onMouseLeave={(e) => notHover(e.currentTarget)}>
                                        {generos}
                                </li>
                                <NavLink key={index} to={`/series/genero/${genero.id}`} className={({ isActive }) => isActive ? "activo" : ""}>
                                    <li className={`menu-list-item`} 
                                    onMouseEnter={(e) => hover(e.currentTarget)} 
                                    onMouseLeave={(e) => notHover(e.currentTarget)}>
                                        {genero.name}
                                    </li>
                                </NavLink>
                              </div>
                                
                          )
                        }
                    })}
                </ul>
            </div>
            <OverlayPanel ref={op} className='ovelaypanel'>
                {(generoPelis && generos=='pelis') && generoPelis.map((genero, index) => {
                        if(genero.id != id){
                            return(
                                <NavLink onClick={(e) => op.current.toggle(e)} key={index} to={`/peliculas/genero/${genero.id}`} className={({ isActive }) => isActive ? "activo" : ""}>
                                    <li className={`menu-list-item`} 
                                    onMouseEnter={(e) => hover(e.currentTarget)} 
                                    onMouseLeave={(e) => notHover(e.currentTarget)}>
                                        {genero.name}
                                    </li>
                                </NavLink>
                            )
                        }
                })}
                {(generoSeries && generos =='series') && generoSeries.map((genero, index) => {
                        if(genero.id != id){
                            return(
                                <NavLink onClick={(e) => op.current.toggle(e)} key={index} to={`/peliculas/genero/${genero.id}`} className={({ isActive }) => isActive ? "activo" : ""}>
                                    <li className={`menu-list-item`} 
                                    onMouseEnter={(e) => hover(e.currentTarget)} 
                                    onMouseLeave={(e) => notHover(e.currentTarget)}>
                                        {genero.name}
                                    </li>
                                </NavLink>
                            )
                        }
                })}
            </OverlayPanel>
        </nav>
    </header>
    <header className='header-mobile'>
      <div className='header-mobile-items'>
        <span className='profileAccess' onClick={() => setVisible(true)}> 
          <FontAwesomeIcon icon={faBars} />
        </span>      
      </div>
      <div className='header-mobile-items'>
        <li className={`menu-list-item`} 
          onMouseEnter={(e) => hover(e.currentTarget)} 
          onMouseLeave={(e) => notHover(e.currentTarget)}>
          {generos=='pelis'?'Peliculas':'Series'}
        </li>
      </div>
      <div className='header-mobile-items'>
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <ul className='menu-sidebar'>
          <NavLink to={'/peliculas'}>
                    <li className={`menu-sidebar-item`} 
                        onMouseEnter={(e) => hover(e.currentTarget)} 
                        onMouseLeave={(e) => notHover(e.currentTarget)}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </li>
                </NavLink>
          <Divider type="dashed"/>
          {(generoPelis && generos=='pelis') && generoPelis.map((genero, index) => {
                        if(genero.id != id){
                            return(
                              
                                <NavLink key={index} to={`/peliculas/genero/${genero.id}`} >
                                    <li className={`menu-sidebar-item`} 
                                    onMouseEnter={(e) => hover(e.currentTarget)} 
                                    onMouseLeave={(e) => notHover(e.currentTarget)}>
                                        {genero.name}
                                    </li>
                                    <Divider type="dashed"/>
                                </NavLink>
                                
                            )
                        }
            })}
            {(generoSeries && generos =='series') && generoSeries.map((genero, index) => {
                        if(genero.id != id){
                            return(                             
                                <NavLink key={index} to={`/series/genero/${genero.id}`} >
                                    <li className={`menu-sidebar-item`} 
                                    onMouseEnter={(e) => hover(e.currentTarget)} 
                                    onMouseLeave={(e) => notHover(e.currentTarget)}>
                                        {genero.name}
                                    </li>
                                    <Divider type="dashed"/>
                                </NavLink>
                                
                            )
                        }
            })}
            
          </ul>
        </Sidebar>

              <span className='profileAccess currentGenre' onClick={() => {toggleLogin()}}> 
              {(generoPelis && generos=='pelis') && generoPelis.map((genero, index) => {
                        if(genero.id == id){
                            return(
                              
                                <NavLink style={{display:'flex'}} key={index} to={`/peliculas/genero/${genero.id}`} className={({ isActive }) => isActive ? "activo" : ""}>
                                    <li className={`menu-list-item`} 
                                      onMouseEnter={(e) => hover(e.currentTarget)} 
                                      onMouseLeave={(e) => notHover(e.currentTarget)}>
                                          {genero.name}
                                    </li>
                                </NavLink>
                              
                            )
                        }
                    })}
                    
                    {(generoSeries && generos =='series') && generoSeries.map((genero, index) => {
                        if(genero.id == id){
                            return(
                                <NavLink key={index} to={`/series/genero/${genero.id}`} className={({ isActive }) => isActive ? "activo" : ""}>
                                    <li className={`menu-list-item`} 
                                    onMouseEnter={(e) => hover(e.currentTarget)} 
                                    onMouseLeave={(e) => notHover(e.currentTarget)}>
                                        {genero.name}
                                    </li>
                                </NavLink>
                            )
                        }
                    })}
              </span>
    </div>

    </header>
    </>
  )
}

export default NavGenero;