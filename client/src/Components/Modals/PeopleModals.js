import React, { useState } from 'react';
import {Button , Modal, Container, Row, Col} from 'react-bootstrap';
import  TextField  from '@mui/material/TextField';
import Axios from 'axios';


export const AddPeopleModal = ({
    onHide,
    show,
    title
}) => {
  const [name, setName] = useState('');
  const [email, setEmail]= useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const submitInfo = () => {
    if(title === 'Add Customer'){
      Axios.post("http://localhost:8000/customer/insert",{
        name:name,
        email:email,
        address:address,
        city:city,
        state:state,
        phone:phone,
      });
    }
    else{
      Axios.post("http://localhost:8000/supplier/insert",{
        name:name,
        email:email,
        address:address,
        city:city,
        state:state,
        phone:phone,
      });
    }
    setName('');
    setEmail('');
    setAddress('');
    setCity('');
    setState('');
    setPhone('');
  }

  return (
    <div className='addmodal_div'>
    <Modal show={show} onHide={onHide}
    size="lg" 
    aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton style={{backgroundColor : '#F7F7F7'}}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='show-grid'>
      <p><i style={{color:'red'}}>The field marked with * are required input fields.</i></p>
      <Container>
          <Row>
              <Col>
              <h6>Name *</h6>
              <TextField id="outlined-basic" label="Name" variant="outlined" size="small" style={{width:'100%'}} onChange={(e) => setName(e.target.value)} value={name}/>
              </Col>
              <Col>
              <h6>Email *</h6>
              <TextField type='email' id="outlined-basic" label="Email" variant="outlined" size="small" style={{width:'100%'}} onChange={(e) => setEmail(e.target.value)} value={email}/>
              </Col>
          </Row>
          <Row>
              <Col>
              <h6>Phone Number *</h6>
              <TextField id="outlined-basic" label="Phone Number" variant="outlined" size="small" style={{width:'100%'}} onChange={(e) => setPhone(e.target.value)} value={phone}/>
              </Col>
              <Col>
              <h6>Address</h6>
              <TextField  id="outlined-basic" label="Address" variant="outlined" size="small" style={{width:'100%'}} onChange={(e) => setAddress(e.target.value)} value={address}/>
              </Col>
          </Row>
          <Row>
              <Col>
              <h6>City</h6>
              <TextField id="outlined-basic" label="City" variant="outlined" size="small" style={{width:'100%'}} onChange={(e) => setCity(e.target.value)} value={city}/>
              </Col>
              <Col>
              <h6>State</h6>
              <TextField  id="outlined-basic" label="State" variant="outlined" size="small" style={{width:'100%'}} onChange={(e) => setState(e.target.value)} value={state}/>
              </Col>
          </Row>
      </Container>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={submitInfo}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}