import React, { useEffect, useState,useContext } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AboutUsImg } from '../assets/images';
import { useNavigate, useParams } from "react-router-dom";
import {Spinner,Title} from ".";
import {MyContext,axiosApi} from "../utility";






export const AboutUs = () => {

    const { website } = useParams();
    
	const { context,setContext } = useContext(MyContext);
	const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })


	useEffect(() => {

        const config = { method: "get", headers: { "Content-Type": "application/json" } }
        axiosApi(`api/userprofile/get-website/${website}/`, config, setData, setContext);
    

	}, [website]);


  return (
    <Container className='mt-2'>
        {data.is_loading && <Spinner />}
        {data.is_success && data.result.profile && data.result.profile.aboutus && 
      <Row>
        <Col>
          <h2>About Our Company</h2>
          <pre>
          {data.result.profile.aboutus=="" ? "Information not found.":data.result.profile.aboutus }          </pre>
        </Col>
      
      </Row> }
    </Container>
  );
};

