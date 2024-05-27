import React from 'react';
import { useParams } from 'react-router-dom';

const Genero = () => {
  let { id } = useParams();
  return (
    <div> Genero: {id} </div>
  )
}

export default Genero;
