import React, {useState} from "react";
import SideMenue from "./Components/Navbars/SideMenue";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from "./Components/Pages/Dashboard";
import { Category, Product } from "./Components/Pages/Inventory";
import { AddPurchase, PurchaseList } from "./Components/Pages/Purchase";
import { AddExpense, AddExpenseCategory } from "./Components/Pages/Expense";
import { AddQuotation, QuotationList } from "./Components/Pages/Quotation";
import { ReturnPurchase, ReturnSale } from "./Components/Pages/Return";
import { Customer, Supplier } from "./Components/Pages/People";
import Pos from "./Components/Modals/NewPos";
import AppContainer from "./Components/SignInSingUp/AppContainer";

function App() {
  const [inactive, setInactive] = useState(false);
  const [authenticationForm , setAuthenticationForm] = useState(false);

  const handleRoute = () => {
    setAuthenticationForm(true);
  }
 
  return (<div className="app">
    <Router>
    
    {authenticationForm ? <><SideMenue
       onCollapse={(inactive) => {
        setInactive(inactive);
        }}
      /> 

    <div className={`conatinerOfApp ${inactive ? "inactiveconatinerOfApp" : ""}`}>
      <Routes>
        

        {/* Dashboard Route with the the path of URL  */}
        <Route  path={"/dashboard"} element={<Dashboard/>}/>


        {/* Inventory Route with the the path of URL  */}

        <Route path={"inventory/category"} element ={<Category/>}/>
        <Route path={"inventory/Product"} element= {<Product/>}/>

        {/* Purchase Route */}
        <Route path ={"/purchase/addpurchase"} element = {<AddPurchase/>}/>
        <Route path = {"/purchase/purchaselist"} element = {<PurchaseList/>}/>

        {/* Expense Route */}
         <Route path = {"/expense/addcategory"} element = {<AddExpenseCategory/>}/>
         <Route path = {"/expense/addexpense"} element ={<AddExpense/>}/>

         {/* Qoutation Route  */}
         <Route path = {"/quotation/addquotation"} element = {<AddQuotation/>}/>
         <Route path = {'/quotation/quotationlist'} element = {<QuotationList/>}/>

         {/* Return Route */}
         <Route path = {'/return/sales'} element = {<ReturnSale/>}/>
         <Route path = {"/return/purchase"} element = {<ReturnPurchase/>}/>

         {/* People Route */}
         <Route path={"/people/customer"} element={<Customer/>}/>
         <Route path = {"/people/supplier"} element = {<Supplier/>}/>

         {/* Pos Route */}
         <Route path={"/pos"} element = {<Pos/>}/>
        
      </Routes>

    </div>
    </>: 
    <Routes>
      <Route path = {'/seller-story'} element = {<AppContainer handleRoute={handleRoute}/>}/>
    </Routes>
    }
    </Router>

   </div>
  );
}
export default App