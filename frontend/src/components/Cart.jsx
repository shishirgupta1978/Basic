import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Form, Button,Table } from 'react-bootstrap';

import { Outlet } from 'react-router-dom';
import { MyContext,axiosApi } from '../utility';
import { NavLink, useNavigate  } from 'react-router-dom';



export const Cart = () => {
const { context, setContext } = useContext(MyContext);


const [ cart,setCart] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) :{});
const [loadData, setLoadData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })

useEffect(() => {
    const config = { method: "post", headers: { "Content-Type": "application/json" },data:cart }
    axiosApi(`api/userprofile/get-cart-data/`, config, setLoadData, setContext);

}, []);




  return (
    <div>
         <Container fluid>
      <Row>
        <Col md={6}>{loadData.is_success && loadData.result.length>0 &&
          <Table striped bordered hover variant="light" style={{width:'100%',marginTop:'10px'}}>
	<thead><tr><th>Pic</th><th>Name</th><th>Price</th><th>Quantity</th><th>Amount</th></tr></thead>
        <tbody>
            { 
    loadData.result.map((item) =><tr key={item.id}><td><img width="50px" height="40px" src={item.img_url}/></td><td>{item.name}</td><td>{(item.price-(item.price*item.discount/100))}</td><td>{cart[item.id]}</td><td>{(item.price-(item.price*item.discount/100)) * cart[item.id]}</td></tr>)
}<tr><td colSpan="4" className="text-end">Total Amount</td><td>{ loadData.result.reduce((accumulator, item) => {
  return accumulator + ((item.price-(item.price*item.discount/100)) * cart[item.id]);
}, 0)}</td></tr>
    </tbody>
    </Table>}
        
        </Col>
        <Col md={6} style={{paddingTop:'10px'}}>
        <div className="form mt-2">
      <h2>Shipping Address</h2>
      <div className="material-input">
				<label>Address</label>
				
		      <div className="input-container"><textarea name='Address' value='' rows="3" required/></div></div>

      <Row><Col>
      <Button variant="dark" type="submit">Generate Invoice</Button></Col></Row>


    </div>

          </Col>
      </Row>
    </Container>
      
    </div>
  )
}

