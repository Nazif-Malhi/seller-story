import React from 'react';
import Card from 'react-bootstrap/Card';
import Im from '../Data/ss-icon-22.jpg';

const ItemsCard = ({item,type,clickHandle}) => {
  return (
    <Card style={{ width: '10rem', margin:'2px' }} className = "text-center" onClick={type === 'Product' ? () => {clickHandle(item.productName,item.price)} : null }>
        <div style={{display:"flex",justifyContent:"center" , marginTop:'10px'}}>
          <Card.Img variant="top" src={Im} style = {{height:'40px' ,  width:'40px'}}/>

        </div>
      <Card.Body>
      <Card.Title style = {{fontSize: '1.2vw'}}>{type === 'Category' ? item.name : item.productName}</Card.Title>
        <Card.Text>

         {type === 'Product' ? item.price : null}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ItemsCard