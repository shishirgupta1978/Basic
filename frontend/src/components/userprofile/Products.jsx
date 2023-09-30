import React, { useEffect, useState,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Spinner,Title} from "..";
import {MyContext,axiosApi} from "../../utility";
import { Container,Row,Col } from "react-bootstrap";
import { ProductCard } from "./ProductCard";


export const Products = (props) => {
  const { context,setContext } = useContext(MyContext);
	const navigate = useNavigate();
	const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })


	useEffect(() => {

        const config = { method: "get", headers: { "Content-Type": "application/json" } }
        axiosApi(`api/userprofile/get-products-by-catid/${props.uid}/${props.id}/`, config, setData, setContext);
    

	}, [props.id]);


  return (
    <div>
      {data.is_loading && <Spinner/>}

      <Container>
        <Row>
      {data.is_success && data.result && data.result.map((product)=><Col key={product.id}><ProductCard product={product}/></Col>)}
      </Row>
      </Container>
    </div>
  )
}
