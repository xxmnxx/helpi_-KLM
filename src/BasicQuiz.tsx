//import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const BasicQuiz:React.FC=()=>{
    return(
        <><div>
            <h1>Basic Career Quiz</h1>
            <p>Welcome to the Basic Career Quiz!</p>
        </div><Container style={{ marginTop: '20px', border: '1px solid black', width: '1000px', height: '500px' }}>
                <h2>Question 1</h2>
                Which of these subjects did you enjoy the most in school?
            <Row>
                <Col style={{ border: '1px solid black', margin: '10px', padding: '30px', height: '150px' }}>
                    <h3>Option 1</h3>
                        <p>Math/science</p>
                </Col>
          <Col style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <h3>Option 2</h3>
            <p> Art/literature</p>
          </Col>
        </Row>
        <Row>
                <Col style={{ border: '1px solid black', margin: '10px', padding: '30px', height: '150px' }}>
                    <h3>Option 3</h3>
                        <p>Social studies</p>
                </Col>
          <Col style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <h3>Option  4 </h3>
            <p> Physical Education
            </p>
          </Col>
        </Row>
        </Container></>
    );
};

export default BasicQuiz;