import React,  { useState, useContext } from 'react'
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { loginContext } from './loginContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Button from '@mui/material/Button';
import 'animate.css';

const LoginCard = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, formState:{errors}, handleSubmit} = useForm();
  const {setUser} = useContext(loginContext);
  const {setToken} = useContext(loginContext);
  
  const handlePassword = () => {
    setPasswordVisible(!passwordVisible);
  }

  const logIn = async(data) => {
    //console.log(data);
    try {
      const response = await axios.post('http://localhost:3002/usuarios/login', data);
      //console.log(response); // Maneja la respuesta según sea necesario
      setUser(response.data.data.usuario);
      setToken(response.data.data.token);
      console.log(response.data.data.usuario);
      console.log(response.data.data.token);
    } catch (error) {
      console.error('Error en el login:', error);
    }
  }  



  return (
    <form className='login-content' onSubmit={handleSubmit(logIn)}>
        <IconField iconPosition="left">
            <InputIcon className="pi pi-user"> </InputIcon>
            <InputText placeholder="Usuario o email" 
              className={errors.userEmail?.type === 'required' ? 'invalid' : ''}
              {...register('email', {
                required:true 
              })}
            />
        </IconField>

        <IconField iconPosition="left">
            <InputIcon className={`pi ${passwordVisible ? 'pi-eye' : 'pi-eye-slash'}`} onClick={() => {handlePassword()}}> </InputIcon>
            <InputText placeholder="Contraseña" type={passwordVisible ? 'text' : 'password'}
            className={errors.password?.type === 'required' ? 'invalid' : ''}
            {...register('password', {
              required:true  
            })}/>
        </IconField>

        <div style={{display:'flex', flexDirection:'column', padding:'10px 10px 0px 10px', gap:'20px'}}>
            <Button type="submit" variant="contained" className='animate__animated animate__heartBeat animate__delay-2s'>Log In</Button>
            <Button variant="contained">Olvidé mi contraseña </Button>
        </div>
    </form>
  )
}

export default LoginCard;