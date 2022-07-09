import React, {useState, useEffect} from 'react';
import ButtonR from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import {Button , Modal, Container, Row, Col} from 'react-bootstrap';

// For date 
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import  TextField  from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Axios from 'axios'
export const AddExpenseCategoryModal = ({
    onHide,
    show
}) => {

  const [code, setCode] = useState('');
  const [name, setName] = useState('');


  const submitInfo = () => {
    Axios.post("http://localhost:8000/expenseCategory/insert", {
      code:code,
      name:name
    });
    setCode('');
    setName('');
  }
  const generateRandom = () => {
    let min = 99999;
    let max = 999999;
    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor( rand * difference);

    // add with min value 
    rand = rand + min;
    setCode(rand.toString())
}
  return (<>
  <div className='addmodal_div'>
      <Modal show={show} onHide={onHide}
      size="lg" 
      aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton style={{backgroundColor : '#F7F7F7'}}>
          <Modal.Title>Add Expense Category</Modal.Title>
        </Modal.Header>
        <Modal.Body className='show-grid'>
        <p><i style={{color:'red'}}>The field marked with * are required input fields.</i></p>
        <Container>

            <Row>
              <Col xs={10} md={6}>
              <h6>Code *</h6>
                <TextField type = 'number' id ="outlined-basics" label= "Code" variant='outlined' size='small'
                  InputProps={{

                    style :{
                      paddingRight: '0px',
                      width:'100%'
                    },
                    endAdornment: (
                      <InputAdornment position="end" >
                        <ButtonR  variant="contained"
                          style = {{height: '38px', marginBottom:1}}
                          onClick = {generateRandom}>
                            Generate
                        </ButtonR>
                      </InputAdornment>
                    )
                  }}
                  value = {code}
                  onChange = {(e) => {setCode(e.target.value)}}
                  />
              </Col>
              <Col xs = {8} md = {6}>
                <h6>Name *</h6>
                <TextField type='text' id="outlined-basic" label="Name" variant="outlined" size="small"
                value = {name}
                onChange = {(e) => {setName(e.target.value)}}
                style = {{width:'100%'}}/>
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
  </>
  )
}


export const AddExpenseModal = ({
    onHide,
    show
}) => {
    const [value, setValue] = useState(new Date());
    const [category, setCategory] = useState([]);

    const [catSelect, setCatSelect] = useState('');
    const [amount, setAmount] = useState('');
    const [des, setDes] = useState('');

    useEffect(()=> {
      Axios.get("http://localhost:8000/expenseCategory/read").then((response) => {
        setCategory(response.data);
      });
    }, []);
    function dateIsValid(dateStr) {
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    
      if (dateStr.match(regex) === null) {
        return false;
      }
    
      const [day, month, year] = dateStr.split('/');
    
      // 👇️ format Date string as `yyyy-mm-dd`
      const isoFormattedStr = `${year}-${month}-${day}`;
    
      const date = new Date(isoFormattedStr);
    
      const timestamp = date.getTime();
    
      if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
        return false;
      }
    
      return date.toISOString().startsWith(isoFormattedStr);
    }
    const submitInfo = () => {
      if(value ==="" || catSelect === '' || amount === ''){
        alert('Please Fill The Feilds correctly')
      }
      else{
      Axios.post("http://localhost:8000/expense/insert", {
        date:value,
        expenseCategory:catSelect,
        amount:amount,
        des:des
      });
      console.log(catSelect)
      setValue(new Date());
      setCatSelect('');
      setAmount('');
      setDes('');
    }
  }

  return (<>
  <div className='addmodal_div'>
      <Modal show={show} onHide={onHide}
      size="lg" 
      aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton style={{backgroundColor : '#F7F7F7'}}>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body className='show-grid'>
        <p><i style={{color:'red'}}>The field marked with * are required input fields.</i></p>
        <Container>

            <Row>
              <Col xs={10} md={6}>
              <h6>Date *</h6>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="For desktop"
                value={value}
                minDate={new Date('2017-01-01')}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField size='small' {...params} style={{width:'100%'}}/>}
              />
        </LocalizationProvider>
              </Col>
              <Col xs = {10} md = {6}>
                <h6>Expense Category *</h6>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  value={catSelect}
                  onInputChange={(e,val) => {setCatSelect(val)}}
                  options={category.map((val) => {
                    return(val.name);
                })}
                
                  sx={{ width: '100%' }}
                  size = 'small'
                  renderInput={(params) => <TextField {...params} label="category"
                 
                  
                  />}
                />
              </Col>
              </Row>
              <Row>
              <h6>Amount *</h6>
              <Col xs = {18} md = {12}>
              <TextField type={'number'} id="outlined-basic" label="Amount" variant="outlined" size="small" style={{width:'100%'}}
              value = {amount}
              onChange = {(e) => {setAmount(e.target.value)}}/>

              </Col>
              </Row>
              <Row>
                <Col xs = {18} md = {12}>
                <h6>Description</h6>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  style = {{width:'100%'}}
                  value = {des}
                  onChange = {(e) => {setDes(e.target.value)}}
                />
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
  </>
  )
}