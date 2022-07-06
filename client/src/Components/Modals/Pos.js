
// import React, {useState, useEffect} from 'react';
// import { Row , Col } from 'react-bootstrap';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import ItemsCard from '../Cards/ItemsCard';
// import { TextField } from '@mui/material';
// import InputAdornment from '@mui/material/InputAdornment';
// import {BsSearch } from 'react-icons/bs'
// import Axios from 'axios'
// import OrderTable from '../Table/OrderTable';
// import Autocomplete from '@mui/material/Autocomplete';

// const styleOfBase = {
//   overflowY: 'scroll',
//   whiteSpace: 'break-spaces',
//   marginTop:'15px',
//   marginRight: '10px',
//   textAlign: 'justify',
//   height:'70vh',
//   overflowX:'hidden'
// }

// const styleofPanOn = {
//   background : '#F1EFF6',
//   height:'75vh',
//   float:'right',
//   borderRadius:'8px',
//   width:'100%',
//   transition: '.2s ease-in-out'
// }
// const styleofPanOf = {
//   background : '#F1EFF6',
//   height:'75vh',
//   float:'right',
//   borderRadius:'8px',
//   width:'0%',
//   transition: '.2s ease-in-out'
// }







// function Pos({val}){

//   const [toggleAnimation , setToggleAnimation] = useState(false);
//   const [customer , setCustomer] = useState([]);
//   const [qty, setQty] = useState(1);
//   const [rows, setRows] = useState([]);
 
  

//   Axios.get("http://localhost:8000/customers/read").then((response) => {
//             setCustomer(response.data);
//         });
//   const [list , setList] = useState('cat');
//   const changeHandle = () => {
//     setToggleAnimation(true)
//     if(val === 'cat'){
//       setList('cat');


//     }
//     else{
//       setList('brand');

//     }
//   }



//   const addRows = (name,price) => {
   
//     // try {
//     // const rowsInput = {
//     //     name:name,
//     //     qty:qty,
//     //     price:price,
//     // }
//     // setRows([...rows,rowsInput]);
//     // console.log(rows);
//     // } catch (error) {
//     //     console.log(error);
//     // }
// }
// const deleteTableRows = (index)=>{
//    if(rows.length > 0){
//     const row = [...rows];
//     row.splice(index, 1);
//     setRows(row);
//    }

// }
//   const LoadListProduct = () => {
//     const [pro, setPro] = useState([])
//     useEffect(()=> {
//       Axios.get("http://localhost:8000/product/read").then((response) => {
//         setPro(response.data);
//       });
//     }, []);
//     return(<> 
//     <div className='base' style={styleOfBase }>
//     <Col>
//     <Row style = {{justifyContent : 'center'}}>
//     {pro.map((item) => {
//       return <ItemsCard item = {item} type = {'Product'}/>
//     })}
//     </Row>
//     </Col>
//     </div>
//     </>)
//   }
//   const LoadListCategory = () => {
//     const [cat, setCat] = useState([])
//     useEffect(()=> {
//       Axios.get("http://localhost:8000/category/read").then((response) => {
//         setCat(response.data);
//       });
//     }, []);
//     return(<> <div className='base' style={styleOfBase }>
//     <Col>
//     <Row style = {{justifyContent : 'center'}}>
//     {cat.map((item) => {
//       return <ItemsCard item = {item} type = {'Category'} />
//     })}
//     </Row>
//     </Col>
//     </div>
//     </>)
//   }
//   return (<>
//     <div className='posContainer' style={{overflowX:'hidden'}}>
//       <Row>
//         <Col>
//         <Row>
//                 <Col>
//                 <h6>Customer</h6>
//                 <Autocomplete
//                     disablePortal
//                     id="combo-box-demo"
//                     value = {customer}
//                     onInputChange={(e, newVal) => {setCustomer(newVal)}}
//                     options={customer.map((val) => {
//                         return(val.name);
//                     })}
//                     size = 'small'                
//                     renderInput={(params) => <TextField {...params} label="Name" />}
//                     />
//                 </Col>
//                 <Col>
//                 <h6>QTY</h6>
//                 <TextField type='number' id="outlined-basic" label="QTY" variant="outlined" size="small" style={{width:'100%'}} onChange={(e)=>{setQty(e.target.value)}} value={qty}/>
//                 </Col>
                
//         </Row>
       
//         {/* <OrderTable rows={rows}/> */}
//         <Row>
//            <Col>
//           <Button variant="contained" style = {{backgroundColor:"#FF4069" , width:'200px'}}>
//           Order
//           </Button>
//           </Col>
//         </Row>
//         </Col>
//         <Col>
//         <div className='center' style  = {{textAlign:'center'}}>
//         <Stack spacing={2} direction="row" style={{justifyContent : "center", paddingTop: '10px' , paddingBottom:'10px'}}>
//             <Button variant="contained" 
//             style={{backgroundColor:"#059BFF" , width:'200px'}}
              
//               onClick = {() => changeHandle(val = 'cat')}
//               onAnimationEnd = {() => setToggleAnimation(false)}
//               toggleAnimation = {toggleAnimation}
//               >
//                 Category
//             </Button>
//             <Button variant="contained" style = {{backgroundColor:"#FF4069" , width:'200px'}}
//             onClick = {() => changeHandle( val = 'brand')}
//             onAnimationEnd = {() => setToggleAnimation(false)}
//             toggleAnimation = {toggleAnimation}

//             >
//                 Products
//             </Button>
//         </Stack>
//         <TextField id ="outlined-basics" label= "Search" variant='outlined' size='small'
//             style = {{
//               paddingBottom:'10px',
//               width:'400px'
//             }}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end" >
//                  <BsSearch/>
//                 </InputAdornment>
//               )
//             }}
//             />
//         </div>
//         <div className = 'panContainer' style = {toggleAnimation ? styleofPanOf : styleofPanOn}>
//         {list === 'cat' ? <LoadListCategory/> : <LoadListProduct/>}
//         </div>
//         </Col>
//       </Row>
//     </div>
//   </>)
// }

// export default Pos

