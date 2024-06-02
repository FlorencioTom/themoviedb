import React, {useState} from 'react';
import Nav from '../Nav/Nav';

const Actores = () => {
    const [loginVisible, setLoginVisible] = useState(false);
    const handleProfile = (data) => {
        setLoginVisible(data);
    }
    const filtroPelisTexto = (texto) => {

    }

    return (
        <>
            <Nav info={handleProfile} peli={true} filtroPelisTexto={filtroPelisTexto} estado={!loginVisible}/>
        </>
    )
}

export default Actores;
