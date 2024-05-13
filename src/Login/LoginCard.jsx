import React,  { useState } from 'react'
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import 'animate.css';

const LoginCard = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, formState:{errors}, handleSubmit, getValues, setError, clearErrors} = useForm();
  const handlePassword = () => {
    setPasswordVisible(!passwordVisible);
  }

  const logIn = (data) => {
    console.log(data);
  }  



  return (
    <form className='login-content' onSubmit={handleSubmit(logIn)}>
        <IconField iconPosition="left">
            <InputIcon className="pi pi-user"> </InputIcon>
            <InputText placeholder="Usuario o email" 
              className={errors.userEmail?.type === 'required' ? 'invalid' : ''}
              {...register('userEmail', {
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