import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AboutUsImg } from '../assets/images';

export const AboutUs = ({}) => {
  return (
    <Container className='mt-2'>
      <Row>
        <Col md={6}>
          <h2>About Our Company</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget risus nec nulla tristique malesuada.
            Sed cursus dignissim elit, non aliquam odio interdum id. Nulla facilisi. Nunc vulputate justo nec lorem
            consequat, id blandit tortor tristique. Nullam vehicula venenatis diam, non scelerisque tellus aliquam at.
          </p>
        </Col>
        <Col md={6}>
          <img
            src={ AboutUsImg}
            alt="Company Office"
            className="img-fluid rounded"
          />
        </Col>
      </Row>
    </Container>
  );
};

