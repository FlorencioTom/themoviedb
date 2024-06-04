import {useParams, NavLink, useNavigate} from 'react-router-dom';
import React, {useEffect, useState, useRef} from 'react';
import { Rating } from "primereact/rating";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import SimpleBar from 'simplebar-react';
import Scrolltop from '../Scrolltop/Scrolltop';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

const Actor = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
    const token = import.meta.env.VITE_TOKEN_THEMOVIEDB_API;
    const [filmografia, setFilmografia] = useState(null);
    const [seriegrafia, setSeriegrafia] = useState(null);
    const [imagenes, setImagenes] = useState(null);
    const [details, setDetails] = useState(null);
    const [topScroll, setTopScroll] = useState(0);
    const scrollableNodeRef = useRef(null);
    const navigate = useNavigate(); 
    let { id } = useParams();

    useEffect(() => {
        getFilmografia(); 
        getImagen();
        getActorDetails();
        getSerieGrafia();
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 700);
          };
      
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);       
    },[]);

    const getActorDetails = async() => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/person/${id}`, {
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}` // Reemplaza 'tu_token_de_autenticacion' con tu token real
              }
            });
            let arrayG = [];
            //console.log(response.data);
            setDetails(response.data);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }         
    }
    
    const getFilmografia = async() => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits`, {
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}` 
              }
            });
            let arrayG = [];
            response.data.cast.filter((x) => {
              arrayG.push(x);
            });
            setFilmografia(arrayG);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        } 
    }

    const getSerieGrafia = async() => {
      try {
          const response = await axios.get(`https://api.themoviedb.org/3/person/${id}/tv_credits`, {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${token}` 
            }
          });
          let arrayG = [];
          response.data.cast.filter((x) => {
            arrayG.push(x);
          });
          console.log(arrayG);
          setSeriegrafia(arrayG);
      } catch (error) {
          console.error('Error al obtener datos:', error);
      }     
    }

    const getImagen = async() => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/person/${id}/images`, {
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}` // Reemplaza 'tu_token_de_autenticacion' con tu token real
              }
            });
            let arrayG = [];
            response.data.profiles.filter((x) => {
              arrayG.push(x.file_path);
            });
            //console.log(arrayG[0]);
            setImagenes(arrayG); 
        } catch (error) {
            console.error('Error al obtener datos:', error);
        } 
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

    const goToMovie = (ide) => {
        navigate(`/peliculas/pelicula/${ide}`);
    }

    const goToSerie = (ide) => {
      navigate(`/series/serie/${ide}`);
    }

    const back = () => {
        navigate('/peliculas');
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
          {filmografia && details && imagenes && (
            <div className='container-peli'>
                <img className='img-portada-peli' src={'https://image.tmdb.org/t/p/w200'+imagenes[0]}/>
                <div className='peli-info'>
                <SimpleBar scrollableNodeProps={{ ref: scrollableNodeRef }} forceVisible="y" autoHide={false} className='simplebar-peli'>
                  <div style={{display:'flex', flexDirection:'column'}}>
                    <h1 className='titulo'>Filmografía de {details.name} </h1>
                    <p>{details.biography} </p>
                  </div>
                  <div className='grid-filmografi'>
                      {filmografia && filmografia.map((x, index) => {
                        return(
                          <Tooltip key={index+100} TransitionComponent={Zoom} title={x.title}>
                            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                {x.poster_path == null && (
                                    <img onClick={() => {goToMovie(x.id)}} className='img-filmografi' src={'https://image.tmdb.org/t/p/w500'+x.backdrop_path}/>
                                )}
                                {x.poster_path != null && (
                                    <img onClick={() => {goToMovie(x.id)}} className='img-filmografi' src={'https://image.tmdb.org/t/p/w500'+x.poster_path}/>
                                )}                                
                            </div>
                          </Tooltip>
                        ) 
                      })} 
                  </div>
                  <div className='grid-filmografi'>
                        {seriegrafia && seriegrafia.map((x, index) => {
                          return(
                            <Tooltip key={index+100} TransitionComponent={Zoom} title={x.name}>
                              <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                  {x.poster_path == null && (
                                      <span onClick={() => {goToSerie(x.id)}}> imagen no disponible</span>
                                  )}
                                  {x.poster_path != null && (
                                      <img onClick={() => {goToSerie(x.id)}} className='img-filmografi' src={'https://image.tmdb.org/t/p/w500'+x.poster_path}/>
                                  )}                                
                              </div>
                            </Tooltip>
                          ) 
                        })} 
                    </div>
                  </SimpleBar>
                </div>
            </div>
          )}
        </section>
         }
        {isMobile && 
         <SimpleBar scrollableNodeProps={{ ref: scrollableNodeRef }} forceVisible="y" autoHide={false} className='simplebar-peli'>
        <section className='section-peli'>
          {filmografia && details && imagenes && (
            <div className='container-peli'>
                <img className='img-portada-peli' src={'https://image.tmdb.org/t/p/w200'+imagenes[0]}/>
                <div className='peli-info'>
                  <div style={{display:'flex', flexDirection:'column'}}>
                    <h1 className='titulo'>Filmografía de {details.name} </h1>
                    <p>Filmografía de {details.biography} </p>
                  </div>
                  <div className='grid-filmografi'>
                        {filmografia && filmografia.map((x, index) => {
                          return(
                            <Tooltip key={index} TransitionComponent={Zoom} title={x.title}>
                              <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                  {x.poster_path == null && (
                                      <span onClick={() => {goToMovie(x.id)}}>imagen no disponible</span>
                                  )}
                                  {x.poster_path != null && (
                                      <img onClick={() => {goToMovie(x.id)}} className='img-filmografi' src={'https://image.tmdb.org/t/p/w500'+x.poster_path}/>
                                  )}                                
                              </div>
                            </Tooltip>
                          ) 
                        })} 
                    </div>
                    <div className='grid-filmografi'>
                        {seriegrafia && seriegrafia.map((x, index) => {
                          return(
                            <Tooltip key={index+100} TransitionComponent={Zoom} title={x.name}>
                              <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                  {x.poster_path == null && (
                                      <span onClick={() => {goToSerie(x.id)}}> imagen no disponible</span>
                                  )}
                                  {x.poster_path != null && (
                                      <img onClick={() => {goToSerie(x.id)}} className='img-filmografi' src={'https://image.tmdb.org/t/p/w500'+x.poster_path}/>
                                  )}                                
                              </div>
                            </Tooltip>
                          ) 
                        })} 
                    </div>
                </div>
            </div>
          )}
        </section>
       </SimpleBar>     
        }
        
        <Scrolltop top={topScroll} funcion={goUp}/>
      </>

    )
}

export default Actor; 
