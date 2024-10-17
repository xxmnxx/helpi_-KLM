import React, { useState } from 'react';
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const questions: { question: string, options: string[] }[] = [
  {
      question: "How do you prefer to work on projects?",
      options: ["Independantly", "In a team", "With a supervisor/mentor", "Leading the project"]
  },
  {
      question: "",
      options: []
  },
  // Add more questions 
];



const DetailedQuiz:React.FC=()=>{
    const [selectedOption, setSelectedOption] = useState<string | null>(null); 
    const [currentQuestionIndex, setCurrentIndex] = useState<number>(0);
    const [quizComplete, setQuizComplete] = useState<boolean>(false);
    const [visible, setVisibility] = useState<boolean>(false);
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
      };

      const handleOptionClick = (option: string) => {
        setSelectedOption(option)
      };

      const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length -1){
          setCurrentIndex(currentQuestionIndex +1);
          setSelectedOption(null);
        } else {
          setQuizComplete(true);
          setVisibility(true);
        }
      };

    const progress = currentQuestionIndex / questions.length * 100;

    return(
      <><div>
      <Button onClick={goToHome} variant="primary"style ={{position: 'absolute', left: '30px', top: '30px', width: '150px', height: '50'}}>
      Go to Home
    </Button>
      <h1>Detailed Career Quiz</h1>
      <p>Welcome to the Detailed Career Quiz!</p>
  </div>

  <div style={{width: '50%', margin: '0 auto'}}>
  <ProgressBar now={progress} label={`${Math.round(progress)}%`}/>

  </div>
  
  <Container style={{ marginTop: '50px', border: '1px solid black', width: '1000px', height: '500px', paddingTop: '50px'}}>
  <h2>{questions[currentQuestionIndex].question}</h2>
  <Row>
      {questions[currentQuestionIndex].options.map((option: string) => (
          <Col key={option} style={{ margin: '10px',marginTop: '80px', padding: '30px'}}>
              <Button
                  variant="primary"
                  onClick={() => handleOptionClick(option)}
                  style={{
                      width: '150px', height: '75px', borderRadius: '30px',
                      backgroundColor: selectedOption === option ? '#99ccff' : '#007BFF'
                  }}>
                  {option}
              </Button>
          </Col>
      ))}
  </Row>
  </Container>
  <div>

  {visible && quizComplete && selectedOption && (
    <Button 
      variant="primary" 
      style={{position: 'absolute', bottom: '80px', right: '680px', width: '150px', height: '50px', marginTop: '50px'}}>
      View Results
    </Button>

  )}    
  
  <Button 
  onClick={handleNextQuestion} 
  variant="primary" 
  disabled={!selectedOption || quizComplete}
  style ={{position: 'absolute', right: '300px', bottom: '80px', width: '150px', height: '50', marginTop: '50px'}}>
    Next Question
  </Button>
  </div>
  </>   
    );
};

export default DetailedQuiz;
