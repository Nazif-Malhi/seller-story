import React, {useState, useEffect} from 'react';
import OrderTable from '../Table/OrderTable';
import Autocomplete from '@mui/material/Autocomplete';
import Axios from 'axios';
import {Col, Row,Container,Button} from 'react-bootstrap';
import  TextField  from '@mui/material/TextField';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { PickersCalendarHeader } from '@mui/x-date-pickers/internals';






const Pos = () => {
    const [value, setValue] = useState(new Date());

    const [customer , setCustomer] = useState([]);
    const [product, setProduct] = useState([]);
    const [newCustomer, setNewCustomer] = useState('');
    const [newProduct, setNewProduct] = useState('');
    const [qty, setQty] = useState('');
    const [rows, setRows] = useState([]);
    const [price, setPrice] = useState(0);


    
useEffect(()=> {
    Axios.get("http://localhost:8000/customer/read").then((response) => {
        setCustomer(response.data);
    });
    Axios.get("http://localhost:8000/product/read").then((response) => {
        setProduct(response.data);
    });
  }, []);

  
  const addRows = () => {
    try {
        var price=product.find(x => x.productName === newProduct).price;
        var tax=product.find(x => x.productName === newProduct).tax;
        let method=product.find(x => x.productName === newProduct).method;
        var tempSubTotal = 0;
        var newPrice = parseInt(price) * parseInt(qty)
        var newTax = (parseInt(newPrice) / 100) * parseInt(tax);
        if(method === 'Inclusive'){
            tempSubTotal = parseInt(newTax) + parseInt(newPrice);
        }
        else{
            tempSubTotal = parseInt(newPrice) - parseInt(newTax);
        }
        const rowsInput = {
            name:newProduct,
            qty:qty,
            price:tempSubTotal,
        }
        setRows([...rows,rowsInput]);
        } catch (error) {
            console.log(error);
        }
}
const deleteTableRows = (index)=>{
   if(rows.length > 0){
    const row = [...rows];
    row.splice(index, 1);
    setRows(row);
   }
}
  return (
    <div className='Pos'>
        <Container>
        <Row>
                <Col>
                <h6>Customer</h6>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value = {newCustomer}
                    onInputChange={(e, newVal) => {setNewCustomer(newVal)}}
                    options={customer.map((val) => {
                        return(val.name);
                    })}
                    size = 'small'                
                    renderInput={(params) => <TextField {...params} label="Name" />}
                    />
                </Col>
                <Col>
                <h6>Date *</h6>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    label="Pick"
                    value={value}

                    minDate={new Date('2017-01-01')}
                    onChange={(newValue) => {
                    setValue(newValue);
                    }}
                    renderInput={(params) => <TextField size='small' {...params} style={{width:'100%'}}/>}
                />
                </LocalizationProvider>
                </Col>
                </Row>
                <Row>
                <Col>
                <h6>Product</h6>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value = {newProduct}
                    onInputChange={(e, newVal) => {setNewProduct(newVal)}}
                    options={product.map((val) => {
                        return(val.productName);
                    })}
                    size = 'small'                
                    renderInput={(params) => <TextField {...params} label="Name" />}
                    />
                </Col>
                <Col>
                <h6>Qty</h6>
                <TextField type='number' id="outlined-basic" label="QTY" variant="outlined" size="small" style={{width:'100%'}} onChange={(e)=>{setQty(e.target.value)}} value={qty}/>
                </Col>
                </Row>
                <Row>
                <Button variant="primary" style={{marginTop:'30px', marginBottom:'30px'}} 
            onClick={() => {addRows()}}>
            Add Product
            </Button>
                </Row>
        </Container>
    <OrderTable rows={rows} deleteTableRows={deleteTableRows}/>
    </div>
  )
}

export default Pos;