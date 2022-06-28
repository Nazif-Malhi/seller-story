import React, {useState, useEffect} from 'react';
import {Card, Button, Container, Col, Row} from 'react-bootstrap';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl1 from '@mui/material/FormControl';
import  TextField  from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import FormsTable from '../Table/FormsTable';
import Axios from 'axios'
import { InputLabel, MenuItem, Select } from '@mui/material';


const styleOfOverallCol = {
    border:'1px solid', height:'40px' , alignItems:'center', display:'flex' , borderColor:'#cecece'
}
const styleOfRight = {
    textAlign:'right', paddingLeft:'5px'
}




const PurchaseForm = () => {
    const [value, setValue] = useState(new Date());
    const [rows, setRows] = useState([]);
    const [name, setName] = useState('');
    const [qty, setQty] = useState('');
    const [product, setProduct] = useState([]);
    const [supplier , setSupplier] = useState([]);
    const [supplierName, setSupplierName]= useState('');
    const [purchaseStatus, setPurchaseStatus] = useState('');
    const [orderTax, setOrderTax]= useState(0.000);
    const [orderDiscount, setOrderDiscount]= useState(0.000);
    const [shippingCost, setShippingCost]= useState(0.000);
    const [itemCost, setItemCost]=useState(0.000);
    const [total, setTotal] = useState(0.000);
    const [grandTotal, setGrandTotal] = useState(0.000);
    const [subTotal, setSubTotal] = useState(0);

    useEffect(()=> {
        Axios.get("http://localhost:8000/product/read").then((response) => {
            setProduct(response.data);
        });
        Axios.get("http://localhost:8000/supplier/read").then((response) => {
            setSupplier(response.data);
        });
      }, []);

    const addRows = () => {
        console.log(name);
        try {
            let code=product.find(x => x.productName === name).productCode;
            console.log(code);
        var price=product.find(x => x.productName === name).price;
        var tax=product.find(x => x.productName === name).tax;
        let method=product.find(x => x.productName === name).method;
        var tempSubTotal = 0;
        var newPrice = parseInt(price) * parseInt(qty)
        var newTax = (parseInt(newPrice) / 100) * parseInt(tax);
        if(method === 'Inclusive'){
            tempSubTotal = parseInt(newTax) + parseInt(price);
        }
        else{
            tempSubTotal = parseInt(price) - parseInt(newTax);
        }
        const rowsInput = {
            name:name,
            code:code,
            qty:qty,
            price:price,
            tax:tax,
            subTotal:tempSubTotal
        }
        setRows([...rows,rowsInput])
        finalCalculation();
        console.log(rows);
        } catch (error) {
            console.log(error);

        }
    }
    const deleteTableRows = (index)=>{
       if(rows.length > 0){
        console.log('come index')
        console.log(index);
        const row = [...rows];
        row.splice(index, 1);
        setRows(row);
       }
   
   }
   const changeOrderTax = (e) => {
    setOrderTax(e.target.value);
    finalCalculation();

}
const changeOrderDiscount = (e) => {
    setOrderDiscount(e.target.value);
    finalCalculation();

}
const changeOrderShippingCost = (e) => {
    setShippingCost(e.target.value);
    finalCalculation();
}
const finalCalculation = () => {
    let tempItemCost = 0;
    rows.map((value) => {
       return tempItemCost += parseInt(value.price);
    })
    setItemCost(tempItemCost);
    let tempSubTotal = 0;
    rows.map((value) => {
        return tempSubTotal += parseInt(value.subTotal);
    })
    setSubTotal(tempSubTotal);
    let tempGrandTotal = 0;

    let overAllDiscount =parseInt(subTotal) - (parseInt(subTotal) * (parseInt(orderDiscount) / 100));
    var newTax = (parseInt(overAllDiscount) / 100) * parseInt(orderTax);

    tempGrandTotal = parseInt(newTax) + overAllDiscount;
    setGrandTotal(tempGrandTotal)
}
  return (<>
  <Card>
  <Card.Header as="h5">Add Purchase</Card.Header>
  <Card.Body>
    <Card.Text>
        <p><i>The field labels marked with * are required input fields.</i></p>
        <Container>
            <Row>
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
                <Col>
                <h6>Supplier</h6>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value = {supplierName}
                    onInputChange={(e, newVal) => {setSupplierName(newVal)}}
                    options={supplier.map((val) => {
                        return(val.name);
                    })}
                    size = 'small'                
                    renderInput={(params) => <TextField {...params} label="Name" />}
                    />
                </Col>
                <Col>
                <h6>Purchase Status</h6>
                <FormControl1 sx={{ width: '100%' }} size="small">
                <InputLabel id="demo-select-small" >select</InputLabel>
                    <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="product_type"
                    onChange={(e) => setPurchaseStatus(e.target.value)} 
                    value = {purchaseStatus}
                    >
                    <MenuItem value={0}>Received</MenuItem>
                    <MenuItem value={1}>Partial</MenuItem>
                    <MenuItem value={2}>Pending</MenuItem>
                    <MenuItem value={3}>Ordered</MenuItem>
                    </Select>
                    </FormControl1>
                </Col>
            </Row>
            
            <Row>
            <h6>Select Product</h6>
                <Col>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value = {name}
                    onInputChange={(e, newVal) => {setName(newVal)}}
                    options={product.map((val) => {
                        return(val.productName);
                    })}
                    size = 'small'                
                    renderInput={(params) => <TextField {...params} label="Product" />}
                    
                    />
                </Col>
                <Col>
                <TextField type='text' id="outlined-basic" label="QTY" variant="outlined" size="small" style={{width:'100%'}} onChange={(e)=>{setQty(e.target.value)}} value={qty}/>
                </Col>
            </Row>
            <Row>
            <Button variant="primary" style={{marginTop:'30px', marginBottom:'30px'}} onClick={() => {addRows()}}>Go somewhere</Button>
            </Row>
            <Row>
                <h5>Order Table *</h5>
                <div className="table" style={{width:'96%' , margin:'2%'}}>
                <FormsTable rows = {rows} deleteTableRows={deleteTableRows}/>
                </div>
            </Row>
            
            <Row>
                <Col> 
                <h6>Note</h6>
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        style = {{width:'100%'}}
                    />
                </Col>
            </Row>
            <Row>
            <Col>
                <TextField type='text' id="outlined-basic" label="Order Tax" variant="outlined" size="small" style={{width:'100%'}} onChange={(e)=>{changeOrderTax(e)}} value={orderTax}/>
            </Col>
            <Col>
                <TextField type='text' id="outlined-basic" label="Order Discount" variant="outlined" size="small" style={{width:'100%'}} onChange={(e)=>{changeOrderDiscount(e)}} value={orderDiscount}/>
            </Col>
            <Col>
                <TextField type='text' id="outlined-basic" label="Shipping Cost" variant="outlined" size="small" style={{width:'100%'}} onChange={(e)=>{changeOrderShippingCost(e)}} value={shippingCost}/>
            </Col>
            </Row>
        </Container>
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
    <div className='ToalDescription' style={{paddingTop:'40px'}}>
        <Container>
            <Row>
                <Col style={styleOfOverallCol}>
                    <Col>
                    <div class="pull-left">
                        Items
                    </div>
                    </Col>
                    <Col>
                    <div style={styleOfRight}>
                        {itemCost}
                    </div>
                    </Col>
                </Col>
                <Col style={styleOfOverallCol}>
                    <Col>
                    <div class="pull-left">
                        Total
                    </div>
                    </Col>
                    <Col>
                    <div style={styleOfRight}>
                        {subTotal}
                    </div>
                    </Col>
                </Col>
                <Col style={styleOfOverallCol}>
                    <Col>
                    <div class="pull-left">
                        Order tax
                    </div>
                    </Col>
                    <Col>
                    <div style={styleOfRight}>
                        {orderTax}
                    </div>
                    </Col>
                </Col>
                <Col style={styleOfOverallCol}>
                    <Col>
                    <div class="pull-left" style={{width:'120px'}}>
                        Order Discount
                    </div>
                    </Col>
                    <Col>
                    <div style={styleOfRight}>
                        {orderDiscount}
                    </div>
                    </Col>
                </Col>
                <Col style={styleOfOverallCol}>
                    <Col>
                    <div class="pull-left" style={{width:'100px'}}>
                        Shipping Cost
                    </div>
                    </Col>
                    <Col>
                    <div style={styleOfRight}>
                        {shippingCost}
                    </div>
                    </Col>
                </Col>
                <Col style={styleOfOverallCol}>
                    <Col>
                    <div class="pull-left" style={{width:'100px'}}>
                        Grand Total
                    </div>
                    </Col>
                    <Col>
                    <div style={styleOfRight}>
                        {grandTotal}
                    </div>
                    </Col>
                </Col>

            </Row>
        </Container>
        </div>
  </>
  )
}

export default PurchaseForm