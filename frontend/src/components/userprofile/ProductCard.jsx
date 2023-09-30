import React from 'react';
import { Card, Button } from 'react-bootstrap';

export const ProductCard = ({ product }) => {
  console.log(product)
  return (
    <Card  style={{ width: '18rem',backgroundColor:'#f5faf9' }}>
      <Card.Img variant="top" src={product.img_url} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.category_name}</Card.Text>
        <Card.Text>Rs.{product.price}.00</Card.Text>
        {product.is_available ? <Button variant="dark" className='w-100'  >Add to Cart</Button>:"Out of Stock"}
      </Card.Body>
    </Card>
  );
};


