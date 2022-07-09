import React , {useEffect, useState} from 'react';
import {Button , Modal, Row, Col} from 'react-bootstrap';
import  TextField  from '@mui/material/TextField';
import Axios from 'axios';
import { profile } from '../Global';





export const ChangeProfile = ({
    onHide,
    show
}) => {
    const [authentication,setAuthentication] = useState([])
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=> {
        Axios.get("http://localhost:8000/read").then((response) => {
          setAuthentication(response.data);
          let tempName=authentication.find(x => x._id === profile.id).name;
          let tempcompanyName=authentication.find(x => x._id === profile.id).companyName;
          let tempemail=authentication.find(x => x._id === profile.id).email;
          let tempphone=authentication.find(x => x._id === profile.id).phone;
          let temppassword=authentication.find(x => x._id === profile.id).password;
          setName(tempName);
          setCompanyName(tempcompanyName);
          setEmail(tempemail);
          setPhone(tempphone);
          setPassword(temppassword);
        });
      }, [show]);

       const update = () => {
        if(phone.length < 11){
            alert('error');
          }
          else if(name === ''){
            alert('error');
          }
          else if (companyName === ''){
            alert('error');
          }
          else if(password === ''){
            alert('error');
          }
          else if (email === ''){
            alert('error');
          }
          else{
        Axios.put("http://localhost:8000/update", {id:profile.id,name:name, companyName:companyName,email:email,phone:phone,password:password})
          }}
      const deleteName=()=>{
        Axios.delete(`http://localhost:8000/delete/${profile.id}`);
        setPhone('');
        setName('')
        setCompanyName('');
        setPassword('');
        setEmail('');
        setPhone('');
      }
return (
    <div className='addmodal_div'>
        <Modal show={show} 
        onHide={onHide}
        size="lg" 
        aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton style={{backgroundColor : '#F7F7F7'}}>
                <Modal.Title>Update User Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body className='show-grid'>
            <Row>
            <Col>
            <h6>Name</h6>
                <TextField type='text' id="outlined-basic" label="Name" variant="outlined" size="small" style={{width:'100%'}} onChange={(e)=>{setName(e.target.value)}} value={name}/>
                </Col>
                <Col>
                <h6>Company Name</h6>

                <TextField type='text' id="outlined-basic" label="Company Name" variant="outlined" size="small" style={{width:'100%'}} onChange={(e)=>{setCompanyName(e.target.value)}} value={companyName}/>
                </Col>
            </Row>
            <Row>
            <Col>
            <h6>Email</h6>

                <TextField type='text' id="outlined-basic" label="Email" variant="outlined" size="small" style={{width:'100%'}} onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                </Col>
                <Col>
                <h6>Phone</h6>

                <TextField type='number' id="outlined-basic" label="Phone" variant="outlined" size="small" style={{width:'100%'}} onChange={(e)=>{setPhone(e.target.value)}} value={phone}/>
                </Col>
            </Row>
            <Row>
            <Col>
            <h6>Password</h6>

                <TextField type='text' id="outlined-basic" label="Password" variant="outlined" size="small" style={{width:'100%'}} onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Close
            </Button>
            <Button variant="primary" onClick={update}>
                Edit
            </Button>
            <Button variant="danger" onClick={deleteName}>
                Delete
            </Button>
        </Modal.Footer>
        </Modal>
    </div>
  )
}
