import React, { useState, useContext, useRef, useEffect } from 'react';
import {useParams, NavLink, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav';
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

const Favoritos = () => {
    const token = import.meta.env.VITE_TOKEN_THEMOVIEDB_API;
    const [generos, setGeneros] = useState(null);

    const [pelisTodas, setPelisTodas] = useState(null);
    const [topScroll, setTopScroll] = useState(0);
    const scrollableNodeRef = useRef(null);
    const [loginVisible, setLoginVisible] = useState(false);
    const {user, tokenjwt} = useContext(loginContext);
    const containerLogin = useRef(null);
    const [flip, setFlip] = useState(false);
    const [animatee, setAnimate] = useState(false);
    const navigate = useNavigate();

    const [pelis, setPelis] = useState(null);
    const [actores, setActores] = useState(null);
    const [series, setSeries] = useState(null);    


    return (
        <>
            <Nav enFav={true}/>
        </>
    )
}

export default Favoritos;
