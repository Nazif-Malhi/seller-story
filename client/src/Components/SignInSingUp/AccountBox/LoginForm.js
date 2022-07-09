//Impoorting Libraries

import React, { useContext , useEffect , useState} from "react";
import { profile } from "../../Global";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton
} from "./common";
import { Marginer } from "../Marginer";
import { AccountContext } from "./accountContext";
import Axios from 'axios';
import {useNavigate } from 'react-router-dom';



export function LoginForm({handleRoute}) {
  const { switchToSignup } = useContext(AccountContext);
  const [authentication , setAuthentication] = useState([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error , setError] = useState('');
  
  
  useEffect(()=> {
    Axios.get("http://localhost:8000/read").then((response) => {
      setAuthentication(response.data);
    });
  }, []);

  let navigate = useNavigate();

  const validateAuthentication = () => {
    
    let tempPassword = '';
    try {
      tempPassword=authentication.find(x => x.name === name).password;
      
      
      if(tempPassword !== ''){
        if(tempPassword === password){
          let id = authentication.find(x => x.name === name)._id;
          profile.id = id;
          console.log(profile.id);
          navigate('/dashboard');
          handleRoute();
          setError('');
        }
        else{
          navigate('/seller-story');
          
          setError('error');
        }
      }
      else{
        setError('error');
        
      }
    } catch (err) {
      setError('error')
    }
    setName('');
    setPassword('');
  }
  return (
    <BoxContainer>
      <FormContainer>
        <Input type="name" placeholder="Email" value = {name} onChange={(e) => {setName(e.target.value)}}  style={{borderBottom : error === 'error' ? '2px solid rgb(255, 0, 0)' : null}}/>
        <Input type="password" placeholder="Password" value= {password} onChange={(e) => {setPassword(e.target.value)}} style={{marginTop:'5px' , borderBottom : error === 'error' ? '2px solid rgb(255, 0, 0)' : null}}/>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={validateAuthentication}><i>Signin</i></SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink >
        <b><i>Don't have an account ?{" "}</i></b>
        <BoldLink  onClick={switchToSignup}>
          <b><i>Signup</i></b>
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}