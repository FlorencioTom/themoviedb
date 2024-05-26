import React,{ useState, useEffect, useRef, useContext} from 'react';
import ScrollUpButton from "react-scroll-up"; 
import {Button} from 'primereact/button';
import axios from 'axios';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import 'primereact/resources/themes/saga-blue/theme.css'; // Importa el tema de PrimeReact
import 'primereact/resources/primereact.min.css'; // Importa los estilos base de PrimeReact
import 'primeicons/primeicons.css'; // Importa los iconos de PrimeIcons
import Nav from '../Nav/Nav';
import LoginCard from './LoginCard';
import RegisterCard from './RegisterCard';
import {animate, motion} from 'framer-motion';
import 'animate.css';
import './Login.css';
import Buttonn from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { loginContext } from './loginContext';
import Scrolltop from '../Scrolltop/Scrolltop';
        

const LoginHome = () => {
  const token = import.meta.env.VITE_TOKEN_THEMOVIEDB_API;
  const [loginVisible, setLoginVisible] = useState(false);
  const [data, setData] = useState(null);
  const [flip, setFlip] = useState(false);
  const [topScroll, setTopScroll] = useState(0);
  const [animatee, setAnimate] = useState(false);
  const containerLogin = useRef(null);
  const {user, tokenjwt} = useContext(loginContext);
  const simpleBarRef = useRef(null); // Ref para SimpleBar
  const scrollableNodeRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, [tokenjwt, user]);

  const goUp = (top) => {
    if(top>300){
      const scrollableNode = scrollableNodeRef.current;
      scrollableNode.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }   
  }

  const fetchData = async () => {
    const scrollableNode = scrollableNodeRef.current;
    scrollableNode.addEventListener('scroll', handleScroll);
    try {
      const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
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
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }

  const handleFlip = () => {
    setAnimate(!animatee);
    setFlip(!flip);
  }

  const handleProfile = (data) => {
    setLoginVisible(data);
  }

  const handleScroll = () => {
    const scrollableNode = scrollableNodeRef.current;
    const scrollToop = scrollableNode.scrollTop;

    //console.log('Clicked. Scrolled to:', scrollToop);
    setTopScroll(scrollToop);
  };
  
  return (
    <>
      <Nav info={handleProfile} estado={!loginVisible}/>
      <SimpleBar onScroll={() => handleScroll()} scrollableNodeProps={{ ref: scrollableNodeRef }} forceVisible="y" autoHide={false} style={{ maxHeight: '100vh' }}>
        <div className='container-cards'>
            {data && data.results.map((movie, i) => (
                <div key={i} className="card animate__animated">
                    <img className='card-img' src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} alt={movie.title}/>
                </div>
            ))}
        </div>
        <Scrolltop top={topScroll} funcion={goUp}/>
      </SimpleBar>
      
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

export default LoginHome;
