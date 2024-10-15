//import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';



const DetailedQuiz:React.FC=()=>{
    return(
        <><div>
            <h1>Detailed Career Quiz</h1>
            <p>Welcome to the Detailed Career Quiz!</p>
        </div><Container style={{ border: '1px solid black', margin: '10px', padding: '10px', height: '400px' }}>
            <h2>Question One</h2>
            How do you prefer to work on projects?
            <Row>
          <Col style={{ border: '1px solid black', margin: '10px', padding: '10px', height: '100px' }}>
            <h3>Option 1</h3>
          </Col>
          <Col style={{ border: '1px solid black', margin: '10px', padding: '10px', height: '100px' }}>
            <h3>Option 2</h3>
          </Col>
        </Row>
        <Row>
          <Col style={{ border: '1px solid black', margin: '10px', padding: '10px', height: '100px' }}>
            <h3>Option 3</h3>
          </Col>
          <Col style={{ border: '1px solid black', margin: '10px', padding: '10px', height: '100px' }}>
            <h3>Option 4</h3>
          </Col>
        </Row>
            </Container></>
        
    );
};

export default DetailedQuiz;