import React, { useState } from 'react';
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


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
  {
    question: "What sort of work life speaks to your soul ",
    options: ["Competitive and high-pressure", "Independent and self-directed", "Collaborative and team-oriented", "Structured and organized"]
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
    question: "How physically demanding do you prefer your job to be?",
    options: ["Very; heavy lifting/constant moving", "Moderate; some physical activity", "Light; mostly sitting or standing", "None; primarily desk work"]
  },
  {
    question: "How much do you agree with the statement: I am extroverted and enthusiastic.",
    options: ["Agree", "Neutral", "Disagree"]
  },
  {
    question: "Which career field do you prefer? ",
    options: ["STEM & Heathcare", "Business and Public Servies",
       "Creative and Communication", "Trades, Hospitality and Recreation"]
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

    const goToHome = () => {
        navigate('/');
      };

      
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

    return(
      <Container fluid style={{backgroundColor:'#C8D6AF'}}>
      <div>
      <Button onClick={goToHome} variant="primary"style ={{backgroundColor: '#053225', borderColor: '#053225', position: 'absolute', left: '30px', top: '30px', width: '150px', height: '50'}}>
      Go to Home
    </Button>
      <h1 style={{fontFamily: 'Palatino',fontWeight: 'bold'}}>Detailed Career Quiz</h1>
      <p style={{fontFamily: 'Palatino'}}>Welcome to the Detailed Career Quiz!</p>
  </div>

  <div style={{width: '50%', margin: '0 auto'}}>
        <ProgressBar
        now={progress}
        label={`${Math.round(progress)}%`}
        style={{ 
          width: '100%', 
          border: '3px solid #772e25', 
          borderRadius: '7px', 
          backgroundColor: '#FFECCC', 
          height: '30px' }}
      >
        <div style={{
            width: `${progress}%`,
            backgroundColor: '#053225', // Dark color for the filled portion
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            transition: 'width 0.5s ease',
          }}
        />
      </ProgressBar>
      {`${Math.round(progress)}%`}
  </div>
  
  <Container style={{ marginTop: '50px', border: '5px solid #772e25', width: '1000px', height: '500px', paddingTop: '50px', backgroundColor:'#FFEECC'}}>
  <h2 style={{fontFamily: 'Palatino'}}>{questions[currentQuestionIndex].question}</h2>
  <Row>
      {questions[currentQuestionIndex].options.map((option: string) => (
          <Col key={option} style={{ margin: '10px',marginTop: '80px', padding: '30px'}}>
              <Button
                  variant="primary"
                  onClick={() => handleOptionClick(option)}
                  style={{
                      width: '160px', height: '105px', borderRadius: '30px',
                      backgroundColor: selectedOption === option ? '#C8D6AF':'#053225', borderColor: '#053225'
                  }}>
                  {option}
              </Button>
          </Col>
      ))}
  </Row>
  </Container>
  <div>

  {visible && quizComplete && selectedOption && (
    <><div>You have completed the detailed quiz!</div><Button
    onClick={goToResults}
        variant="primary"
        style={{ position: 'absolute', bottom: '80px', right: '680px', width: '150px', height: '50px', marginTop: '50px' , backgroundColor: '#053225', borderColor: '#053225'}}>
        View Results
      </Button></>

  )}    
  
  <Button 
  onClick={handleNextQuestion} 
  variant="primary" 
  disabled={!selectedOption || quizComplete}
  style ={{backgroundColor: '#053225', borderColor: '#053225', position: 'absolute', right: '300px', top: '550px', width: '200px', height: '50', marginTop: '50px'}}>
    Next Question
  </Button>
  <Button 
  onClick={handlePrevQuestion} 
  variant="primary" 
  disabled={currentQuestionIndex === 0}
  style ={{backgroundColor: '#053225', borderColor: '#053225',position: 'absolute', left: '300px', top: '550px', width: '200px', height: '50', marginTop: '50px'}}>
    Previous Question
  </Button>
  </div> 
  </Container>
    );
};

export default DetailedQuiz;
