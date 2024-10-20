/* eslint-disable jsx-a11y/alt-text */
import { Container, Row, Col, Button } from 'react-bootstrap';
import './App.css';
import { useNavigate } from 'react-router-dom';


function HomePage() {
    const navigate = useNavigate(); 
  
    const navigateToDetailedQuiz = () => {
      navigate('/DetailedQuiz');
    };
  
    const navigateToBasicQuiz = () => {
      navigate('/BasicQuiz');
    };
  
  
    return (
      <Container style={{ marginTop: '30px', width: '1000px', height: '500px', marginBottom: '200px'}}>
        <header className="App-Header" style={{ padding: '20px' }}>
            <h1>Career Quiz</h1>
            <div>By: Morgan Nutto, Leah Marcelli, Kate Geiszler</div>
          </header>
        <Container style={{ border: '1px solid black', padding: '30px', width: '1000px', height: '400px' }}>
          <h2>Choose the quiz you want to take!</h2>
          <Row>
            <Col style={{ border: '1px solid black', margin: '10px', padding: '10px', height: '300px' }}>
              <h3>Basic Quiz</h3>
              <p>
              This quiz provides a quick and straightforward assessment, 
              featuring general questions designed to identify broad career fields that match your interests and strengths.
               It’s ideal for those looking for a brief overview to help guide their career exploration.
              </p>
              <Button onClick={navigateToBasicQuiz}>Start Basic Quiz</Button>
            </Col>
            <Col style={{ border: '1px solid black', margin: '10px', padding: '10px', height: '300px' }}>
              <h3>Detailed Quiz</h3>
              <p>This quiz offers a more in-depth exploration, 
                featuring targeted questions designed to identify specific career paths that align with your strengths and interests.
                 It's ideal for those who are committed to investing extra time to gain deeper insights into their ideal career trajectory.
              </p>
              <Button onClick={navigateToDetailedQuiz}>Start Detailed Quiz</Button>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
  export default HomePage;