import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './App.css';

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
    options:["Very comfrotable; I prefer presenting my ideas", "Somewhat comfortable; I can do it if needed",
      "Not Comfortable; I prefer written communication"]
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
    question: "Which best describes you?",
    options: ["Manager", "Strategist", "Supporter","Participator"]
  },
//job field questions 
{
  question: "Which of these skills do you feel most confident in?",
  options: ["Communcating ideas clearly and persuasively", "Working with numbers and data analysis", "fixing or building physical things", "designing or creating something new"]
},
{
  question: "If you were asked to lead a project, what would you focus on",
  options: ["Making sure the team feels motivated and supported", "Breaking the project intor actionable steps", "Coming up with unique solutions", "Ensuring everything is completed efficiently"]
},

 //job charateristic questions
 {
  question:"How do you handle stress in the workplace?",
  options:["I thrive under pressure","I prefer a calm environment",
    "I can handle stress in waves"]
},
 {
  question : "What time do you like to work?",
  options: ["Morning", "Afternoon", "Night Time"]
},
 {
   question : "I like to work by...",
   options: ["Talking", "Typing", "Writing"]
},
// {
//   question: "How physically demanding do you prefer your job to be?",
//   options: ["Very; heavy lifting/constant moving", "Moderate; some physical activity", "Light; mostly sitting or standing", "None; primarily desk work"]
// },
{
  question: "How physically demanding do you prefer your job to be?",
  options: ["Very; Active Worker (e.g. Construction Worker, Trade Jobs etc) ","Moderate;(e.g. Teacher, Physical Therapist etc) ", "Little; Desk Job (e.g. accountant, Human Resources", ]
},
{
  question: "What type of work schedule do you prefer?",
  options: ["A 9-5 routine with weekends off", "Flexible hours that allow me to work when I want",
    "Shift work that includes evenings weekends", "A mix of schedules work and independent projects"]
},
{
  question : "How do you prefer to work on projects?",
  options: ["Independently", "In a team", "With a supervisor/mentor", "Leading the project"]
},

{
  question:"How important are financial rewards compared to job satisfaction in your career? ",
  options:["I prefer more financial rewards", "I prefer a balance between financial rewards and job satisfaction",
    "I prefer job satisfaction"
  ]
},
// {
//  question: "What sort of work life speaks to your soul ",
//  options: ["Competitive and high-pressure", "Independent and self-directed", "Collaborative and team-oriented", "Structured and organized"]
// },
{
  question: "What sort of work life speaks to your soul",
  options: ["Competative fields - i.e. Law", "Independent Fields i.e. Freelancing", "Structured Fields i.e. Corporate Jobs"]
},
 {
   question: "What work environment would you prefer?",
   options: ["Outdoors", "Office", "Remote", "Lab"]
 },


//  {
//    question:"What motiviates you the most in your career",
//    options:["Earning a high salary","Making a positive impact","Achieving personal growth and development","Gaining recognition for my work"]
//  },
//combined
//  {
//   question: "What aspect of a job is most important to you?",
//   options:["Creative Freedom", "Work-life Balance",
//     "Benefits/Security (not included with freelance/contract careers", "Reward/Fulfillment"]
// },
{
  question: "Which of these factors motivates you the most in your career ",
  options:["Earning a high salary and financial stability", "Making a positive impact on people or the world", "Achievving personal growth ad mastering new skills", "Gaiting Recognition and respect for my work", "Having freedom to express creativity and innovation"]
},
 
 
 // {
 //   question: "Which of these industries do you find most appealing?",
 //   options: ["Technology and IT", "Heathecare and Wellness",
 //      "Arts and Creative Industries", "Education and Training"]
 // },

 {
   question: "Which career field do you prefer? ",
   options: ["STEM & Heathcare - fields that favor logic, analysus, structure, or working with numbers/data ", "Business and Public Servies - field that favors leavership, communication and structured environments",
      "Creative and Communication - fields that favor creativity, self experssion, collabration, and flexible schedules", "Trades, Hospitality and Recreation - fields that favor hands-on work,physical activity and teamwork"]
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


     const goToResults = () => {
       navigate('/Results');
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
        </Container>
        {visible && quizComplete && selectedOption && (
            <Button onClick={goToResults} variant="primary" className="results-button">View Results</Button>
          )}
      </Container>
    );
  };
  
  export default DetailedQuiz;

