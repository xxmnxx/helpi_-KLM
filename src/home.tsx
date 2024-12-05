/* eslint-disable jsx-a11y/alt-text */
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import './App.css'; // Make sure your CSS file is imported
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import basicIcon from './Images/hot-coffee.svg';
import detailedIcon from './Images/croissant.svg';
import pandaFull from './Images/panda1.png'
import racoonFull from './Images/racoon1.png'


const saveKeyData = 'MYKEY';
const prevKey = localStorage.getItem(saveKeyData);
const initialKey = prevKey ? JSON.parse(prevKey) : '';

function HomePage() {
  const [key, setKey] = useState<string>(initialKey);
  const [isKeySubmitted, setIsKeySubmitted] = useState<boolean>(false);
  const navigate = useNavigate(); 

  const navigateToDetailedQuiz = () => {
    navigate('/DetailedQuiz');
  };
  const navigateToAboutMe = () => {
    navigate('/AboutMe');
  };

  const navigateToBasicQuiz = () => {
    navigate('/BasicQuiz');
  };

  const changeKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

  const handleSubmit = () => {
    if(key){
      setIsKeySubmitted(true);
      localStorage.setItem(saveKeyData, JSON.stringify(key));
      //window.location.reload(); 
    }
  };

  return (
    <Container fluid style={{ height: '100vh', margin: 0, padding: 0 }}>
      <header className="App-Header">
        <h1>
        <span className="match-text">Match-a </span>
        <span className="career-text">Career</span>
        <div>
        <p style={{ marginTop: '0px' }}></p>
        </div>
              </h1>
              <div className="creators-info">
          Brewed By: Morgan Nutto, Leah Marcelli, Kate Geiszler
        </div>        
        <Button onClick={navigateToAboutMe} className="about-creators-button">
          About the Creators
        </Button>
      </header>
      
      {/* Container with the background image as full page */}
      <Container className="home-container">
        <h2>
          Choose how you want to discover your next career!
        </h2>

        <Row>

          <Col className="custom-box">
            <img src= {basicIcon} style={{width: '100px', height: 'auto'}}/>
            <h3>Take It Easy!</h3>
            <Row>
              <Col style={{display: 'flex'}}>
              <img className='Racoon1' src={racoonFull} alt="Racoon Barista!"/>
              </Col>
              <Col>
                <p> Let our top barista guide you in brewing your career path, using the distinct flavors of your interests and skills to create your perfect coffee blend! 
                Ideal for those looking for a quick assessment to assist in discovering a career that best fits.</p>
                <Button
                onClick={navigateToBasicQuiz}
                style={{ backgroundColor: '#053225', borderColor: '#053225', color: '#fff' }}
                disabled={!isKeySubmitted}>
                Start Basic Quiz
                </Button>
              </Col>
            </Row>
          </Col>

          <Col className="custom-box">
          <img src= {detailedIcon} style={{width: '100px', height: 'auto'}}/>
            <h3>Get Your Hands Dirty!</h3>
            <Row>
              <Col style={{display: 'flex'}}>
                <img className='Panda1' src={pandaFull} alt="Panda Chef!" />
              </Col>
              <Col>
                <p>Let our master chef whip up career suggestions for you, using the unique ingredients of your interests and skills to craft your own pastries! 
                Ideal for those committed to investing extra time to gain deeper insights into their ideal career trajectory.</p>
                <Button
                onClick={navigateToDetailedQuiz}
                style={{ backgroundColor: '#053225', borderColor: '#053225', color: '#fff' }}
                disabled={!isKeySubmitted}>
                Start Detailed Quiz
                </Button>
              </Col>
            </Row>
            

          </Col>

        </Row>
      <footer>
        <p style={{ fontFamily: 'Palatino', fontWeight: 'bold', padding: '10px' }}>Please insert your API Key below!</p>

        <Form>
          <Form.Group style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px' }}>
          <Form.Control
            type="password"
            placeholder="Insert API Key Here"
            onChange={changeKey}
          />
            <Button
              className="Submit-Button"
              onClick={handleSubmit}
              style={{ backgroundColor: '#053225' }}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </footer>
        
      </Container>
    </Container>
  );
}

export default HomePage;
