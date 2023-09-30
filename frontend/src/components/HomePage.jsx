// HomePage.js
import React, { useContext,useEffect}from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import { Outlet } from 'react-router-dom';
import { MyContext } from '../utility';
import { NavLink, useNavigate  } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const HomePage=()=> {
  const { context} = useContext(MyContext);
  const navigate = useNavigate();


  useEffect(() => {
		if(context.user)
		{
			navigate("/dashboard");
		}

	}, [context.user]);



  return (<>    
  <Header />
  <main>
  <Container fluid>
      <Row>
        <Col md={6}>
          <div className='homepage'>
        <h1>Task Master</h1>
              <p>Tired of the hassle of managing numerous software tools for various tasks? Look no further than Task Master, the pinnacle of multifunctional excellence in the realm of utility software. Task Master isn't just another utility; it's a complete solution meticulously crafted to streamline your daily digital endeavors and elevate your productivity to new heights.</p>
              </div>
        </Col>
        <Col md={6} style={{paddingTop:'10px'}}>
           <Outlet/>
          </Col>
      </Row>
    </Container>
</main>
      <Footer/>
      </>

  );
}

