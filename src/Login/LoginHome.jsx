import React,{ useState, useEffect} from 'react';
import ScrollUpButton from "react-scroll-up"; 
import {Button} from 'primereact/button';
import axios from 'axios';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import 'primereact/resources/themes/saga-blue/theme.css'; // Importa el tema de PrimeReact
import 'primereact/resources/primereact.min.css'; // Importa los estilos base de PrimeReact
import 'primeicons/primeicons.css'; // Importa los iconos de PrimeIcons
import LoginCard from './LoginCard';
import RegisterCard from './RegisterCard';
import {animate, motion} from 'framer-motion';
import 'animate.css';
import './Login.css';
import Buttonn from '@mui/material/Button';

const LoginHome = () => {
  const token = import.meta.env.VITE_TOKEN_THEMOVIEDB_API;
  const [data, setData] = useState(null);
  const [flip, setFlip] = useState(false);
  const [animatee, setAnimate] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
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

  return (
    <>
      <SimpleBar forceVisible="y" autoHide={false} style={{ maxHeight: '100vh' }}>
        <div className='container-cards'>
            {data && data.results.map((movie, i) => (
                <div key={i} className="card animate__animated animate__zoomIn">
                    <img className='card-img' src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} alt={movie.title}/>
                </div>
            ))}
        </div>
      </SimpleBar>
      <ScrollUpButton showUnder={100} >
        <Button icon="pi pi-arrow-up" rounded aria-label="Filter" />
      </ScrollUpButton>
      <div className="container-login">
        <div className="flip-card">
          <motion.div 
            className='flip-card-inner'
            initial={false}
            animate={{rotateY: flip?180:360}}
            transition={{duration:0.3, animationDirection:'normal'}}
            onAnimationComplete={() => {setAnimate(false)}}>
              <div className="flip-card-front">
                <LoginCard />
                <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'30px'}}>
                  <Buttonn variant="contained" color="secondary" onClick={() => {handleFlip()}}>¿Aun no tienes cuenta?</Buttonn>
                </div>
              </div>

              <div className="flip-card-back">
                <RegisterCard /> 
                <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'30px'}}>
                  <Buttonn variant="contained" color="secondary" onClick={() => {handleFlip()}}>Volver al Login</Buttonn>
                </div> 
              </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default LoginHome;
