import React,  { useState } from 'react'
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import Button from '@mui/material/Button';
import 'animate.css';

const LoginCard = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handlePassword = () => {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <div className='login-content'>
        <IconField iconPosition="left">
            <InputIcon className="pi pi-user"> </InputIcon>
            <InputText placeholder="Usuario o email"/>
        </IconField>

        <IconField iconPosition="left">
            <InputIcon className={`pi ${passwordVisible ? 'pi-eye' : 'pi-eye-slash'}`} onClick={() => {handlePassword()}}> </InputIcon>
            <InputText placeholder="Contraseña" type={passwordVisible ? 'text' : 'password'}/>
        </IconField>

        <div style={{display:'flex', flexDirection:'column', padding:'10px 10px 0px 10px', gap:'20px'}}>
            <Button variant="contained" className='animate__animated animate__heartBeat animate__delay-2s'>Log In</Button>
            <Button variant="contained">Olvidé mi contraseña </Button>
        </div>
    </div>
  )
}

export default LoginCard;