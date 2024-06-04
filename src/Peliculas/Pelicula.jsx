import {useParams, NavLink, useNavigate} from 'react-router-dom';
import React, {useEffect, useState, useRef} from 'react';
import { Rating } from "primereact/rating";
import axios from 'axios';
import { InputTextarea } from "primereact/inputtextarea";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import SimpleBar from 'simplebar-react';
import Scrolltop from '../Scrolltop/Scrolltop';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import {Sidebar} from 'primereact/sidebar';
import './peliculas.css';

const Pelicula = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const token = import.meta.env.VITE_TOKEN_THEMOVIEDB_API;
  const [pelicula, setPelicula] = useState(null);
  const [topScroll, setTopScroll] = useState(0);
  const [cast, setCast] = useState(null);
  const scrollableNodeRef = useRef(null);
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [visibleBottom, setVisibleBottom] = useState(false);
  const navigate = useNavigate(); 
  let { id } = useParams();


  useEffect(()=>{
    movieDetails();
    getCast();
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[]);

  const movieDetails = async() => {

    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    
    setPelicula(response.data);
    //console.log(response.data);
  }

  const getCast = async() => {
    try {
      //https://api.themoviedb.org/3/discover/movie?api_key=TU_API_KEY&language=es-ES&with_genres=28
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}` // Reemplaza 'tu_token_de_autenticacion' con tu token real
        }
      });
      let arrayG = [];
      response.data.cast.filter((x) => {
        arrayG.push(x);
      });
      //console.log(arrayG);
      setCast(arrayG); 
    } catch (error) {
      console.error('Error al obtener datos:', error);
    } 
  }

  const back = () => {
    navigate('/peliculas');
  }

  const goToActor = (ide) => {
    navigate(`/actor/${ide}`);
  }

  const handleScroll = () => {
    const scrollableNode = scrollableNodeRef.current;
    const scrollToop = scrollableNode.scrollTop;

    //console.log('Clicked. Scrolled to:', scrollToop);
    setTopScroll(scrollToop);
  }

  const goUp = (top) => {
    if(top>300){
      const scrollableNode = scrollableNodeRef.current;
      scrollableNode.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }   
  }
  
  return (
    <>
      <div style={{position:'absolute', marginTop:'25px', marginLeft:'25px', zIndex:'99'}}>
        <li onClick={()=>{back()}} className={`menu-list-item atras`} >
          <FontAwesomeIcon icon={faArrowLeft} />
        </li>
      </div>
      {!isMobile &&
      <section className='section-peli'>
        {pelicula && cast && (
          <>
          <div className='container-peli'>
            <img className='img-portada-peli' src={'https://image.tmdb.org/t/p/w500'+pelicula.poster_path} alt={pelicula.title}/>
              <div className='peli-info'>
              <SimpleBar scrollableNodeProps={{ ref: scrollableNodeRef }} forceVisible="y" autoHide={false} className='simplebar-peli'>
                <div style={{display:'flex'}}>
                  <h1 className='titulo'>{pelicula.title}</h1>
                  
                </div>
                <span>{pelicula.release_date}</span>
                <Rating style={{marginTop:'20px'}} value={pelicula.vote_average} readOnly cancel={false} stars={10} />
                <p>{pelicula.overview}</p>
                <ul className='menu-list-genres'>
                  {pelicula.genres.map((gen, index) => {
                      return(
                        <NavLink key={index} to={`/peliculas/genero/${gen.id}`}>
                          <li className={'menu-list-item-genre'} key={index}>{gen.name}</li>
                        </NavLink>
                      ) 
                  })}
                </ul>
                <div className='grid-cast'>
                  {cast && cast.map((x, index) => {
                    if(x.profile_path != null && x.known_for_department=='Acting'){
                      return(
                        <div onClick={() => goToActor(x.id)} key={index} style={{display:'flex', justifyContent:'start'}}>
                          <Tooltip TransitionComponent={Zoom} title={x.name}>
                          <img className='img-cast' src={'https://image.tmdb.org/t/p/w500'+x.profile_path}/>
                          </Tooltip>
                        </div>
                      ) 
                    }
                  })} 
                </div>
                <Divider align="left">
                    <div className="inline-flex align-items-center">
                        <Button label="Comentarios" icon="pi pi-external-link" onClick={() => setVisibleBottom(true)} />
                    </div>
                </Divider>
              </SimpleBar>

              </div>
          </div>
          </>
        )}
      </section>
       }
      {isMobile && 
       <SimpleBar scrollableNodeProps={{ ref: scrollableNodeRef }} forceVisible="y" autoHide={false} className='simplebar-peli'>
       <section className='section-peli'>
         {pelicula && cast && (
           <>
           <div className='container-peli'>
             <img className='img-portada-peli' src={'https://image.tmdb.org/t/p/w500'+pelicula.poster_path} alt={pelicula.title}/>
               <div className='peli-info'>
               
                 <h1 className='titulo'>{pelicula.title}</h1>
                 <span>{pelicula.release_date}</span>
                 <Rating style={{marginTop:'20px'}} value={pelicula.vote_average} readOnly cancel={false} stars={10} />
                 <p>{pelicula.overview}</p>
                 <ul className='menu-list-genres'>
                   {pelicula.genres.map((gen, index) => {
                       return(
                         <li className={'menu-list-item-genre'} key={index}>{gen.name}</li>
                       ) 
                   })}
                 </ul>
                 <div className='grid-cast'>
                   {cast && cast.map((x, index) => {
                     if(x.profile_path != null && x.known_for_department=='Acting'){
                       return(
                         <div onClick={() => goToActor(x.id)} key={index} style={{display:'flex', justifyContent:'start'}}>
                           <img className='img-cast' src={'https://image.tmdb.org/t/p/w500'+x.profile_path}/>
                         </div>
                       ) 
                     }
                   })} 
                 </div>
                 <Divider align="left">
                    <div className="inline-flex align-items-center">
                        <Button label="Comentarios" icon="pi pi-external-link" onClick={() => setVisibleBottom(true)} />
                    </div>
                  </Divider>
               </div>
           </div>
           </>
         )}
       </section>
     </SimpleBar>  
        
      }
      
      <Scrolltop top={topScroll} funcion={goUp}/>
      <Sidebar className={'comentarios'} visible={visibleBottom} position="bottom" onHide={() => setVisibleBottom(false)}>
        <form className='form-comentario'>
          <InputTextarea value={value} onChange={(e) => setValue(e.target.value)}  />
          <Button icon="pi pi-send" onClick={() => setVisibleBottom(true)} />
        </form>
      </Sidebar>
    </>
  )
}


export default Pelicula;
