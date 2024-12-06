import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './App.css';
import racoonHalf from './Images/racoon2.png';

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
    question: "How much do you agree with the statement: I am extroverted and enthusiastic.",
    options: ["Agree", "Neutral", "Disagree"]
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
  question: "How do you handle stress?",
  options: ["I thrive under pressure", "I can't handle any stress", 
    "I can handle stress in waves"]
},
{
  question: "What type of work schedule do you prefer?",
  options: ["A 9-5 routine with weekends off", "Flexible hours that allow me to work when I want",
    "Shift work that includes evenings weekends", "A mix of schedules work and independent projects"]
},
{
  question: "What level of education are you aiming to achieve? ",
  options: ["High School Diploma", "Bachelor's Degree", "Master's Degree", "PhD"]
},
{
  question: "Which career fields would you prefer? ",
  options: ["Fields that favor logic, structure, working with numbers/data ", "Fields that favor leadership, communication and structure",
     "Fields that favor creativity, collabration, and flexible schedules", "Fields that favor hands-on work/physical activity"]
},
{
  question: "How physically demanding would you prefer your job to be?",
  options: ["Very; heavy lifting/constant moving", "Moderate; some physical activity", "Light; mostly sitting or standing", "None; primarily desk work"]
},

];

const BasicQuiz:React.FC=()=>{
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
        localStorage.setItem('basicQuizAnswers', JSON.stringify(updatedAnswers));
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


    const goToBasicResults = () => {
      localStorage.setItem('basicQuizAnswers', JSON.stringify(answers));
      navigate('/basic-results'); // Navigate to Results page
    };
  
    useEffect(() => {
      if (visible && quizComplete) {
        window.scrollTo({
          top: document.documentElement.scrollHeight
        });
      }
     }, [visible, quizComplete]);



    const progress = (currentQuestionIndex + (selectedOption ? 1 : 0)) / questions.length * 100;
    return (
     <Container fluid className="quiz-container">
       <Button onClick={() => navigate('/')} variant="primary" className="home-button">Go to Home</Button>
       <h1 className="quiz-title">Basic Career Quiz</h1>
       <p className="quiz-description">Welcome to the Basic Career Quiz!</p>
       <div className="progress-container">
         <div className="progress-bar">
           <div className="progress-fill" style={{ width: `${progress}%` }}>{`${Math.round(progress)}%`}</div>
         </div>
         
       </div>
       <img className='racoon-quiz' src={racoonHalf} alt='Panda!'/>
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
           <Button onClick={goToBasicResults} variant="primary" className="results-button">View Results</Button>
         )}
       </Container>
     </Container>
   );
 };
 
 export default BasicQuiz;
