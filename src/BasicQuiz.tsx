import React, { useState } from 'react';
import { Button, Col, Container, Row, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const questions: { question: string, options: string[] }[] = [
  {
      question: "Which of these subjects did you enjoy the most in school?",
      options: ["Math/Science", "Arts/Literature", "Social Studies", "Physical Education"]
  },
  {
      question: "What work environment would you prefer?",
      options: ["Outdoors", "Office", "Remote", "Lab"]
  },
  
{
  question: "Which would you enjoy most?",
  options: ["Traveling the world", "Public speaking", 
    "Helping others in need", "Developing a new invention"]
},
{
  question: "Do you consider yourself a creative person?",
  options: ["Yes", "Sometimes", "No"]
},
{
  question: "How do you handle stress in the workplace?",
  options: ["I thrive under pressure", "I prefer a calm environment", 
    "I can handle stressin waves", "I need to take breaks"]
},
{
  question: "What type of work schedule do you prefer?",
  options: ["A 9-5 routine with weekends off", "Flexible hours that allow me to work when I want",
    "Shift work that includes evenings weekends", "A mix of schedules work and independent projects"]
},
{
  question: "Which of these industries do you find most appealing?",
  options: ["Technology and IT", "Heathecare and Wellness",
     "Arts and Creative Industries", "Education and Training"]
},
{
  question: "What level of education are you aiming to achieve? ",
  options: ["High School Diploma", "Bachelor's Degree", "Master's Degree", "PhD"]
},
{
  question: "Which career field do you prefer? ",
  options: ["STEM & Heathcare", "Business and Public Servies",
     "Creative and Communication", "Trades, Hospitality and Recreation"]
},
{
  question: "How physically demanding do you prefer your job to be?",
  options: ["Very; heavy lifting/constant moving", "Moderate; some physical activity", "Light; mostly sitting or standing", "None; primarily desk work"]
},

  // Add more questions 
];



const BasicQuiz:React.FC=()=>{
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
            <h1>Basic Career Quiz</h1>
            <p>Welcome to the Basic Career Quiz!</p>
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

export default BasicQuiz;

