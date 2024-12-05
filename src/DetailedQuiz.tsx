import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './App.css';
import pandaHalf from './Images/panda2.png';
//comment
const questions: { question: string, options: string[] }[] = [
 //personality questions 
 {
  question: "Which would you enjoy most?",
  options: ["Traveling the world", "Public speaking",
    "Helping others in need", "Developing a new invention"]
  },
  {
    question:"How comfortable are you with public speaking?",
    options:["Very comfrotable", "Somewhat comfortable",
      "Not Comfortable"]
  },
  {
    question:"Do you consider yourself a creative person",
    options:["Yes", "Sometimes", "No"]
  },
  {
    question: "How much do you agree with the statement: I am extroverted and enthusiastic.",
    options: ["Agree", "Neutral", "Disagree"]
  },
  {
    question:"How would you rate your ability to work with numbers",
    options:["Very Confident", "Somewhat Confident", "Not Confident"]
  },
  {
    question: "What level of education are you aiming to achieve? ",
    options: ["High School Diploma", "Bachelor's Degree", "Master's Degree", "PhD"]
  },
  {
    question: "Which best describes you in a Team setting?",
    options: ["Manager", "Strategist", "Supporter","Participator"]
  },
//job field questions 
{
  question: "Which of these skills do you feel most confident in?",
  options: ["Communcating ideas clearly and persuasively", "Working with numbers and data analysis", "Fixing or building physical things", "Designing or creating something new"]
},
{
  question: "How do you approach solving a complex problem?",
  options: ["Analyze the problem thoroughly", "Coming up with creative solutions", "Collaborate with others", "Implementing a step-by-step plan"]
},

 //job charateristic questions
 {
  question:"How do you handle stress?",
  options:["I thrive under pressure","I can handle stress in waves", "I can't handle any stress",]
},
 {
  question : "When do you feel most productive ?",
  options: ["Morning", "Afternoon", "Evening", "I'm Flexible"]
},
 {
   question : "I like to work by...",
   options: ["Talking", "Typing", "Writing"]
},

{
  question: "How physically demanding would you prefer your job to be?",
  options: ["Very; e.g. Construction","Moderate; e.g. Teacher", "Little; e.g. Desk Jobs"]
},
{
  question: "What type of work schedule would you prefer?",
  options: ["A 9-5 routine with weekends off", "Flexible hours that allow me to work when I want",
    "Shift work that includes evenings weekends", "A mix of schedules work and independent projects"]
},
{
  question : "How do you prefer to work on projects?",
  options: ["Independently", "In a team", "With a supervisor/mentor", "Leading the project"]
},

{
  question:"How important are financial rewards compared to job satisfaction in your career? ",
  options:["I prefer more financial rewards", "I prefer a balance between the two",
    "I prefer job satisfaction"]
},
{
 question: "What sort of work environment speaks to you?",
 options: ["Fast-Paced and Dynamic", "Independent and flexible", "Collaborative and team-oriented", "Structured and Predictable"]
},

 {
   question: "What work setting would you prefer?",
   options: ["Outdoors", "Office", "Remote", "Lab"]
 },

{
  question: "Which of these motivate you the most in a potential career ",
  options:["Financial stability", "Making a positive impact", "Achieving personal growth", "Gaining Recognition for my work", "Freedom to express creativity"]
},
 
 {
   question: "Which career fields would you prefer? ",
   options: ["Fields that favor logic, structure, working with numbers/data ", "Fields that favor leadership, communication and structure",
      "Fields that favor creativity, collabration, and flexible schedules", "Fields that favor hands-on work/physical activity"]
 },
 
  // Add more questions
];



const DetailedQuiz:React.FC=()=>{
   const [selectedOption, setSelectedOption] = useState<string | null>(null);
   const [currentQuestionIndex, setCurrentIndex] = useState<number>(0);
   const [quizComplete, setQuizComplete] = useState<boolean>(false);
   const [answers, setAnswers] = useState<{ question: string, selectedAnswer:string}[]>([]);
   const [visible, setVisibility] = useState<boolean>(false);
   const navigate = useNavigate();
    
     const handleOptionClick = (option: string) => {
      setSelectedOption(option)
      const currentQuestion = questions[currentQuestionIndex];
      const updatedAnswers = [...answers];
      const answerIndex = updatedAnswers.findIndex(
        (answer) => answer.question === currentQuestion.question
      );
      
      if (answerIndex > -1) {
        updatedAnswers[answerIndex].selectedAnswer = option;
      } else {
        updatedAnswers.push({ question: currentQuestion.question, selectedAnswer: option });
      }
      
      setAnswers(updatedAnswers);

      // For last question set the quiz as done 
      if (currentQuestionIndex === questions.length - 1) {
        setQuizComplete(true);
        setVisibility(true);
        localStorage.setItem('detailedQuizAnswers', JSON.stringify(updatedAnswers));
      }
     };

     const handleNextQuestion = () => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      }
     };

     const handlePrevQuestion = () => {
       setCurrentIndex(currentQuestionIndex -1);
       setSelectedOption(null);
       setQuizComplete(false);
       setVisibility(false);
     }


     const goToDetailedResults = () => {
       navigate('/detailed-results');
     };

     const progress = (currentQuestionIndex + (selectedOption ? 1 : 0)) / questions.length * 100;
     return (
      <Container fluid className="quiz-container">
        <Button onClick={() => navigate('/')} variant="primary" className="home-button">Go to Home</Button>
        <h1 className="quiz-title">Detailed Career Quiz</h1>
        <p className="quiz-description">Welcome to the Detailed Career Quiz!</p>
  
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}>{`${Math.round(progress)}%`}</div>
          </div>
        </div>
        <img className='racoon-quiz' src={pandaHalf} alt='Racoon!'/>

        <Container className="question-container">
          <h2>{questions[currentQuestionIndex].question}</h2>
          <Row>
            {questions[currentQuestionIndex].options.map((option) => (
              <Col key={option} className="option-col">
                <Button
                  variant="primary"
                  onClick={() => handleOptionClick(option)}
                  className={`option-button ${selectedOption === option ? 'selected' : ''}`}
                >
                  {option}
                </Button>
              </Col>
            ))}
          </Row>
          <div className="navigation-buttons">
          
          
          <Button onClick={handlePrevQuestion} variant="primary" disabled={currentQuestionIndex === 0} className="prev-button">Previous Question</Button>
          <Button onClick={handleNextQuestion} variant="primary" disabled={!selectedOption || quizComplete || (currentQuestionIndex === questions.length - 1)} className="next-button">Next Question</Button>
        </div>
        {visible && quizComplete && selectedOption && (
            <Button onClick={goToDetailedResults} variant="primary" className="results-button">View Results</Button>
          )}
        </Container>
      </Container>
    );
  };
  
  export default DetailedQuiz;

