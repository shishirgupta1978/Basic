import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner, Title,CategoryList,ProductCard } from ".";
import { MyContext, axiosApi } from "../utility";
import { Container, Row, Col } from "react-bootstrap";



export const Products = () => {
  const { context, setContext,search } = useContext(MyContext);
  const { website } = useParams();
  const [categoryid, setCategoryid] = useState(0);
  const navigate = useNavigate();
  const [categories, setCategories] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
  const [products, setProducts] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
  
  const [ cart,setCart] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) :{});

	useEffect(() => {

    if(website.toLowerCase()=="webmaster")
    {
     
      navigate("/webmaster/weblist/");
    }
    const config = { method: "get", headers: { "Content-Type": "application/json" } }
    axiosApi(`api/userprofile/get-website/${website}/`, config, setCategories, setContext);

}, []);


  useEffect(() => {
    const config = { method: "get", headers: { "Content-Type": "application/json" } }
    axiosApi(`api/userprofile/get-products-by-catid/${website}/${categoryid}/`, config, setProducts, setContext);
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
          <Row>{products.is_success && products.result && products.result.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())).map((product) => <Col sm={12} md={6} lg={4} key={product.id} className="mb-2"><ProductCard product={product} cart={cart} setCart={setCart} /></Col>)}</Row>
        </Container>
      </div></div>
    </>
  )
}
