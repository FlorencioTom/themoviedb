import React,  { useState, useRef} from 'react';
import { useForm } from 'react-hook-form';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import Button from '@mui/material/Button';
import 'animate.css';

const RegisterCard = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);
    const toast = useRef(null);

    const { register, formState:{errors}, handleSubmit, getValues, setError, clearErrors} = useForm();

    const singUp = (data) => {
        console.log(data);
    }

    const handlePassword = () => {
        setPasswordVisible(!passwordVisible);
    }
    const handlePassword2 = () => {
        setPasswordVisible2(!passwordVisible2);
    }

    const checkPasswords = () => {
        if(getValues('pass') == getValues('passC')){
            console.log('si');
            clearErrors(["pass","passC"]);
        }else{
            console.log('no');
            setError("passC", {
                type: "manual",
                message: "Las contraseñas no coinciden!",
            });    
            setError("pass", {
                type: "manual",
                message: "Las contraseñas no coinciden!",
            });       
        }
    }

  return (
    <>
        <Toast ref={toast} />
        <form className='login-content' onSubmit={handleSubmit(singUp)}>
            
            <IconField iconPosition="left">
                <InputIcon className="pi pi-user"> </InputIcon>
                <InputText className={
                    errors.user?.type === 'required' || 
                    errors.user?.type === 'maxLength'? 'invalid' : ''
                }
                    placeholder="Usuario" 
                {...register('user', {
                    required:true,
                    maxLength:20   
                })}/>
            </IconField>

            <IconField iconPosition="left">
                <InputIcon className="pi pi-at"> </InputIcon>
                <InputText className={
                    errors.email?.type === 'required' || 
                    errors.email?.type === 'pattern'? 'invalid' : ''
                }
                placeholder="Email" 
                {...register('email', {
                    required:true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/  
                })}/>
            </IconField>

            <IconField iconPosition="left">
                <InputIcon className={`pi ${passwordVisible ? 'pi-eye' : 'pi-eye-slash'}`} onClick={() => {handlePassword()}}> </InputIcon>
                <InputText onKeyUp={() => {checkPasswords()}} placeholder="Contraseña" type={passwordVisible ? 'text' : 'password'} 
                className={
                    errors.pass?.type === 'required' ||
                    errors.pass ? 'invalid' : ''
                }
                {...register('pass', {
                    required:true  
                })}/>
            </IconField>

            <IconField iconPosition="left">
                <InputIcon className={`pi ${passwordVisible2 ? 'pi-eye' : 'pi-eye-slash'}`} onClick={() => {handlePassword2()}}> </InputIcon>
                <InputText onKeyUp={() => {checkPasswords()}} placeholder="Repite la contraseña" type={passwordVisible2 ? 'text' : 'password'}
                className={
                    errors.passC?.type === 'required' ||
                    errors.passC ? 'invalid' : ''
                }
                {...register('passC', {
                required:true  
                })}/>
            </IconField>
            <div style={{display:'flex', flexDirection:'column', padding:'10px 10px 0px 10px', gap:'20px'}}>
                <Button type="submit"  variant="contained" className='animate__animated animate__heartBeat animate__delay-2s'>Registrate</Button>
            </div>
        </form>
    </>
  )
}

export default RegisterCard;
