import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



const DetailedQuiz:React.FC=()=>{
    const [selectedOption, setSelectedOption] = useState<string | null>(null); 

    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/');
      };
      const handleOptionClick = (option: string) => {
        setSelectedOption(option)

      };
    return(
        <><div>
            <Button onClick={goToHome} variant="primary" style ={{position: 'absolute', left: '30px', top: '30px', width: '150px', height: '50'}}>
            Go to Home
          </Button>
            <h1>Detailed Career Quiz</h1>
            <p>Welcome to the Detailed Career Quiz!</p>
        </div>
        <Container style={{ marginTop: '20px', border: '1px solid black', width: '1000px', height: '500px' }}>
                <h2>How do you prefer to work on projects?</h2>
                
            <Row>
                <Col style={{ margin: '10px', padding: '30px' }}>
                <Button variant="primary" onClick={() => handleOptionClick('Independently')} style ={{width: '200px', height: '100px', borderRadius: '30px', backgroundColor: selectedOption === 'Independently' ? '#99ccff' : '#007BFF'}}>
                Independently
            </Button>
                </Col>
          <Col style={{  margin: '10px', padding: '30px' }} >
          <Button variant="primary" onClick={() => handleOptionClick('In a team')} style ={{width: '200px', height: '100px', borderRadius: '30px',backgroundColor: selectedOption === 'In a team' ? '#99ccff' : '#007BFF'}}>
              In a team
            </Button>
          </Col>
        </Row>
        <Row>
                <Col style={{  margin: '10px', padding: '30px' }}>
                <Button variant="primary" onClick={() => handleOptionClick('With a mentor/ supervisor')} style ={{width: '200px', height: '100px', borderRadius: '30px',backgroundColor: selectedOption === 'With a mentor/ supervisor' ? '#99ccff' : '#007BFF'}}>
              With a mentor/ supervisor
            </Button>
                </Col>
          <Col style={{margin: '10px', padding: '30px' }}>
          <Button variant="primary" onClick={() => handleOptionClick('Leading the project')} style ={{width: '200px', height: '100px', borderRadius: '30px',backgroundColor: selectedOption === 'Leading the project' ? '#99ccff' : '#007BFF'}}>
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
