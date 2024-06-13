import React, {useEffect, useState, useRef, useContext} from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import SimpleBar from 'simplebar-react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Skeleton } from 'primereact/skeleton';
import Scrolltop from '../Scrolltop/Scrolltop';
import { loginContext } from '../Login/loginContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import {animate, motion} from 'framer-motion';
import LoginCard from '../Login/LoginCard';
import RegisterCard from '../Login/RegisterCard';
import Buttonn from '@mui/material/Button';
import Flecha from '../flecha/Flecha';
import { NavLink, useNavigate } from 'react-router-dom';
import '../flecha/flecha.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const Series = () => {
    const token = import.meta.env.VITE_TOKEN_THEMOVIEDB_API;
    const [generos, setGeneros] = useState(null);
    const [series, setSeries] = useState([]);
    const scrollableNodeRef = useRef(null);
    const [topScroll, setTopScroll] = useState(0);
    const [loginVisible, setLoginVisible] = useState(false);
    const {user, tokenjwt} = useContext(loginContext);
    const containerLogin = useRef(null);
    const [flip, setFlip] = useState(false);
    const [animatee, setAnimate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getGenero();
        //getSeriesByGenre();
    },[]);
    const handleFlip = () => {
      setAnimate(!animatee);
      setFlip(!flip);
    }
    const getGenero = async() => {
      const scrollableNode = scrollableNodeRef.current;
      scrollableNode.addEventListener('scroll', handleScroll);
        try {
            const response = await axios.get('https://api.themoviedb.org/3/genre/tv/list', {
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}` // Reemplaza 'tu_token_de_autenticacion' con tu token real
              }
            });

            const genres = response.data.genres;
            const seriesData = await Promise.all(genres.map(async (genre) => {
                const seriesInfo = await getSeriesByGenre(genre.id);
                return [genre.name, seriesInfo.results, true, genre.id];
            }));

            setSeries(seriesData);
          } catch (error) {
            console.error('Error al obtener datos:', error);
          } 
    }

    const getSeriesByGenre = async(x) => {
        try { 
            const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?with_genres=${x}`, {
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}` // Reemplaza 'tu_token_de_autenticacion' con tu token real
              }
            });

            return response.data;
            
          } catch (error) {
            console.error('Error al obtener datos:', error);
          } 
    }

    const handleProfile = (data) => {
      setLoginVisible(data);
    }

    const filtroPelisTexto = (texto) => {
      const seriesFiltradas = series.map((genero) => {
        console.log(genero);
        if (genero[0].toLowerCase().includes(texto.toLowerCase())) {
          return [genero[0], genero[1], true, genero[3]];
        } else {
          return [genero[0], genero[1], false, genero[3]];
        }
      });
      setSeries(seriesFiltradas);
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

    const handleScroll = () => {
      const scrollableNode = scrollableNodeRef.current;
      const scrollToop = scrollableNode.scrollTop;
  
      //console.log('Clicked. Scrolled to:', scrollToop);
      setTopScroll(scrollToop);
    };

    const serieDetails = (ide) => {
      navigate(`/series/serie/${ide}`);
    }

    return (
      <> 
      <Nav info={handleProfile} serie={true} filtroPelisTexto={filtroPelisTexto} estado={!loginVisible}/>
      <div className='container-generos'>
        <SimpleBar onScroll={() => handleScroll()} scrollableNodeProps={{ ref: scrollableNodeRef }} forceVisible="y" autoHide={false} className='simplebar-peliculas'>
        <div className='fade-top'></div>
          <div>
          {!series && (
            <>
              <div style={{marginBottom:'40px'}}>
                <Skeleton className='skeleton-title' width="80px" height="25px"></Skeleton>
                <div className='skeleton-container' style={{width:'calc(100%)', paddingLeft:'50px',paddingRight:'50px',display:'flex', gap:'60px', justifyContent:'space-between', flexGrow:1}}>
                  <Skeleton className='skeleton'></Skeleton>
                  <Skeleton className='skeleton'></Skeleton>
                  <Skeleton className='skeleton'></Skeleton>
                  <Skeleton className='skeleton'></Skeleton>
                </div>
              </div>
              <div>
                <Skeleton className='skeleton-title' width="80px" height="25px"></Skeleton>
                <div className='skeleton-container' style={{width:'calc(100%)', paddingLeft:'50px',paddingRight:'50px',display:'flex', gap:'60px', justifyContent:'space-between', flexGrow:1}}>
                  <Skeleton className='skeleton'></Skeleton>
                  <Skeleton className='skeleton'></Skeleton>
                  <Skeleton className='skeleton'></Skeleton>
                  <Skeleton className='skeleton'></Skeleton>
                </div>
              </div>
            </>     
          )}
          {series && series.map((genero, index)=>{
          if(genero[2]){
            return(
              <section  key={index}>
                  <div className='link link--arrowed animate__animated animate__zoomIn animate__faster' style={{display:'flex', gap:'15px', alignItems:'center', marginTop:'15px', marginBottom:'15px'}}>
                    <h1 className='genero animate__animated animate__fadeIn animate__faster'>
                      <NavLink className={'link-genero'} to={`/series/genero/${genero[3]}`}> {genero[0]} </NavLink> 
                    </h1>
                    <Flecha/>
                  </div>
                <div className='genero-content'>
                <Swiper modules={[Virtual, Navigation]}
                  slidesPerView={1}
                  centeredSlides={false}
                  spaceBetween={60}
                  pagination={{
                    type: 'fraction',
                  }}
                  navigation={false}
                  breakpoints={{
                    // when window width is >= 640px
                    600: {
                        slidesPerView: 2,
                    },
                    // when window width is >= 768px
                    768: {
                        slidesPerView: 3,
                    },
                    // when window width is >= 1024px
                    1200: {
                        slidesPerView: 4,
                    },
                }}
                >
                  {genero[1].map((x, index) => {
                    //console.log(x);
                    
                      return(
                        <SwiperSlide onClick={() => {serieDetails(x.id)}} key={index} virtualIndex={index+1} className='animate__animated animate__fadeIn'>
                          <img className='portada' src={'https://image.tmdb.org/t/p/w500'+x.backdrop_path} alt={x.title}/>
                        </SwiperSlide>
                      )
                    
                  })} 
                </Swiper>
                </div>
              </section>
            )

          } 
        })}
        </div>
        <Scrolltop top={topScroll} funcion={goUp}/>
        </SimpleBar>
      </div>
      {!user && (
        <div ref={containerLogin} className={`container-login animate__animated animate__faster ${loginVisible ? 'animate__fadeIn' : 'invisible'}`}>
          <div className='cerrar' onClick={() => setLoginVisible(!loginVisible)}>
            <FontAwesomeIcon className='cerrar-icono' icon={faX} />
          </div>
          
          <div className="flip-card">
            <motion.div 
              className='flip-card-inner'
              initial={false}
              animate={{rotateY: flip?180:360}}
              transition={{duration:0.3, animationDirection:'normal'}}
              onAnimationComplete={() => {setAnimate(false)}}>
                <div className="flip-card-front">
                  <LoginCard/>
                  <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'30px'}}>
                    <Buttonn variant="contained" color="secondary" onClick={() => {handleFlip()}}>¿Aun no tienes cuenta?</Buttonn>
                  </div>
                  {user && (
                    <div className='user-info'>
                      <p>Bienvenido, {user.user}</p>
                    </div>
                  )}
                </div>

                <div className="flip-card-back">
                  <RegisterCard/> 
                  <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'30px'}}>
                    <Buttonn variant="contained" color="secondary" onClick={() => {handleFlip()}}>Volver al Login</Buttonn>
                  </div> 
                </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
    )
}

export default Series;
