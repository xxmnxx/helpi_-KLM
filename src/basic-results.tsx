import { Container, Button,Row, Col } from 'react-bootstrap';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import loadingBasicGif from './Images/Coffee Cup.gif';
import OpenAI from 'openai'; // Ensure this library is correctly installed and configured
import beans from './Images/beans.png';


const BasicResultPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [careerResults, setCareerResults] = useState<{
        
        careerfield1: string;
        reasoning1: string;
        career1_1: string;
        career1_2: string;
        career1_3: string;

        careerfield2: string;
        reasoning2: string;
        career2_1: string;
        career2_2: string;
        career2_3: string;

        careerfield3: string;
        reasoning3: string;
        career3_1: string;
        career3_2: string;
        career3_3: string;
    } | null>(null);

    useEffect(() => {
      const fetchQuizResults = async () => {
        try {
          // Fetch stored answers from localStorage
          const storedAnswersBasic = localStorage.getItem('basicQuizAnswers');
          const storedAnswersDetailed = localStorage.getItem('detailedQuizAnswers');
          
          console.log('storedAnswersBasic:', storedAnswersBasic);
          console.log('storedAnswersDetailed:', storedAnswersDetailed);
  
          // Parse the stored answers
          let userAnswers;
          if (storedAnswersDetailed) {
              userAnswers = JSON.parse(storedAnswersDetailed);
          } else if (storedAnswersBasic != null) {
              userAnswers = JSON.parse(storedAnswersBasic);
          } else {
              userAnswers = [];
          }
  
          // Format answers into a readable message for OpenAI
          let formattedAnswers = userAnswers.map((answer: { question: string; selectedAnswer: string }) => 
            `${answer.question}: ${answer.selectedAnswer}`
          ).join("\n");
  
          const apiKey = localStorage.getItem('MYKEY');
          console.log("API Key retrieved from localStorage:", apiKey); // Log the retrieved key
  
          if (!apiKey) {
            throw new Error("API key not found. Please set your OpenAI API key.");
          }
  
          // Initialize OpenAI API
          const openai = new OpenAI({
            apiKey: JSON.parse(apiKey),
            dangerouslyAllowBrowser: true
  
          });
  
          // Send the user's answers to OpenAI and get a completion response
          const completion = await openai.chat.completions.create({
            model: "gpt-4o-2024-08-06",
            messages: [
                { role: "system", content: "Provide career fields and example careers in JSON format, following the structure provided." },
                { role: "user",  content: `Here are the answers to my career quiz:\n${formattedAnswers}\nBased on these answers,if theres only 10 answers, give me basic quiz results as defined. If theres 25 answers, give me detailed quiz results as defined.`}
            ],
            response_format: {
                type: "json_schema",
                json_schema: {
                    name: "career_schema",
                    schema: {
                        type: "object",
                        properties: {
                            careerfield1: { type: "string", description: "Name of the first career field" },
                            reasoning1: {type: "string", description: "semi-brief (3-4 sentences) reasoning for the career field chosen based on quiz answers"},
                            career1_1: { type: "string", description: "First example career in career field 1" },
                            career1_2: { type: "string", description: "Second example career in career field 1" },
                            career1_3: { type: "string", description: "Third example career in career field 1" },
    
                            careerfield2: { type: "string", description: "Name of the second career field" },
                            reasoning2: {type: "string", description: "semi-brief  (3-4 sentences) reasoning for the career field chosen based on quiz answers"},
                            career2_1: { type: "string", description: "First example career in career field 2" },
                            career2_2: { type: "string", description: "Second example career in career field 2" },
                            career2_3: { type: "string", description: "Third example career in career field 2" },
    
                            careerfield3: { type: "string", description: "Name of the third career field" },
                            reasoning3: {type: "string", description: "semi-brief (3-4 sentences) reasoning for the career field chosen based on quiz answers"},
                            career3_1: { type: "string", description: "First example career in career field 3" },
                            career3_2: { type: "string", description: "Second example career in career field 3" },
                            career3_3: { type: "string", description: "Third example career in career field 3" }
                        },
                        required: [
                            "careerfield1", "reasoning1", "career1_1", "career1_2", "career1_3",
                            "careerfield2", "reasoning2", "career2_1", "career2_2", "career2_3",
                            "careerfield3", "reasoning3", "career3_1", "career3_2", "career3_3"
                        ]
                    }
                }
            }
        });
        // Extract the assistant's response and update the state
        const response = completion.choices[0].message.content;
        if (response) {
          const parsedResponse = JSON.parse(response);
          
          // Ensure parsedResponse matches the shape of `careerResults`
          setCareerResults({
            careerfield1: parsedResponse.careerfield1,
            reasoning1: parsedResponse.reasoning1,
            career1_1: parsedResponse.career1_1,
            career1_2: parsedResponse.career1_2,
            career1_3: parsedResponse.career1_3,
            careerfield2: parsedResponse.careerfield2,
            reasoning2: parsedResponse.reasoning2,
            career2_1: parsedResponse.career2_1,
            career2_2: parsedResponse.career2_2,
            career2_3: parsedResponse.career2_3,
            careerfield3: parsedResponse.careerfield3,
            reasoning3: parsedResponse.reasoning3,
            career3_1: parsedResponse.career3_1,
            career3_2: parsedResponse.career3_2,
            career3_3: parsedResponse.career3_3,
          });
        } else {
          setCareerResults(null);
        }
      } catch (error) {
        console.error("Error fetching results or contacting OpenAI:", error);
        setCareerResults(null);
      } finally {
        setLoading(false);
      }
      
      };
  
      fetchQuizResults();
    }, [navigate]);

    // `navigate` is used, so it must be included in the dependency array

    return (
      <Container fluid className="quiz-container">
        <header
          className="App-Header"
          style={{ padding: '20px', textAlign: 'center' }}
        >
          <h1>
            <span style={{color: '#52681D'}}>Match-a </span>
            <span>Career Results</span>
          </h1>
          <Button
            onClick={() => navigate('/')}
            variant="primary"
            className="home-button"
          >
            Go to Home
          </Button>
        </header>
    
        {loading ? (
          <div style={{ textAlign: 'center' }}>
            <img src={loadingBasicGif} alt="Loading..." />
            <p style={{ color: 'black', fontSize: '18px' }}>
              Brewing your career suggestions...
            </p>
          </div>
        ) : careerResults ? (
          <Container>
            <h2
              style={{
                fontSize: '30px',
                fontFamily: 'moreSugar',
                textAlign: 'center',
                paddingTop: '3%'
              }}
            >
              Success! your coffee has been brewed!
            </h2>
            
            <Container className="careerResults">
              <Row>
                <Col className="results-container">
                  <Row>
                    <h2 className='career-header'>Career Field #1</h2>

                    <div>
                      <h4>={careerResults.careerfield1}=</h4>
                      {careerResults.reasoning1}
                    </div>
                  </Row>

                  <Row >
                    <ul>
                      <h4>Suggested Careers:</h4>
                      <li>{careerResults.career1_1}</li>
                      <li>{careerResults.career1_2}</li>
                      <li>{careerResults.career1_3}</li>
                    </ul>
                  </Row>
                </Col>
                <Col className="results-container">
                  <Row>
                    <h2 className='career-header'>Career Field #2</h2>

                    <div>
                      <h4>={careerResults.careerfield2}=</h4>
                      {careerResults.reasoning2}
                    </div>
                  </Row>
                  <Row>
                    <ul>
                      <h4>Suggested Careers:</h4>
                      <li>{careerResults.career2_1}</li>
                      <li>{careerResults.career2_2}</li>
                      <li>{careerResults.career2_3}</li>
                    </ul>
                  </Row>
                </Col>
                <Col className="results-container">
                  <Row>
                    <h2 className='career-header'>Career Field #3</h2>

                    <div>
                      <h4>={careerResults.careerfield3}=</h4>
                      {careerResults.reasoning3}
                    </div>
                  </Row>
                  <Row>
                    <ul>
                      <h4>Suggested Careers:</h4>
                      <li>{careerResults.career3_1}</li>
                      <li>{careerResults.career3_2}</li>
                      <li>{careerResults.career3_3}</li>
                    </ul>
                  </Row>
                </Col>
              </Row>
              <h2 style={{
              fontSize: '35px'
              
            }}> If you want more in depth career suggestions, Let our top chef help you out with our <Link to="/DetailedQuiz" style={{color:'#52681D'}}>detailed quiz</Link>!</h2>
            </Container>
            
          </Container>
        ) : (
          <p>"There was an error generating your career suggestions. Please try again later."</p>
        )}
      </Container>
    );    
};

export default BasicResultPage;
