import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './scrolltop.css';
import 'animate.css';

const Scrolltop = ({top, funcion}) => {
    const [visible, setVisible] = useState(false);
    const [att, setAttr] = useState(null);
    const boton = useRef(null);

    useEffect(() => {
        if(top>300){
            setVisible(true);
        }else{
            setVisible(false);
        }
    });

    return (
        visible && <div 
        ref={boton}
        onClick={() => funcion(top)} 
         className={`container-scroll-top animate__animated animate__faster ${visible?'animate__fadeIn':'boton-oculto'}`}>
            <div >
                <FontAwesomeIcon icon={faArrowUp} />
            </div>
        </div>
    )
}

export default Scrolltop;
