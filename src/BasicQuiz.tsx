import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BasicQuiz:React.FC=()=>{
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
            <Button onClick={goToHome} variant="primary"style ={{position: 'absolute', left: '30px', top: '30px', width: '150px', height: '50'}}>
            Go to Home
          </Button>
            <h1>Basic Career Quiz</h1>
            <p>Welcome to the Basic Career Quiz!</p>
            
        </div><Container style={{ marginTop: '20px', border: '1px solid black', width: '1000px', height: '500px' }}>
                <h2>Which of these subjects did you enjoy the most in school?</h2>
                
            <Row>
                <Col style={{ margin: '10px', padding: '30px' }}>
                <Button variant="primary" onClick={() => handleOptionClick('Math/Science')}style ={{width: '200px', height: '100px', borderRadius: '30px',backgroundColor: selectedOption === 'Math/Science' ? '#99ccff' : '#007BFF'}}>
              Math/Science
            </Button>
                </Col>
          <Col style={{  margin: '10px', padding: '30px' }}>
          <Button variant="primary" onClick={() => handleOptionClick('Arts/Literature')}style ={{width: '200px', height: '100px', borderRadius: '30px',backgroundColor: selectedOption === 'Arts/Literature' ? '#99ccff' : '#007BFF'}}>
              Arts/Literature
            </Button>
          </Col>
        </Row>
        <Row>
                <Col style={{  margin: '10px', padding: '30px' }}>
                <Button variant="primary" onClick={() => handleOptionClick('Social Studies')}style ={{width: '200px', height: '100px', borderRadius: '30px',backgroundColor: selectedOption === 'Social Studies' ? '#99ccff' : '#007BFF'}}>
              Social Studies
            </Button>
                </Col>
          <Col style={{margin: '10px', padding: '30px' }}>
          <Button variant="primary" onClick={() => handleOptionClick('Physical Education')}style ={{width: '200px', height: '100px', borderRadius: '30px',backgroundColor: selectedOption === 'Physical Education' ? '#99ccff' : '#007BFF'}}>
              Physical Education
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

export default BasicQuiz;

// eslint-disable-next-line no-lone-blocks
{/* <Form> 
  Radio Buttons
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Check 
                                    type="radio"
                                    id="option1"
                                    label="Math/Science"
                                    name="quizOptions"
                                    inline
                                />
                                <Form.Check 
                                    type="radio"
                                    id="option2"
                                    label="Arts/Literature"
                                    name="quizOptions"
                                    inline
                                />
                                <Form.Check 
                                    type="radio"
                                    id="option3"
                                    label="Social Studies"
                                    name="quizOptions"
                                    inline
                                />
                                <Form.Check 
                                    type="radio"
                                    id="option4"
                                    label="Physical Education"
                                    name="quizOptions"
                                    inline
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                </Form> */}