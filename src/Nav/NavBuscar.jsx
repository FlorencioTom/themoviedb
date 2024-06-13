import React, { useState, useEffect, useRef, useContext}  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import './Nav.css'

const NavBuscar = ({buscar}) => {
    const [expand, setExpand] = useState(false);
    const navigate = useNavigate();

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

    const inputStyle = {
        width: expand ? '200px' : '50px',
        transition: 'width 0.3s, margin-left 0.3s, color 0.3s',
        marginLeft: expand ? '10px' : '0px',
        color: expand ? 'white' : '#1565c0'
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          if(buscar == 'pelis'){
            navigate(`/peliculas/buscar/${e.target.value}`);
          }
          if(buscar == 'series'){
            navigate(`/series/buscar/${e.target.value}`);
          }
          if(buscar == 'actores'){
            navigate(`/actores/buscar/${e.target.value}`);
          }
        }
    };
    const atras = () => {
      switch (buscar) {
          case 'pelis':
              return '/peliculas';
          case 'series':
              return '/series';
          case 'actores':
              return '/actores';
          default:
              return '/pelis/peliculas';
      }
    };

  return (
    <>
    <header className='header-buscar'>
        <nav className='menu'>
            <ul className='menu-list dflc'>
                <NavLink to={atras()}>
                    <li className={`menu-list-item atras`} 
                        onMouseEnter={(e) => hover(e.currentTarget)} 
                        onMouseLeave={(e) => notHover(e.currentTarget)}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </li>
                </NavLink>
                <div className='filtro'>
                  <IconField iconPosition="left"> 
                    <InputIcon className="pi pi-search" onClick={() => setExpand(!expand)}> </InputIcon>
                    <InputText className="filtroinput" onKeyDown={(e) => handleKeyPress(e)} onChange={(e) => handleKeyPress(e.target.value)} style={inputStyle} placeholder=""/>
                  </IconField>
                </div>
            </ul>
        </nav>
    </header>
        
    </>
  )
}

export default NavBuscar;
