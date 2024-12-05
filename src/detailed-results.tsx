import { Container, Button, Row, Col} from 'react-bootstrap';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import loadingDetailedGif from './Images/stir.gif';
import OpenAI from 'openai';

const DetailedResultPage: React.FC = () => {
  const navigate = useNavigate(); 
  //const [aiResponse, setAiResponse] = useState<string | null>(null); // State to store OpenAI response
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [careerResults, setCareerResults] = useState<{
  
    careerfield1: string;
    reasoning1: string;
    career1_1: string;
    reasoning1_1: string;
    career1_2: string;
    reasoning1_2: string;
    career1_3: string;
    reasoning1_3: string;


    careerfield2: string;
    reasoning2: string
    career2_1: string;
    reasoning2_1: string;
    career2_2: string;
    reasoning2_2: string;
    career2_3: string;
    reasoning2_3: string;

    careerfield3: string;
    reasoning3: string;
    career3_1: string;
    reasoning3_1: string;
    career3_2: string;
    reasoning3_2: string;
    career3_3: string;
    reasoning3_3: string;
} | null>(null);

//const [isDetailedQuiz, setIsDetailedQuiz]= useState<boolean>(false);


//comment
  // Fetch answers from localStorage and send them to OpenAI
  useEffect(() => {
    const fetchQuizResults = async () => {
      setLoading(true);
      try {
        const storedAnswers = localStorage.getItem('detailedQuizAnswers');
        if (storedAnswers) {
          const userAnswers = JSON.parse(storedAnswers);
          const formattedAnswers = userAnswers.map(
            (answer: { question: string; selectedAnswer: string }) =>
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
              { role: "user", content: `Here are the answers to my career quiz:\n${formattedAnswers}\nBased on these answers, give me detailed quiz results as defined with reasoning for each example career.`}
          ],
          response_format: {
              type: "json_schema",
              json_schema: {
                  name: "career_schema",
                  schema: {
                      type: "object",
                      properties: {
                          careerfield1: { type: "string", description: "Name of the first career field" },
                          reasoning1: {type: "string", description: "Brief (3 sentences) reasoning for the career field chosen"},
                          career1_1: { type: "string", description: "First example career in career field 1" },
                          reasoning1_1:{type: "string", description: "Brief reasoning for first example career"},
                          career1_2: { type: "string", description: "Second example career in career field 1" },
                          reasoning1_2:{type: "string", description: "Brief reasoning for second example career"},
                          career1_3: { type: "string", description: "Third example career in career field 1" },
                          reasoning1_3:{type: "string", description: "Brief reasoning for third example career"},

  
                          careerfield2: { type: "string", description: "Name of the second career field" },
                          reasoning2: {type: "string", description: "Brief (3 sentences) reasoning for the career field chosen"},
                          career2_1: { type: "string", description: "First example career in career field 2" },
                          reasoning2_1:{type: "string", description: "Brief reasoning for first example career"},
                          career2_2: { type: "string", description: "Second example career in career field 2" },
                          reasoning2_2:{type: "string", description: "Brief reasoning for second example career"},
                          career2_3: { type: "string", description: "Third example career in career field 2" },
                          reasoning2_3:{type: "string", description: "Brief reasoning for third example career"},

                          careerfield3: { type: "string", description: "Name of the third career field" },
                          reasoning3: {type: "string", description: "Breif  (3 sentences) reasoning for the career field chosen"},
                          career3_1: { type: "string", description: "First example career in career field 3" },
                          reasoning3_1:{type: "string", description: "Brief reasoning for first example career"},
                          career3_2: { type: "string", description: "Second example career in career field 3" },
                          reasoning3_2:{type: "string", description: "Brief reasoning for second example career"},
                          career3_3: { type: "string", description: "Third example career in career field 3" },
                          reasoning3_3:{type: "string", description: "Brief reasoning for third example career"},

                      },
                      required: [
                          "careerfield1", "reasoning1", "career1_1", "career1_2", "career1_3","reasoning1_1", "reasoning1_2","reasoning1_3",
                          "careerfield2", "reasoning2", "career2_1", "career2_2", "career2_3","reasoning2_1","reasoning2_2","reasoning2_3",
                          "careerfield3", "reasoning3", "career3_1", "career3_2", "career3_3", "reasoning3_1","reasoning3_2","reasoning3_3"
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
                            reasoning1_1: parsedResponse.reasoning1_1,
                            career1_2: parsedResponse.career1_2,
                            reasoning1_2: parsedResponse.reasoning1_2,
                            career1_3: parsedResponse.career1_3,
                            reasoning1_3: parsedResponse.reasoning1_3,
                            careerfield2: parsedResponse.careerfield2,
                            reasoning2: parsedResponse.reasoning2,
                            career2_1: parsedResponse.career2_1,
                            reasoning2_1: parsedResponse.reasoning2_1,
                            career2_2: parsedResponse.career2_2,
                            reasoning2_2: parsedResponse.reasoning2_2,
                            career2_3: parsedResponse.career2_3,
                            reasoning2_3: parsedResponse.reasoning2_3,
                            careerfield3: parsedResponse.careerfield3,
                            reasoning3: parsedResponse.reasoning3,
                            career3_1: parsedResponse.career3_1,
                            reasoning3_1: parsedResponse.reasoning3_1,
                            career3_2: parsedResponse.career3_2,
                            reasoning3_2: parsedResponse.reasoning3_2,    
                            career3_3: parsedResponse.career3_3,
                            reasoning3_3: parsedResponse.reasoning3_3,

                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching basic results:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizResults();
    }, [navigate]); // `navigate` is used, so it must be included in the dependency array
    return (
      <Container fluid className="quiz-container">
        <header
          className="App-Header"
          style={{ padding: '20px', textAlign: 'center' }}
        >
          <h1
            style={{
              fontSize: '40px',
              fontWeight: 'bold',
              fontFamily: 'Palatino',
            }}
          >
            Match-a Career Results
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
            <img src={loadingDetailedGif} alt="Loading..." />
            <p style={{ color: 'black', fontSize: '18px' }}>
              Baking your career suggestions...
            </p>
          </div>
        ) : careerResults ? (
          <Container>
            <h2
              style={{
                fontSize: '30px',
                fontFamily: 'Palatino',
                textAlign: 'center',
              }}
            >
              Success, your pastries are done!
            </h2>
            <h3
              style={{
                fontSize: '25px',
                fontFamily: 'Palatino',
                textAlign: 'center',
              }}
            >
              
            </h3>
            <Container className="careerResults">
              <Row>
                <Col className="results-container">
                  <Row>
                    <h2  className="career-header">Career Field #1</h2>
                    <div>
                      <h4>={careerResults.careerfield1}=</h4>
                    </div>
                  </Row>
                  <Row>
                    <ul>
                      <h4>Suggested Careers:</h4>
                      <li>{careerResults.career1_1}</li>
                      {careerResults.reasoning1_1}
                      <li>{careerResults.career1_2}</li>
                      {careerResults.reasoning1_2}
                      <li>{careerResults.career1_3}</li>
                      {careerResults.reasoning1_3}
                    </ul>
                  </Row>
                </Col>
                <Col className="results-container">
                  <Row>
                    <h3  className="career-header">Career Field #2</h3>
                    <div>
                      <h4>={careerResults.careerfield2}=</h4>
                    </div>
                  </Row>
                  <Row>
                    <ul>
                      <h4>Suggested Careers:</h4>
                      <li>{careerResults.career2_1}</li>
                      {careerResults.reasoning2_1}
                      <li>{careerResults.career2_2}</li>
                      {careerResults.reasoning2_2}
                      <li>{careerResults.career2_3}</li>
                      {careerResults.reasoning2_3}
                    </ul>
                  </Row>
                </Col>
                <Col className="results-container">
                  <Row>
                    <h3  className="career-header">Career Field #3</h3>
                    <div>
                      <h4>={careerResults.careerfield3}=</h4>
                    </div>
                  </Row>
                  <Row>
                    <ul>
                      <h4>Suggested Careers:</h4>
                      <li>{careerResults.career3_1}</li>
                      {careerResults.reasoning3_1}
                      <li>{careerResults.career3_2}</li>
                      {careerResults.reasoning3_2}
                      <li>{careerResults.career3_3}</li>
                      {careerResults.reasoning3_3}
                    </ul>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Container>
        ) : (
          <p>"There was an error generating your career suggestions. Please try again later."</p>
        )}
      </Container>
    );    
};

export default DetailedResultPage;