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
      <Container fluid style={{ width: '100vw', height: '100vh', margin: '0', padding: '0', backgroundColor: '#FFEECC' }}>
        <header className="App-Header" style={{ padding: '20px' , fontFamily: 'Palatino',fontSize: '30px', fontWeight: 'bold'}}>
            <h1 style={{fontSize: '70px', fontWeight: 'bold'}}>Career Quiz</h1>
            <div>By: Morgan Nutto, Leah Marcelli, Kate Geiszler</div>
          </header>
        <Container style={{ border: '4px solid #772e25', padding: '30px', width: '1000px', height: '500px', backgroundColor: '#C8D6AF', fontFamily: 'Modern No. 20'}}>
          <h2>Choose the quiz you want to take!</h2>
          <Row>
            <Col className ="custom-box">

              <h3>Basic Quiz</h3>
              <p>
              This quiz provides a quick and straightforward assessment, 
              featuring general questions designed to identify broad career fields that match your interests and strengths.
               It’s ideal for those looking for a brief overview to help guide their career exploration.
              </p>
              <Button onClick={navigateToBasicQuiz}style={{ backgroundColor: '#053225', borderColor: '#053225', color: '#fff', fontFamily: 'Modern No. 20' }}>Start Basic Quiz</Button>
              

            </Col>
            <Col className ="custom-box">              
            <h3>Detailed Quiz</h3>
              <p>This quiz offers a more in-depth exploration, 
                featuring targeted questions designed to identify specific career paths that align with your strengths and interests.
                 It's ideal for those who are committed to investing extra time to gain deeper insights into their ideal career trajectory.
              </p>
              <Button onClick={navigateToDetailedQuiz} style={{ backgroundColor: '#053225', borderColor: '#053225', color: '#fff', fontFamily: 'Modern No. 20' }}>Start Detailed Quiz</Button>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
  export default HomePage;