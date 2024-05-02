import React,  { useState } from 'react'
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import Button from '@mui/material/Button';
import 'animate.css';

const RegisterCard = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);
    const handlePassword = () => {
      setPasswordVisible(!passwordVisible);
    }
    const handlePassword2 = () => {
        setPasswordVisible2(!passwordVisible2);
      }
  return (
    <div className='login-content'>
        <IconField iconPosition="left">
            <InputIcon className="pi pi-user"> </InputIcon>
            <InputText placeholder="Usuario"/>
        </IconField>

        <IconField iconPosition="left">
            <InputIcon className="pi pi-at"> </InputIcon>
            <InputText placeholder="Email"/>
        </IconField>

        <IconField iconPosition="left">
            <InputIcon className={`pi ${passwordVisible ? 'pi-eye' : 'pi-eye-slash'}`} onClick={() => {handlePassword()}}> </InputIcon>
            <InputText placeholder="Contraseña" type={passwordVisible ? 'text' : 'password'}/>
        </IconField>

        <IconField iconPosition="left">
            <InputIcon className={`pi ${passwordVisible2 ? 'pi-eye' : 'pi-eye-slash'}`} onClick={() => {handlePassword2()}}> </InputIcon>
            <InputText placeholder="Repite la contraseña" type={passwordVisible2 ? 'text' : 'password'}/>
        </IconField>

        <div style={{display:'flex', flexDirection:'column', padding:'10px 10px 0px 10px', gap:'20px'}}>
            <Button variant="contained" className='animate__animated animate__heartBeat animate__delay-2s'>Registrate</Button>
        </div>
    </div>
  )
}

export default RegisterCard;
