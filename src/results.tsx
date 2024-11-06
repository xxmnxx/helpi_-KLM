import { Container,Button, Row,Col } from 'react-bootstrap';
import './App.css';
import { useNavigate } from 'react-router-dom';
import OpenAI from "openai";
import { useState,useEffect } from 'react';

const ResultPage: React.FC = () => {
  const navigate = useNavigate(); 
  const [aiResponse, setAiResponse] = useState<string[] | null>(null); // State to store OpenAI response
  const [loading, setLoading] = useState<boolean>(true); // Loading state

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
          model: "gpt-4",
          messages: [
            {
              "role": "system",
              "content": "You are a career coach providing personalized career advice based on answers to either a basic career quiz or a detailed career quiz.If you recieve a set of 10 answers, its from the basic quiz. If you recieve 25 answers, its from the detailed Quiz."
            },
            {
              "role": "user",
              "content": `Here are the answers to my career quiz:\n${formattedAnswers}\nBased on these answers, give me 3 broad career fields that fit best with my given answers to each question with a one sentence description for each field. also provide just 2 example careers for each field with justification for choosing them based on my answers.`
            }
          ]
        });

      // Extract the assistant's response and update the state
      const responseArray = completion.choices[0].message.content?.split(/\d\.\s+/).filter(Boolean);
      setAiResponse(responseArray || []);
    } catch (error) {
      console.error("Error fetching results or contacting OpenAI:", error);
      setAiResponse([]);
    } finally {
      setLoading(false); // Set loading to false after the request complete
    }
    
    };

    fetchQuizResults();
  }, []); // Empty dependency array means this will only run once, when the component mounts

  return (
    <Container fluid style={{ margin: 0, width: '100%', height: '100%', backgroundColor: '#C8D6AF',fontSize: '12px',fontWeight: 'bold' }}>
      <header className="App-Header" style={{ padding: '20px'}}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Career Quiz Results</h1>
        <div style={{ fontSize: '25px', fontWeight: 'bold' }}>By: Morgan Nutto, Leah Marcelli, Kate Geiszler</div>
      </header>

        <h2 style={{ fontSize: '30px', fontWeight: 'bold' }}> Congrats! You finished the Quiz</h2>


        {/* Display the AI response or a loading message */}
        {loading ? (
          <p>Loading your personalized career suggestions...</p>
        ) : (


          <div>
            <h3>Your Suggested Career Paths:</h3>
            {aiResponse ? (
              <Row>
              {aiResponse.map((response, index: number) => (
                  <Col  key={index} style={{ border: '4px solid #772e25', margin: '10px', padding: '10px', width: '400px', height: '500px',backgroundColor: '#FFEECC', fontFamily: 'Modern No. 20' }}>
            <h4>Career Field #{1 + index}:</h4>
            <p>{response}</p>
          </Col>
              ))}
              </Row>
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