import React, {useState, useEffect} from 'react';
import Stack from '@mui/material/Stack';
import ButtonR from '@mui/material/Button';
import {IoMdAdd} from 'react-icons/io';
import {MdOutlineImportExport} from 'react-icons/md';
import ImportingModals from '../Modals/ImportingModals';
import { AddExpenseCategoryModal, AddExpenseModal } from '../Modals/ExpenseModal';
import Axios from 'axios';
import EnhanceTable from '../Table/EnhanceTable';

export const AddExpenseCategory = () => {
  const [showImport, setShowImport] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [expenseCat, setExpenseCat] = useState([])

    function hideModalImport(){
        setShowImport(false);
    }
    function hideModalAdd(){
      setShowAddModal(false);
    }
    useEffect(()=> {
      Axios.get("http://localhost:8000/expenseCategory/read").then((response) => {
        setExpenseCat(response.data);
      });
    }, [showAddModal]);

    const columnsHeader = [
      'Code',
      'category Name'
    ]
    
  return (<>
      <div className='main_container' style={{padding:10}}>
      <div  style={{paddingBottom:20,display:"flex",justifyContent:"space-between"}} >
        <Stack spacing={2} direction="row">
            <ButtonR variant="contained" startIcon={<IoMdAdd />} onClick = {() => setShowAddModal(!showAddModal)}>
                Add Expenses Category
            </ButtonR>
            <ButtonR variant="contained" startIcon={<MdOutlineImportExport />} onClick = {() => setShowImport(!showImport)}>
                Import
            </ButtonR>
        </Stack>


        {/* Calling Importing Modal */}
        <ImportingModals 
        show={showImport}
        onHide = {hideModalImport}
        title = {"Import Expense's Category"}
        para = {"The correct column order is (code*, name*) and you must follow this."}
        />
        {/* Calling Add Expense Category Modal */}

        <AddExpenseCategoryModal
        show = {showAddModal}
        onHide = {hideModalAdd}
        />
        </div>
        </div>
        {/* Data Grid */}
      <div className="table" style={{width:'96%' , margin:'2%'}}>
        <EnhanceTable 
        rows={expenseCat}
        columnsHeader = {columnsHeader}
        />
        </div>
  </>)
}
export const AddExpense = () => {
  const [showImport, setShowImport] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [expense, setExpense] = useState([]);

  function hideModalImport(){
      setShowImport(false);
  }
  function hideModalAdd(){
    setShowAddModal(false);
  }
  useEffect(()=> {
    Axios.get("http://localhost:8000/expense/read").then((response) => {
      setExpense(response.data);
    });
  }, [showAddModal]);

  const columnsHeader = [
    'Date',
    'Expense Category',
    'Amount',
    'Description'

  ]
    return (<>
      <div className='main_container' style={{padding:10}}>
      <div  style={{paddingBottom:20,display:"flex",justifyContent:"space-between"}} >
        <Stack spacing={2} direction="row">
            <ButtonR variant="contained" startIcon={<IoMdAdd />} onClick = {() => setShowAddModal(!showAddModal)}>
                Add Expenses
            </ButtonR>
            <ButtonR variant="contained" startIcon={<MdOutlineImportExport />} onClick = {() => setShowImport(!showImport)}>
                Import
            </ButtonR>
        </Stack>


        {/* Calling Importing Modal */}
        <ImportingModals 
        show={showImport}
        onHide = {hideModalImport}
        title = {"Import Expense's Category"}
        para = {"The correct column order is (code*, name*) and you must follow this."}
        />
        {/* Calling Add Expense Category Modal */}

        <AddExpenseModal
        show = {showAddModal}
        onHide = {hideModalAdd}
        />
        </div>
        </div>
        <div className="table" style={{width:'96%' , margin:'2%'}}>
        <EnhanceTable 
        rows={expense}
        columnsHeader = {columnsHeader}
        />
        </div>
      </>)
  }