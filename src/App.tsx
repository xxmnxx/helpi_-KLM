//import React, { useState } from 'react';
import './App.css';
//import { Button, Form} from 'react-bootstrap';
import { HashRouter as Router, Route, Routes} from 'react-router-dom';
import BasicQuiz from './BasicQuiz';
import DetailedQuiz from './DetailedQuiz';
import HomePage from './home';
import BasicResultPage from './BasicResultPage';
import DetailedResultPage from './DetailedResultPage';
import AboutMe from './AboutMe';


// local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
// let keyData = "";
// const saveKeyData = "MYKEY";
// const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
// if (prevKey !== null) {
//  keyData = JSON.parse(prevKey);
// }


function App() {
 //const [key, setKey] = useState<string>(keyData); // for API key input


 // sets the local storage item to the API key the user input
//  function handleSubmit() {
//    localStorage.setItem(saveKeyData, JSON.stringify(key));
//    setKey(key);
//    window.location.reload(); // when making a mistake and changing the key again, reload the whole site
//  }
//comment
 // whenever there's a change it'll store the API key in a local state called key but it won't be set in the local storage until the user clicks the submit button
//  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
//    setKey(event.target.value);
//  }


 return (
   <Router>
     <div className="App">


       <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/BasicQuiz" element={<BasicQuiz />} />
         <Route path="/DetailedQuiz" element={<DetailedQuiz/>} />
         <Route path="/basic-results" element={<BasicResultPage />} />
        <Route path="/detailed-results" element={<DetailedResultPage />} />
                 <Route path = "/AboutMe" element={<AboutMe/>}/>
       </Routes>




       {/* <Form>
         <Form.Label>API Key:</Form.Label>
         <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey} />
         <br />
         <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
       </Form> */}
     </div>
   </Router>
 );
}


// HomePage component




export default App;

