import React, {useState, useEffect} from 'react';
import Stack from '@mui/material/Stack';
import ButtonR from '@mui/material/Button';
import {IoMdAdd} from 'react-icons/io';
import {MdOutlineImportExport} from 'react-icons/md';
import ImportingModals from '../Modals/ImportingModals';
import { AddCategoryModal, AddProductModal } from '../Modals/InventoryModals';
// import { columnsHeader , columnsHeaderProduct, rows, rowsProduct} from '../Data/TableData';
import EnhanceTable from '../Table/EnhanceTable';
import Axios from 'axios';



// Data for Category

function createData(category,	parentCategory,	numOfPro,	stockQuantity, worth) {
  return { category,	parentCategory,	numOfPro,	stockQuantity, worth};
}

 //const rows = [
   // createData('Cupcake', 305, 3.7, 305, 3.7, 305),
//   createData('Donut', 452, 25.0,305, 3.7, 3.7, 305, 3.7,305, 3.7),
//   createData('Eclair', 262, 16.0,305, 305, 3.7, 305, 3.7,305, 3.7),
//   createData('Frozen yoghurt', 159,305, 3.7, 305, 3.7, 305, 3.7,305, 3.7),
//   createData('Gingerbread', 356, 16.0,305, 3.7, 305, 3.7, 305, 3.7,305),
//   createData('Honeycomb', 408, 3.2,305, 3.7, 305, 3.7, 305, 3.7, 3.7),
//   createData('Ice cream sandwich', 237, 9.0,305, 3.7,305, 305, 3.7, 305, 3.7),
//   createData('Jelly Bean', 375, 0.0,305, 3.7, 305, 305, 3.7, 305, 3.7),
//   createData('KitKat', 518, 26.0, 305, 3.7, 3.7, 305, 3.7, 305, 3.7),
//   createData('Lollipop', 392, 0.2,305, 305, 3.7, 305, 3.7, 305, 3.7),
//   createData('Marshmallow', 318, 0 , 3.7, 305, 3.7, 305, 3.7, 305, 3.7),
//   createData('Nougat', 360, 19.0, 3.7, 305, 3.7, 305, 3.7, 305, 3.7),
//   createData('Oreo', 437, 18.0,305, 3.7, 3.7, 305, 3.7, 305, 3.7),
 //]
// .sort((a, b) => (a.calories < b.calories ? -1 : 1));


// Category 
export const Category = () => {
  
    const [showImport, setShowImport] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
     const [rows,setRows] = useState([]);

     const columnsHeader = [
      'Category',
      'Parent Category',
    ]
    useEffect(()=> {
      Axios.get("http://localhost:8000/category/read").then((response) => {
        setRows(response.data);
      });
    }, []);

    

    function hideModalImport(){
        setShowImport(false);
    }
    function hideModalAdd(){
      setShowAddModal(false);
    }

  return (<>
    <div className='main_container' style={{padding:10}}>
      <div  style={{paddingBottom:20,display:"flex",justifyContent:"space-between"}} >
        <Stack spacing={2} direction="row">
            <ButtonR variant="contained" startIcon={<IoMdAdd />} onClick = {() => setShowAddModal(!showAddModal)}>
                Add Category's
            </ButtonR>
            <ButtonR variant="contained" startIcon={<MdOutlineImportExport />} onClick = {() => setShowImport(!showImport)}>
                Import
            </ButtonR>
        </Stack>


        {/* Calling Importing Modal */}
        <ImportingModals 
        show={showImport}
        onHide = {hideModalImport}
        title = {"Import Category"}
        para = {"The correct column order is (name*, parent_category) and you must follow this."}
        />
        {/* Calling Modal Add Category */}
        <AddCategoryModal
        show = {showAddModal}
        onHide = {hideModalAdd}
        />
      </div>
    </div>
     {/* Data Grid */}
     <div className="table" style={{width:'96%' , margin:'2%'}}>
        <EnhanceTable 
        rows={rows}
        columnsHeader = {columnsHeader}
        />
        </div>
  </>)
}

// Product

export const Product = () => {
    const [showImport, setShowImport] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [rows,setRows] = useState([]);
    const columnsHeader = [
      'Name',
      'Type',
      'Code',
      'Brand',
      'Category',
      'price',
      'Tax',
      'Tax Method',
      'Description'
    ]

    useEffect(()=> {
      Axios.get("http://localhost:8000/product/read").then((response) => {
        setRows(response.data);
      });
    }, []);
    

    function hideModalImport(){
        setShowImport(false);
    }
    function hideModalAdd(){
      setShowAddModal(false);
    }
  return (<>
      <div className='main_container' style={{padding:10}}>
        <div  style={{paddingBottom:20,display:"flex",justifyContent:"space-between"}} >
            <Stack spacing={2} direction="row">
                <ButtonR variant="contained" startIcon={<IoMdAdd />} onClick = {() => setShowAddModal(!showAddModal)}>
                    Add Product
                </ButtonR>
                <ButtonR variant="contained" startIcon={<MdOutlineImportExport />} onClick = {() => setShowImport(!showImport)}>
                    Import
                </ButtonR>
            </Stack>

            {/* Calling Importing Modal */}
            <ImportingModals
            show={showImport}
            onHide = {hideModalImport}
            title = {"Import Product"}
            para = {"The correct column order is (image, name*, code*, type*, brand, category*, unit_code*, cost*, price*, \nproduct_details, variant_name, item_code, additional_price) and you must follow this.\nTo display Image it must be stored in public/images/product directory. Image name must be same as \nproduct name"}
            />
             <AddProductModal 
            show= {showAddModal}
            onHide = {hideModalAdd}
            />
            </div>  
        </div>
         {/* Data Grid */}
     <div className="table" style={{width:'96%' , margin:'2%'}}>
        <EnhanceTable 
        rows={rows}
        columnsHeader = {columnsHeader}
        />
        </div>
  </>)
}