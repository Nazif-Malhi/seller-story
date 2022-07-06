import React, {useState, useEffect} from 'react';
import  TextField  from '@mui/material/TextField';
import {Button , Modal, Container, Row, Col} from 'react-bootstrap';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ButtonR from '@mui/material/Button';
import FormControl1 from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';
import {MdOutlineAutorenew , MdOutlineHelpOutline} from 'react-icons/md'
import Axiox from 'axios'








export const AddCategoryModal = ({
    onHide,
    show
}) => {

     const [name , setName] = useState();
     const [parentCategory, setParentCategory] = useState();
    const [dataCat, setDataCat] = useState([])
     useEffect(()=> {
      Axiox.get("http://localhost:8000/category/read").then((response) => {
        setDataCat(response.data);
      });
    }, [show]);

    // Saving data in Database

    const submitInfo = () => {
      Axiox.post("http://localhost:8000/category/insert",{
      name:name,
      parentCategory:parentCategory,
    });
    setName('');
    setParentCategory('');
    }
return (
    <div className='addmodal_div'>
        <Modal show={show} 
        onHide={onHide}
        size="lg" 
        aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton style={{backgroundColor : '#F7F7F7'}}>
                <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>
            <Modal.Body className='show-grid'>
                <p>
                    <i style={{color:'red'}}>The field marked with * are required input fields.</i>
                </p>
            <Container>
                <Row>
                    <Col xs={10} md={6}>
                        <h6>Name*</h6>
                        <TextField id="outlined-basic" label="Type Category Name ..." variant="outlined" size='small' style={{width : '100%'}} onChange = {(e) => setName(e.target.value)} value = {name}/>
                    </Col>
                    <Col xs = {8} md = {6}>
                    <h6>Parent Category</h6>
                    <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value = {parentCategory}
                    onInputChange={(e, newVal) => {setParentCategory(newVal)}}
                    options={dataCat.map((val) => {
                        return(val.name);
                    })}
                    size = 'small'                
                    renderInput={(params) => <TextField {...params} label="Product" />}
                    
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
  )
}


