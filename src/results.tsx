import { Container,Button } from 'react-bootstrap';
import './App.css';
import { useNavigate } from 'react-router-dom';
import OpenAI from "openai";
import { useState,useEffect } from 'react';

const ResultPage: React.FC = () => {
  const navigate = useNavigate(); 
  const [aiResponse, setAiResponse] = useState<string | null>(null); // State to store OpenAI response
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
              "content": "You are a career coach providing personalized career advice based on answers to either a basic career quiz or a detailed career quiz.If you recieve a set of 10 answers, its from the basic quiz, and you should give 3 broad career fields with an example of a job within each career field along with a short description and justification for each. If you recieve 25 answers, its from the detailed Quiz and you should provide 6 careers that fit best with the given answers and a short description and justification for each."
            },
            {
              "role": "user",
              "content": `Here are the answers to my career quiz:\n${formattedAnswers}\nBased on these answers,if theres only 10 answers, give me basic quiz results as defined. If theres 25 answers, give me detailed quiz results as defined.`
            }
          ]
        });

        // Extract the assistant's response and update the state
        setAiResponse(completion.choices[0].message.content);
      } catch (error) {
        console.error("Error fetching results or contacting OpenAI:", error);
        setAiResponse("There was an error generating your career suggestions. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchQuizResults();
  }, []); // Empty dependency array means this will only run once, when the component mounts

  return (
    <Container style={{ marginTop: '30px', width: '1000px', height: '500px', marginBottom: '200px' }}>
      <header className="App-Header" style={{ padding: '20px' }}>
        <h1>Career Quiz Results</h1>
        <div>By: Morgan Nutto, Leah Marcelli, Kate Geiszler</div>
      </header>

      <Container style={{ border: '1px solid black', padding: '30px', width: '1000px', height: '400px' }}>
        <h2> Congrats! You finished the Quiz</h2>

        {/* Display the AI response or a loading message */}
        {loading ? (
          <p>Loading your personalized career suggestions...</p>
        ) : (
          <div>
            <h3>Your Suggested Career Paths:</h3>
            <p>{aiResponse}</p>
          </div>
        )}

        <Button onClick={goToHome} variant="primary" style={{
          position: 'absolute', left: '30px', top: '30px', width: '150px', height: '50'
        }}>
          Go to Home
        </Button>
      </Container>
    </Container>
  );
};

export default ResultPage;