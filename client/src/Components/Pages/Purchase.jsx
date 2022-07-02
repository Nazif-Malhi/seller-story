import React, {useEffect, useState} from 'react';
import PurchaseForm from '../Forms/PurchaseForm';
import Axios from 'axios';
import EnhanceTable from '../Table/EnhanceTable';

export const AddPurchase = () => {
  return (<>
    <div className="Forms"  style={{padding:'20px' , paddingTop:'60px'}}>
        {/* Form */}
    <PurchaseForm/>
    </div>
    </>)
}

export const PurchaseList = () => {
    const [purchase, setPurchase] = useState([]);
    
    useEffect(()=> {
        Axios.get("http://localhost:8000/purchase/read").then((response) => {
            setPurchase(response.data);
        });
      }, []);

      const columnsHeader = [
        'Date',
        'Supplier',
        'Status',
        'Order Tax',
        'Order Discount',
        'Shipping Cost',
        'Total'
      ]

    return(<>
    <EnhanceTable rows = {purchase} columnsHeader = {columnsHeader}/>
    </>
    )
}