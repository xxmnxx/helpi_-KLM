//import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

const BasicQuiz:React.FC=()=>{
    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/');
      };
      const handleOptionClick = (option: string) => {
      };
    return(
        <><div>
            <h1>Basic Career Quiz</h1>
            <p>Welcome to the Basic Career Quiz!</p>
            <Button onClick={goToHome} variant="primary">
            Go to Home
          </Button>
        </div><Container style={{ marginTop: '20px', border: '1px solid black', width: '1000px', height: '500px' }}>
                <h2>Question 1</h2>
                Which of these subjects did you enjoy the most in school?
            <Row>
                <Col style={{ margin: '10px', padding: '30px', height: '150px' }}>
                <Button variant="primary" onClick={() => handleOptionClick('Math/Science')}>
              Math/Science
            </Button>
                </Col>
          <Col style={{  margin: '10px', padding: '10px' }}>
          <Button variant="primary" onClick={() => handleOptionClick('Arts/Literature')}>
              Arts/Literature
            </Button>
          </Col>
        </Row>
        <Row>
                <Col style={{  margin: '10px', padding: '30px', height: '150px' }}>
                <Button variant="primary" onClick={() => handleOptionClick('Social Studies')}>
              Social Studies
            </Button>
                </Col>
          <Col style={{margin: '10px', padding: '10px' }}>
          <Button variant="primary" onClick={() => handleOptionClick('Physical Education')}>
              Physical Education
            </Button>
          </Col>
        </Row>
        </Container></>
    );
};

export default BasicQuiz;