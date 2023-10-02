import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner, Title,CategoryList,ProductCard } from ".";
import { MyContext, axiosApi } from "../utility";
import { Container, Row, Col } from "react-bootstrap";



export const Products = () => {
  const { context, setContext } = useContext(MyContext);
  const { uid } = useParams();
  const [categoryid, setCategoryid] = useState(0);
  const navigate = useNavigate();
  const [categories, setCategories] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
  const [products, setProducts] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
  const [search,setSearch] = useState('');
  const [ cart,setCart] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) :{});

	useEffect(() => {
    const config = { method: "get", headers: { "Content-Type": "application/json" } }
    axiosApi(`api/userprofile/get-profile/${uid}/`, config, setCategories, setContext);

}, []);


  useEffect(() => {
    const config = { method: "get", headers: { "Content-Type": "application/json" } }
    axiosApi(`api/userprofile/get-products-by-catid/${uid}/${categoryid}/`, config, setProducts, setContext);
  }, [categoryid]);


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify({ ...cart }));
  }, [cart]);


  return (
    <>
    {products.is_loading && <Spinner />}
    <div className="dashboard">
      <div className='left'>
        {categories.is_success && categories.result && categories.result.categories && <CategoryList data={categories.result.categories} setCategoryid={setCategoryid} />}
        
      </div>

      <div className="right" >
        <Container>
          <Row><input type="search" style={{ padding: '6px',margin:'auto',marginBottom:"20px", borderRadius: '5px solid black', width: '320px' }} onChange={(e) => { setSearch(e.target.value); }} placeholder="Search..."  /></Row>
          <Row sm={12} md={3}>{products.is_success && products.result && products.result.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())).map((product) => <Col key={product.id} className="mb-2"><ProductCard product={product} cart={cart} setCart={setCart} /></Col>)}</Row>
        </Container>
      </div></div>
    </>
  )
}
