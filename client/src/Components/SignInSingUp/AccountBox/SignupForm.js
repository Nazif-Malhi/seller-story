import React, { useContext, useState } from "react";
import Axios from 'axios'
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../Marginer";
import { AccountContext } from "./accountContext.js";
import validator from 'validator';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
function ActionAlerts() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert onClose={() => {}}>This is a success alert — check it out!</Alert>
      <Alert
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }
      >
        This is a success alert — check it out!
      </Alert>
    </Stack>
  );
}

export function SignupForm() {
  const { switchToSignin } = useContext(AccountContext);

  const [name, setName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneError , setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('')
  const [companyNameError, setCompanyNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  function PhoneValidation(event){
    const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            setPhone(event.target.value);
            if(phone.length < 11){
              setPhoneError('error');
            }
            else{
              setPhoneError('')
            }
        }
  }
  const validateEmail = (e) => {
    setEmail(e.target.value);
    if (validator.isEmail(email)) {
      setEmailError('')
    } else {
      setEmailError('error');
    }
  }

  


  const submitInfo = () => {
    if(phone.length < 11){
      setPhoneError('error');
    }
    else if(emailError === 'error'){
      setPhoneError('');
      return;
    }
    else if(name === ''){
      setNameError('error');
    }
    else if (companyName === ''){
      setCompanyNameError('error');
    }
    else if(password === ''){
      setPasswordError('error');
    }
    else if (email === ''){
      setEmailError('error');
    }
    else{
    Axios.post("http://localhost:8000/insert",{
      name:name,
      companyName:companyName,
      password:password,
      email:email,
      phone:phone,
    });
    <ActionAlerts/>
    setPhoneError('');
    setName('')
    setCompanyName('');
    setPassword('');
    setEmail('');
    setPhone('');
    switchToSignin();
    setNameError('');
    setPasswordError('');
    setCompanyNameError('');
    setEmailError('');
  }
  
  };
  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Name" value={name} onChange={(e) => {
          setName(e.target.value)
        }} style={{borderBottom : nameError === 'error' ? '2px solid rgb(255, 0, 0)' : null}}/>
        <Input type="text" placeholder="CompanyName" value={companyName} onChange={(e) => {
          setCompanyName(e.target.value)
        }} style={{borderBottom : companyNameError === 'error' ? '2px solid rgb(255, 0, 0)' : null}}/>
        <Input type="email" placeholder="Email" value={email} onChange={(e) => {
          validateEmail(e)
        }} style={{borderBottom : emailError === 'error' ? '2px solid rgb(255, 0, 0)' : null}}/>
        <Input type="text" value = {phone} placeholder="Phone"  onChange={(e) => {
          PhoneValidation(e)
        }} style={{borderBottom : phoneError === 'error' ? '2px solid rgb(255, 0, 0)' : null}}/>
        <Input type="password" placeholder="Password" value = {password} onChange={(e) => {
          setPassword(e.target.value)
        }} style={{borderBottom : passwordError === 'error' ? '2px solid rgb(255, 0, 0)' : null}}/>

      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={submitInfo}><i>Signup</i></SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink>
        <b><i>Already have an account?</i></b>
        <BoldLink onClick={switchToSignin}>
          <b><i>Signin</i></b>
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}