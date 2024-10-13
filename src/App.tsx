import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }
  

  return (
    <div className="App">
      <header className = "App-Header" style= {{paddingTop: '20px'}}> 
        <h1> Career Quiz </h1>
        <div>
        By: Morgan Nutto, Leah Marcelli, Kate Geiszler
        </div>
      </header> 
      <div>


      </div>
      <div>
      <Container style= {{marginTop: '20px', width: '1000px', height: '500px'}}>
        <Container style={{ border: '1px solid black', padding: '30px', width: '1000px', height: '400px'}}>
          <h2> Choose the quiz you want to take!</h2>
          <Row>
            <Col style= {{border: '1px solid black', margin: "10px", padding: '10px', height: '200px'}}>
              <h3> Basic Quiz </h3>
              <p>This brief, 3-minute quiz provides insights into broad career fields rather than specific job titles. Designed to help you explore general areas of interest and potential career paths
              </p>
              <Button>Start Basic Quiz</Button>
            </Col>
            <Col style= {{border: '1px solid black', margin: "10px", padding: '10px'}}>
              <h3> Detailed Quiz </h3>
              <p>Column 2 content goes here.</p>
              <Button>Start Detailed Quiz</Button>
            </Col>
          </Row>
        </Container>
      </Container>
      




      </div>
    
      <Form>
        <Form.Label>API Key:</Form.Label>
        <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
        <br></br>
        <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
}

export default App;
