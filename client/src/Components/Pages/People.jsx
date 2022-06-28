import React, {useState, useEffect} from 'react';
import Stack from '@mui/material/Stack';
import ButtonR from '@mui/material/Button';
import {IoMdAdd} from 'react-icons/io';
import {MdOutlineImportExport} from 'react-icons/md';
import ImportingModals from '../Modals/ImportingModals';
import {AddPeopleModal } from '../Modals/PeopleModals';
import Axios from 'axios';
import EnhanceTable from '../Table/EnhanceTable';

const columnsHeader = [
  'Name',
  'Email',
  'phone',
  'Address',
  'State',
  'City'
]

export const Customer = () => {
  const [showImport, setShowImport] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [rows, setRows] = useState([]);

    useEffect(() =>{
      Axios.get("http://localhost:8000/customer/read").then((response) => {
        setRows(response.data);
      });
    }, [showAddModal]);
   
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
                Add Customer
            </ButtonR>
            <ButtonR variant="contained" startIcon={<MdOutlineImportExport />} onClick = {() => setShowImport(!showImport)}>
                Import
            </ButtonR>
        </Stack>
        </div>
        {/* Calling Importing Modal */}
        <ImportingModals 
        show={showImport}
        onHide = {hideModalImport}
        title = {"Import Customer's"}
        para = {"The correct column order is (customer_group*, name*, company_name, email, phone_number*, address*, \ncity*, state, postal_code, country) and you must follow this."}
        />
        {/* Calling Add Customer Modal */}

        <AddPeopleModal
        show = {showAddModal}
        onHide = {hideModalAdd}
        title = {'Add Customer'}
        />
        </div>
         {/* Data Grid */}
     <div className="table" style={{width:'96%' , margin:'2%'}}>
        <EnhanceTable 
        rows={rows}
        columnsHeader = {columnsHeader}
        />
        </div>
  </>
  )
}

export const Supplier = () => {
  const [showImport, setShowImport] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [rows, setRows] = useState([]);

    useEffect(() =>{
      Axios.get("http://localhost:8000/supplier/read").then((response) => {
        setRows(response.data);
      });
    }, [showAddModal]);
    function hideModalImport(){
        setShowImport(false);
    }
    function hideModalAdd(){
      setShowAddModal(false);
    }
    return(<>
  <div className='main_container' style={{padding:10}}>
      <div  style={{paddingBottom:20,display:"flex",justifyContent:"space-between"}} >
        <Stack spacing={2} direction="row">
            <ButtonR variant="contained" startIcon={<IoMdAdd />} onClick = {() => setShowAddModal(!showAddModal)}>
                Add Supplier
            </ButtonR>
            <ButtonR variant="contained" startIcon={<MdOutlineImportExport />} onClick = {() => setShowImport(!showImport)}>
                Import
            </ButtonR>
        </Stack>
        </div>
        {/* Calling Importing Modal */}
        <ImportingModals 
        show={showImport}
        onHide = {hideModalImport}
        title = {"Import Supplier's"}
        para = {"The correct column order is (name*, image, company_name*, vat_number, email*, phone_number*, address*\n, city*,state, postal_code, country) and you must follow this."}
        />
        {/* Calling Add Customer Modal */}

        <AddPeopleModal
        show = {showAddModal}
        onHide = {hideModalAdd}
        title = {'Add Supplier'}
        />
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