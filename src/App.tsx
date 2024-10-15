import React, { useState } from 'react';
import './App.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import BasicQuiz from './BasicQuiz';
import DetailedQuiz from './DetailedQuiz';

// local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData); // for API key input

  // sets the local storage item to the API key the user input
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); // when making a mistake and changing the key again, reload the whole site
  }

  // whenever there's a change it'll store the API key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/BasicQuiz" element={<BasicQuiz />} />
          <Route path="/DetailedQuiz" element={<DetailedQuiz/>} />
        </Routes>


        <Form>
          <Form.Label>API Key:</Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey} />
          <br />
          <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
        </Form>
      </div>
    </Router>
  );
}

// HomePage component
function HomePage() {
  const navigate = useNavigate(); 

  const navigateToDetailedQuiz = () => {
    navigate('/DetailedQuiz');
  };

  const navigateToBasicQuiz = () => {
    navigate('/BasicQuiz');
  };

  return (
    <Container style={{ marginTop: '20px', width: '1000px', height: '500px' }}>
      <header className="App-Header" style={{ paddingTop: '20px' }}>
          <h1>Career Quiz</h1>
          <div>By: Morgan Nutto, Leah Marcelli, Kate Geiszler</div>
        </header>
      <Container style={{ border: '1px solid black', padding: '30px', width: '1000px', height: '400px' }}>
        <h2>Choose the quiz you want to take!</h2>
        <Row>
          <Col style={{ border: '1px solid black', margin: '10px', padding: '30px', height: '300px' }}>
            <h3>Basic Quiz</h3>
            <p>
              This brief, 3-minute quiz provides insights into broad career fields rather than specific job titles. 
              Designed to help you explore general areas of interest and potential career paths.
            </p>
            <Button onClick={navigateToBasicQuiz}>Start Basic Quiz</Button>
          </Col>
          <Col style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <h3>Detailed Quiz</h3>
            <p>This quiz offers a more in-depth exploration compared to our basic quiz, 
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

export default App;