/* eslint-disable jsx-a11y/alt-text */
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
 
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
      <Container fluid style={{ width: '100vw', height: '100vh', margin: '0', padding: '0', backgroundColor: '#FFEECC' }}>
        <header className="App-Header" style={{ padding: '20px' , fontFamily: 'Palatino',fontSize: '30px', fontWeight: 'bold'}}>
        <h1 style={{ fontSize: '70px', fontWeight: 'bold' }}>
          <span style={{ color: '#52681D' }}>Match-a</span>
          <span style={{ color: 'black' }}> Career</span>
        </h1>   
        <Button onClick = {navigateToAboutMe}style={{backgroundColor:'#772e25'}}></Button>       
        <div style ={{color: '#44200D'}}>Brewed By: Morgan Nutto, Leah Marcelli, Kate Geiszler</div>
          </header>
        <Container style={{ border: '4px solid #772e25', padding: '30px', width: '75%', height: '70%', backgroundColor: '#C8D6AF', fontFamily: 'Modern No. 20', textAlign: 'center'}}>
          <h2 style={{fontFamily: 'Palatino'}}>Choose the quiz you want to take!</h2>
          <Row>
            <Col className ="custom-box">

              <h3>Make Your Own Coffee!</h3>
              <p>
              Take it easy! make your own coffee using hand picked ingredients, unique to your interests and skills!
              Ideal for those looking for a quick assesment to assist in dicovering a career that best fits.
              </p>
              <Button onClick={navigateToBasicQuiz}
              style={{ backgroundColor: '#053225', borderColor: '#053225', color: '#fff', fontFamily: 'Modern No. 20', }}
              disabled={!isKeySubmitted}
              >Start Basic Quiz</Button>
              

            </Col>
            <Col className ="custom-box">              
            <h3>Make Your Own Pastries!</h3>
              <p>Get your hands dirty! Bake your own pasteries using hand picked ingredients, unique to your interests and skills!  
                Ideal for those who are committed to investing extra time to gain deeper insights into their ideal career trajectory.
              </p>
              <Button onClick={navigateToDetailedQuiz} 
              style={{ backgroundColor: '#053225', borderColor: '#053225', color: '#fff', fontFamily: 'Modern No. 20' }}
              disabled={!isKeySubmitted}
              >Start Detailed Quiz</Button>
            </Col>
          </Row>
          <p style={{fontFamily: 'Palatino', fontWeight: 'bold', padding:'10px'}}>Please insert your API Key below!</p>
          <Form>
          <Form.Group style={{ display: 'flex', alignItems: 'center', gap: '10px', padding:'10px' }}>
         {/* <Form.Label>API Key:</Form.Label> */}
         <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey} />
         <br />
         <Button className="Submit-Button" onClick={handleSubmit} style={{backgroundColor:'#053225'}}>Submit</Button>
         </Form.Group>
          </Form>
        </Container>
      </Container>
    );
  }
  export default HomePage;