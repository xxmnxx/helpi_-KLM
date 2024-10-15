//import React, { useState } from 'react';
import { Container} from 'react-bootstrap';
// import React, { useState } from 'react';



const DetailedQuiz:React.FC=()=>{

    return(
        <><div>
            <h1>Detailed Career Quiz</h1>
            <p>Welcome to the Detailed Career Quiz!</p>
        </div><Container style={{ border: '1px solid black', margin: '10px', padding: '10px', height: '400px' }}>
            <h2>Question One</h2>
            How do you prefer to work on projects?

            </Container></>
        
        
    );
};

export default DetailedQuiz;