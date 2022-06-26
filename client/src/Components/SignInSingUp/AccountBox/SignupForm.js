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

export function SignupForm(props) {


  const { switchToSignin } = useContext(AccountContext);

  const [name, setName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('')
  const [active, setActive] = useState('')

  const submitInfo = () => {
    console.log(name + companyName)
    Axios.post("http://localhost:8000/insert",{
      name:name,
      companyName:companyName,
      password:password,
      email:email,
      phone:phone,
    });
  };
  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Name" onChange={(e) => {
          setName(e.target.value)
        }}/>
        <Input type="password" placeholder="CompanyName" onChange={(e) => {
          setCompanyName(e.target.value)
        }}/>
        <Input type="email" placeholder="Email" onChange={(e) => {
          setEmail(e.target.value)
        }}/>
        <Input type="password" placeholder="Phone" onChange={(e) => {
          setPhone(e.target.value)
        }}/>
        <Input type="password" placeholder="Password" onChange={(e) => {
          setPassword(e.target.value)
        }}/>
        <Input type="password" placeholder="Confirm Password"/>

      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={submitInfo}>Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}