//import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



const DetailedQuiz:React.FC=()=>{
    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/');
      };
      const handleOptionClick = (option: string) => {
      };
    return(
        <><div>
            <Button onClick={goToHome} variant="primary" style ={{position: 'absolute', left: '30px', top: '30px', width: '150px', height: '50'}}>
            Go to Home
          </Button>
            <h1>Detailed Career Quiz</h1>
            <p>Welcome to the Detailed Career Quiz!</p>
            
        </div><Container style={{ marginTop: '20px', border: '1px solid black', width: '1000px', height: '500px' }}>
                <h2>How do you prefer to work on projects?</h2>
                
            <Row>
                <Col style={{ margin: '10px', padding: '30px' }}>
                <Button variant="primary" onClick={() => handleOptionClick('Math/Science')} style ={{width: '200px', height: '100px', borderRadius: '30px'}}>
                Independently
            </Button>
                </Col>
          <Col style={{  margin: '10px', padding: '30px' }} >
          <Button variant="primary" onClick={() => handleOptionClick('Arts/Literature')} style ={{width: '200px', height: '100px', borderRadius: '30px'}}>
              In a team
            </Button>
          </Col>
        </Row>
        <Row>
                <Col style={{  margin: '10px', padding: '30px' }}>
                <Button variant="primary" onClick={() => handleOptionClick('Social Studies')} style ={{width: '200px', height: '100px', borderRadius: '30px'}}>
              With a mentor/ supervisor
            </Button>
                </Col>
          <Col style={{margin: '10px', padding: '30px' }}>
          <Button variant="primary" onClick={() => handleOptionClick('Physical Education')} style ={{width: '200px', height: '100px', borderRadius: '30px'}}>
              Leading the project
            </Button>
          </Col>
        </Row>
        </Container>
        <div>
        <Button onClick={goToHome} variant="primary" style ={{position: 'absolute', right: '270px', bottom: '170px', width: '150px', height: '50'}}>
            Next Question
          </Button>
        </div>

        </>
        
        
    );
};



export default DetailedQuiz;
