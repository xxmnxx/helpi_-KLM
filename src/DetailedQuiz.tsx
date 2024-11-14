import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './App.css';

//comment
const questions: { question: string, options: string[] }[] = [
 {
   question : "What time do you like to work?",
   options: ["Morning", "Afternoon", "Night Time"]
 },
 {
   question : "I like to work by...",
   options: ["Talking", "Typing", "Writing"]
},
{
 question: "What sort of work life speaks to your soul ",
 options: ["Competitive and high-pressure", "Independent and self-directed", "Collaborative and team-oriented", "Structured and organized"]
},
 {
     question : "How do you prefer to work on projects?",
     options: ["Independently", "In a team", "With a supervisor/mentor", "Leading the project"]
 },
 {
   question: "What work environment would you prefer?",
   options: ["Outdoors", "Office", "Remote", "Lab"]
 },
 {
   question: "What aspect of a job is most important to you?",
   options:["Creative Freedom", "Work-life Balance",
     "Benefits/Security (not included with freelance/contract careers", "Reward/Fulfillment"]
 },
 {
 question: "Which would you enjoy most?",
 options: ["Traveling the world", "Public speaking",
   "Helping others in need", "Developing a new invention"]
 },
 {
   question: "Which best describes you?",
   options: ["Manager", "Strategist", "Supporter","Participator"]
 },
 {
   question:"How would you rate your ability to work with numbers",
   options:["Very Confident", "Somewhat Confident", "Not Confident"]
 },
 {
   question:"Do you consider yourself a creative person",
   options:["Yes", "Sometimes", "No"]
 },
 {
   question:"How do you handle stress in the workplace?",
   options:["I thrive under pressure","I prefer a calm environment",
     "I can handle stress in waves"]
 },
 {
   question:"What motiviates you the most in your career",
   options:["Earning a high salary","Making a positive impact","Achieving personal growth and development","Gaining recognition for my work"]
 },
 {
   question:"How comfortable are you with public speaking?",
   options:["Very comfrotable; I prefer presenting my ideas", "Somewhat comfortable; I can do it if needed",
     "Not Comfortable; I prefer written communication"]
 },
 {
   question:"How important are financial rewards compared to job satisfaction in your career? ",
   options:["I prefer more financial rewards", "I prefer a balance between financial rewards and job satisfaction",
     "I prefer job satisfaction"
   ]
 },
 {
   question: "What type of work schedule do you prefer?",
   options: ["A 9-5 routine with weekends off", "Flexible hours that allow me to work when I want",
     "Shift work that includes evenings weekends", "A mix of schedules work and independent projects"]
 },
 // {
 //   question: "Which of these industries do you find most appealing?",
 //   options: ["Technology and IT", "Heathecare and Wellness",
 //      "Arts and Creative Industries", "Education and Training"]
 // },
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
   question: "How much do you agree with the statement: I am extroverted and enthusiastic.",
   options: ["Agree", "Neutral", "Disagree"]
 },
 {
   question: "How physically demanding do you prefer your job to be?",
   options: ["Very; heavy lifting/constant moving", "Moderate; some physical activity", "Light; mostly sitting or standing", "None; primarily desk work"]
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
     };

     const handleNextQuestion = () => {
       if (selectedOption !== null) {
         const currentQuestion = questions[currentQuestionIndex];
       
         // Update the answers with the selected answer
         setAnswers(prevAnswers => [
           ...prevAnswers,
           {
             question: currentQuestion.question,
             selectedAnswer: selectedOption
           }
         ]);
          // Move to the next question or complete the quiz
         if (currentQuestionIndex < questions.length - 1) {
           setCurrentIndex(currentQuestionIndex + 1);
           setSelectedOption(null);
         } else {
           setQuizComplete(true);
           setVisibility(true);
           localStorage.setItem('detailedQuizAnswers', JSON.stringify(answers));
 
 
         }
       }
     };

     const handlePrevQuestion = () => {
       setCurrentIndex(currentQuestionIndex -1);
       setSelectedOption(null);
       setQuizComplete(false);
       setVisibility(false);
     }


     const goToResults = () => {
       navigate('/Results');
     };




     const progress = (currentQuestionIndex + (quizComplete ? 1 : 0)) / questions.length * 100;
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
          <Button onClick={handleNextQuestion} variant="primary" disabled={!selectedOption || quizComplete} className="next-button">Next Question</Button>
        </div>
        </Container>
        {visible && quizComplete && selectedOption && (
            <Button onClick={goToResults} variant="primary" className="results-button">View Results</Button>
          )}
      </Container>
    );
  };
  
  export default DetailedQuiz;

