/* eslint-disable jsx-a11y/alt-text */
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import './App.css'; // Make sure your CSS file is imported
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import basicIcon from './Images/hot-coffee.svg';
import detailedIcon from './Images/croissant.svg';
import dancingCoffee from './coffee-lover-hot-coffee.gif';
import donut from './donut.gif'
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
    navigate('AboutMe');
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
      <header className="App-Header" style={{ padding: '20px', fontFamily: 'Palatino', fontSize: '30px', fontWeight: 'bold', position: 'relative', zIndex: 10 }}>
        <h1>
        <span className="match-text">Match-a  </span>
        <span className="career-text">  Career</span>
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
  <h2 style={{ fontFamily: 'Palatino', fontSize: '30px', fontWeight: 'bold' }}>
    Choose the quiz you want to take!
  </h2>
        <Row>
          <Col className="custom-box">
          <img src= {basicIcon} style={{width: '150px', height: 'auto'}}/>
            <h3>Make Your Own Coffee!</h3>
            <p>Take it easy! Make your own coffee using hand-picked ingredients, unique to your interests and skills! Ideal for those looking for a quick assessment to assist in discovering a career that best fits.</p>
            <img className="dancing-coffee" src={dancingCoffee} alt="loading coffee" />
            <Button
              onClick={navigateToBasicQuiz}
              style={{ backgroundColor: '#053225', borderColor: '#053225', color: '#fff' }}
              disabled={!isKeySubmitted}
            >
              Start Basic Quiz
            </Button>
            
          </Col>
          <Col className="custom-box">
          <img src= {detailedIcon} style={{width: '150px', height: 'auto'}}/>
            <h3>Make Your Own Pastries!</h3>
            <p>Get your hands dirty! Bake your own pastries using hand-picked ingredients, unique to your interests and skills! Ideal for those committed to investing extra time to gain deeper insights into their ideal career trajectory.</p>
            <Button
              onClick={navigateToDetailedQuiz}
              style={{ backgroundColor: '#053225', borderColor: '#053225', color: '#fff' }}
              disabled={!isKeySubmitted}
            >
              Start Detailed Quiz
            </Button>
            <img className="donut" src={donut} alt="loading coffee" />

          </Col>
        </Row>

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
      </Container>
    </Container>
  );
}

export default HomePage;