//  Modal For Products 
export const AddProductModal = ({
    onHide,
    show

}) => {

  const [productType, setProductType] = useState('');
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [tax, setTax] = useState('');
  const [taxMethod, setTaxMethod] = useState('');
  const [description, setDescription] = useState('');
  const [dataCat, setDataCat] = useState([]);



  
  useEffect(()=> {
    Axiox.get("http://localhost:8000/category/read").then((response) => {
      setDataCat(response.data);
    });
  }, []);

  const submitInfo = () => {
    Axiox.post("http://localhost:8000/product/insert",{
      productType:productType,
      productName:productName,
      productCode:productCode,
      brand:brand,
      category:category,
      price:price,
      tax:tax,
      taxMethod:taxMethod,
      description:description,
  });
  setProductType('');
  setProductName('');
  setProductCode('');
  setBrand('');
  setCategory('');
  setPrice('');
  setTax('');
  setTaxMethod('');
  setDescription('');
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
    setProductCode(rand.toString())
}

  return (<div className="add_product-Modal" >  

  <Modal fullscreen show={show} onHide = {onHide}>  
  <Modal.Header closeButton style={{backgroundColor : '#F7F7F7'}}>  
    <Modal.Title>Add Products</Modal.Title>  
  </Modal.Header>  

  <Modal.Body className='show-grid' >
    <Container>
      <Row className='topSpace'>
        <Col xs={6} md={4}>
          <h6>Product Type*</h6>
          <FormControl1 sx={{ width: '100%' }} size="small">
          <InputLabel id="demo-select-small" >Type</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              label="product_type"
              value = {productType}
              onChange={(e) => setProductType(e.target.value)} 
            >
              <MenuItem value="None">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Standard</MenuItem>
              <MenuItem value={2}>Services</MenuItem>
            </Select>
            </FormControl1>

        </Col>
        <Col xs={6} md={4}>
        <h6>Product Name*</h6>
            <TextField id="outlined-basic" label="Product Name" variant="outlined" size="small" style={{width:'100%'}} onChange={(e) => setProductName(e.target.value)} value = {productName}/>
        </Col>
        <Col xs={6} md={4}>
          <h6>Product Code</h6>
          <TextField type='number' id ="outlined-basics" label= "Product Code" variant='outlined' size='small' style={{width:'100%'}} onChange={(e) => setProductCode(e.target.value)} value = {productCode}
            InputProps={{

              style :{
                paddingRight: '0px',
              },
              endAdornment: (
                <InputAdornment position="end" >
                  <ButtonR  variant="contained" endIcon={<MdOutlineAutorenew />}
                    style = {{height: '38px', marginBottom:1}}
                    onClick= {generateRandom}>
                  </ButtonR>
                </InputAdornment>
              )
            }}
            />
        </Col>
      </Row>
      <Row className='topSpace'>
      <Col xs={6} md={4}>
        <h6>Brand</h6>
        <TextField id="outlined-basic" label="brand name" variant="outlined" size="small" style={{width:'100%'}} onChange={(e) => setBrand(e.target.value)} value = {brand}/>

        </Col>
        <Col xs={6} md={4}>
        <h6>Category *</h6>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          value = {category}
          onInputChange={(e, newVal) => {setCategory(newVal)}} 
          options={dataCat.map((val) => {
            return(val.name);
          })}
          size = 'small'                
          renderInput={(params) => <TextField {...params} label="Category" />}
          
        />         
        </Col>
        <Col xs={6} md={4}>
        <h6>Product Price*</h6>
            <TextField type='number' id="outlined-basic" label="price" variant="outlined" size="small" style={{width:'100%'}} onChange={(e) => setPrice(e.target.value)} value = {price}/>
        </Col>
      </Row>
      <Row className='topSpace'>
      <Col xs={6} md={4}>
        <h6>Product Tax</h6>
        <FormControl1 sx={{ width: '100%' }} size="small">
          <InputLabel id="demo-select-small" >Tax</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              label="product_type"
              onChange={(e) => setTax(e.target.value)} 
              value = {tax}
            >
              <MenuItem value="None">
                <em>None</em>
              </MenuItem>
              <MenuItem value={2}>2%</MenuItem>
              <MenuItem value={5}>5%</MenuItem>
              <MenuItem value={10}>10%</MenuItem>
              <MenuItem value={15}>15%</MenuItem>
            </Select>
            </FormControl1>       
        </Col>
        <Col xs={6} md={4}>
        <div className='con' style={{display:"flex"}}>
        <h6>Tax Method</h6>
        <Tooltip title="Add" placement="top-start">
        <ButtonR startIcon={<MdOutlineHelpOutline />} style ={{marginTop:-5}}>
        </ButtonR>
        </Tooltip>
        </div>
        <FormControl1 sx={{ width: '100%' }} size="small">
          <InputLabel id="demo-select-small" >Tax Method</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              label="product_type"
              onChange={(e) => setTaxMethod(e.target.value)} value = {taxMethod}  
            >
              <MenuItem value="None">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Inclusive">Inclusive</MenuItem>
              <MenuItem value="Exclusive">Exclusive</MenuItem>
            </Select>
            </FormControl1>       
        </Col>
      </Row>
        <Row className='topSpace'>
          <Col xs = {18} md = {12}>
            <h6>Short Description</h6>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            style = {{width:'100%'}}
            onChange={(e) => setDescription(e.target.value)} value = {description}
          />
          </Col>
        </Row>
    </Container>
  </Modal.Body>  

  <Modal.Footer>  
    <Button variant="secondary" onClick={onHide}>Close Modal</Button>  
    <Button variant="primary" onClick={submitInfo}>Save changes</Button>  
  </Modal.Footer>  
</Modal>  
</div>
  )
}