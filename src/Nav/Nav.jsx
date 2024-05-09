import React, { useState, useEffect, useRef}  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClapperboard, faBars,faMasksTheater, faFile, faTv, faHeart} from '@fortawesome/free-solid-svg-icons';
import { Sidebar } from 'primereact/sidebar';
import { Divider } from 'primereact/divider';


import './Nav.css';
const Nav = ({info, estado}) => {
  const [visible, setVisible] = useState(false);

  const toggleLogin = () => {
    info(estado);
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


  return (
    <>
    <header className='header-desktop'>
        <nav className='menu'>
            <ul className='menu-list' onMouseEnter={(e) => hoverHeader(e.currentTarget)} onMouseLeave={(e) => outHoverHeader(e.currentTarget)}>

              <li className='menu-list-item' onMouseEnter={(e) => hover(e.currentTarget)} onMouseLeave={(e) => notHover(e.currentTarget)}>
                Peliculas
              </li>

              <li className='menu-list-item' onMouseEnter={(e) => hover(e.currentTarget)} onMouseLeave={(e) => notHover(e.currentTarget)}>
                Series
              </li>

              <li className='menu-list-item' onMouseEnter={(e) => hover(e.currentTarget)} onMouseLeave={(e) => notHover(e.currentTarget)}>
                Programas
              </li>

              <li className='menu-list-item ' onMouseEnter={(e) => hover(e.currentTarget)} onMouseLeave={(e) => notHover(e.currentTarget)}>
                Documentales
              </li>

              <li className='menu-list-item favorito' onMouseEnter={(e) => hover(e.currentTarget)} onMouseLeave={(e) => notHover(e.currentTarget)}>
                Favoritos
              </li>

            </ul>
            <span className='profileAccess' onClick={() => {toggleLogin()}}> 
              <FontAwesomeIcon icon={faUser} />
            </span>
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
            <li className='menu-sidebar-item'><FontAwesomeIcon icon={faTv} /><span className='menu-sidebar-item-text'>Programas</span></li>
            <Divider type="dashed"/>
            <li className='menu-sidebar-item'><FontAwesomeIcon icon={faFile} /><span className='menu-sidebar-item-text'>Documentales</span></li>
            <Divider type="dashed"/>
            <li className='menu-sidebar-item fav'><FontAwesomeIcon icon={faHeart} /><span className='menu-sidebar-item-text'>Favoritos</span></li>
            <Divider type="dashed"/>
          </ul>
        </Sidebar>
        <span className='profileAccess' onClick={() => {toggleLogin()}}> 
          <FontAwesomeIcon icon={faUser} />
        </span>
    </div>

    </header>
    </>
  )
}

export default Nav;
