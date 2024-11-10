import { Container,Button, Row, Col } from 'react-bootstrap';
import './App.css';
import { useNavigate } from 'react-router-dom';
import OpenAI from "openai";
import { useState,useEffect } from 'react';

const ResultPage: React.FC = () => {
  const navigate = useNavigate(); 
  //const [aiResponse, setAiResponse] = useState<string | null>(null); // State to store OpenAI response
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [careerResults, setCareerResults] = useState<{
    careerfield1: string;
    reasoning1: string;
    career1_1: string;
    career1_2: string;
    career1_3: string;

    careerfield2: string;
    reasoning2: string
    career2_1: string;
    career2_2: string;
    career2_3: string;

    careerfield3: string;
    reasoning3: string;
    career3_1: string;
    career3_2: string;
    career3_3: string;
} | null>(null);

  // Navigate to home
  const goToHome = () => {
    navigate('/');
  };

  // Fetch answers from localStorage and send them to OpenAI
  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        // Fetch stored answers from localStorage
        const storedAnswersBasic = localStorage.getItem('basicQuizAnswers');
        const storedAnswersDetailed = localStorage.getItem('detailedQuizAnswers');
        
        // Parse the stored answers
        let userAnswers;
        if (storedAnswersDetailed) {
            userAnswers = JSON.parse(storedAnswersDetailed);
        } else if (storedAnswersBasic) {
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
              { role: "user",               "content": `Here are the answers to my career quiz:\n${formattedAnswers}\nBased on these answers,if theres only 10 answers, give me basic quiz results as defined. If theres 25 answers, give me detailed quiz results as defined.`}
          ],
          response_format: {
              type: "json_schema",
              json_schema: {
                  name: "career_schema",
                  schema: {
                      type: "object",
                      properties: {
                          careerfield1: { type: "string", description: "Name of the first career field" },
                          reasoning1: {type: "string", description: "In depth reasoning for the career field chosen"},
                          career1_1: { type: "string", description: "First example career in career field 1" },
                          career1_2: { type: "string", description: "Second example career in career field 1" },
                          career1_3: { type: "string", description: "Third example career in career field 1" },
  
                          careerfield2: { type: "string", description: "Name of the second career field" },
                          reasoning2: {type: "string", description: "In depth reasoning for the career field chosen"},
                          career2_1: { type: "string", description: "First example career in career field 2" },
                          career2_2: { type: "string", description: "Second example career in career field 2" },
                          career2_3: { type: "string", description: "Third example career in career field 2" },
  
                          careerfield3: { type: "string", description: "Name of the third career field" },
                          reasoning3: {type: "string", description: "In depth reasoning for the career field chosen"},
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
  }, []); // Empty dependency array means this will only run once, when the component mounts

  return (
    <Container fluid style={{ margin: 0, width: '100%', height: '100%', backgroundColor: '#C8D6AF',fontSize: '12px',fontWeight: 'bold' }}>
      <header className="App-Header" style={{ padding: '20px'}}>
        <h1 style={{ fontSize: '40px', fontWeight: 'bold', fontFamily: 'Palatino' }}>Career Quiz Results</h1>
      </header>

        <h2 style={{ fontSize: '30px',fontFamily: 'Palatino' }}> Congrats! You finished the Quiz</h2>


        {/* Display the AI response or a loading message */}
        {loading ? (
          <p>Loading your personalized career suggestions...</p>
        ) : (


          <div>
            <h3 style={{ fontSize: '25px', fontFamily: 'Palatino' }}>Your Suggested Career Paths:</h3>
            {careerResults ? (
              <Container style={{width: '1000px'}}>
              <Row>
                <Col style={{ border: '4px solid #772e25', margin: '10px', padding: '10px', width: '200px', height: '400px',backgroundColor: '#FFEECC', fontFamily: 'Modern No. 20' }}>
              <h3>Career Field #1</h3>
              <div style={{textAlign: 'center', paddingBottom: '10%'}}>
                <h4>={careerResults.careerfield1}=</h4>{careerResults.careerfield1}
                {careerResults.reasoning1}
              </div>
                    <ul>
                      <h4>Suggested Careers:</h4>
                        <li>{careerResults.career1_1}</li>
                        <li>{careerResults.career1_2}</li>
                        <li>{careerResults.career1_3}</li>
                    </ul>
                    </Col>
                    <Col style={{ border: '4px solid #772e25', margin: '10px', padding: '10px', width: '200px', height: '400px',backgroundColor: '#FFEECC', fontFamily: 'Modern No. 20' }}>
                    <h3>Career Field #2</h3>
                    <div style={{textAlign: 'center', paddingBottom: '10%'}}>
                    <h4>={careerResults.careerfield2}=</h4>
                    {careerResults.reasoning2}
                    </div>
                    <ul>
                    <h4>Suggested Careers:</h4>
                        <li>{careerResults.career2_1}</li>
                        <li>{careerResults.career2_2}</li>
                        <li>{careerResults.career2_3}</li>
                    </ul>
                    </Col>
                    <Col style={{ border: '4px solid #772e25', margin: '10px', padding: '10px', width: '200px', height: '400px',backgroundColor: '#FFEECC', fontFamily: 'Modern No. 20' }}>
                    <h3>Career Field #3</h3>
                    <div style={{textAlign: 'center', paddingBottom: '10%'}}>
                      <h4>={careerResults.careerfield3}=</h4>
                      {careerResults.reasoning3}
                    </div>
                    <ul>
                    <h4>Suggested Careers:</h4>

                        <li>{careerResults.career3_1}</li>
                        <li>{careerResults.career3_2}</li>
                        <li>{careerResults.career3_3}</li>
                    </ul>
                    </Col>
              </Row>
              </Container>
            ) : (
              <p>"There was an error generating your career suggestions. Please try again later."</p>
            )}
          </div>
        )}


        <Button onClick={goToHome} variant="primary" style={{
          position: 'absolute', left: '30px', top: '30px', width: '150px', height: '50', backgroundColor: '#053225'
        }}>
          Go to Home
        </Button>
      </Container>
  );
};

export default ResultPage;