import React, { useContext , useEffect , useState} from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
  LogButton
} from "./common";
import { Marginer } from "../Marginer";
import { AccountContext } from "./accountContext";
import Axios from 'axios';





export function LoginForm() {
  const { switchToSignup } = useContext(AccountContext);
  const [authentication , setAuthentication] = useState([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  
  useEffect(()=> {
    Axios.get("http://localhost:8000/read").then((response) => {
      setAuthentication(response.data);
    });
  }, []);

  const validateAuthentication = () => {
    let tempPassword = '';
    tempPassword=authentication.find(x => x.name === name).password;
    if(tempPassword === password){
      
    }
    else{

    }
  }
  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" onChange={(e) => {setName(e.target.value)}}/>
        <Input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <LogButton type="submit" onClick={validateAuthentication}>Signin</LogButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}